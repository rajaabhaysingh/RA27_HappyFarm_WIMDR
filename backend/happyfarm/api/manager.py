from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.db import models, transaction
from django.shortcuts import get_object_or_404
from django.conf import settings
from background_task import background
from django.db.models import Sum, F
from django.utils import timezone
from datetime import datetime


class CustomUserManager(BaseUserManager):

    '''
    logic for our Custom User Manager.
    Note: These managers have to be registered in the models. Here we have linked it to the variable "objects"
    i.e. You can use these managers as "Model.objects.manager_method()"
    e.g. CustomUser.objects.create_user() can be used in shell/code directly
    '''

    def create_user(self, phone, password, **extra):
        '''
        Method to create a new Custom User.
        :param email: User email. Also used as primary key for our model
        :param password: User password
        :param extra: A Dictionary instance containing all the other user information such first name, last name etc
        :return: A new Custom User object
        '''

        # Some important standard validation checks
        if not phone:
            raise ValueError(_('Phone number cannot be empty'))
        extra.setdefault('is_active', True)
        user = self.model(phone=phone, **extra)
        print(password)
        user.set_password(password)
        user.save()
        # This will create a cart for the new user
        api.models.Cart.objects.create(buyer=user)
        return user

    def create_superuser(self, phone, password, **extra):
        '''
        Method to create a new super user. This will set some admin booleans and follow the previous create user method normally
        '''

        extra.setdefault('is_staff', True)
        extra.setdefault('is_active', True)
        extra.setdefault('is_superuser', True)

        return self.create_user(phone, password, **extra)


class ItemManager(models.Manager):

    def get_current_selling(self):
        return self.get_queryset().filter(date_of_expiry__gte=timezone.now())


class CartManager(models.Manager):

    '''
    logic to manage most of the cart operations.
    '''

    def get_current_cart(self, user):
        '''
        Logic to get or create a new cart for requested user
        :param user: Custom user object
        :return: Cart object
        '''
        # Query for existing cart or a new cart
        obj = self.get_queryset().get_or_create(buyer=user, status="current")
        assert len(obj) > 0
        # The above query would also provide us a boolean denoting whether the object was only retrieved or created
        # We do not care the boolean value here and just ignore it
        return obj[0]

    def get_history(self, user):
        '''
        Method to retrieve users carts(including those which have been checked out)
        :param user: Custom user object
        :return: queryset excluding current cart and including all other user's previous carts
        '''
        return self.get_queryset().exclude(status="current").filter(buyer=user)

    def get_cart(self, cart_id):
        '''
        Method to retrieve a single cart. Although can be handled individually
        '''
        return self.get_queryset().get_object_or_404(id=cart_id)

    def checkout(self, user):
        '''
        Method to change the status of the current cart to checkout
        :param user: Custom user object
        :return: Cart object. Specifically current cart with checked out status.
        '''
        current_cart = self.get_current_cart(user)
        current_cart.status = "checkout"    # changing the status here
        current_cart.save()  # Save the object here
        return current_cart

    def get_total_amount(self, instance):
        total_cost = api.models.CartItem.objects.filter(
            cart=instance).aggregate(total=Sum(F('purchasedPrice') * F('purchasedQty')))
        return total_cost['total']

    def get_invalid_items(self, instance):
        lis = []
        items = api.models.CartItem.objects.get_cart_items(cart=instance)
        for cart_item in items:
            payload = {"id": cart_item.id, }
            if cart_item.isNegotiated is True:
                diff = datetime.now() - cart_item.date_added
                if diff.day > 0:
                    payload['error'] = "Negotiation time period expired"
                    lis.append(payload)
                continue
            if cart_item.purchasedPrice != cart_item.item.basePrice or cart_item.purchasedPricePerDigit != cart_item.item.basePricePerDigit or cart_item.purchasedPricePerUnit != cart_item.item.pricePerUnit:
                payload['error'] = "Price has been updated. Needs refactoring."
                lis.append(payload)
                continue
            if cart_item.item.date_of_expiry < timezone.now():
                payload['error'] = "This item has been removed from store"
                lis.append(payload)
                continue
            if cart_item.item.group == "bulk":
                try:
                    soldQty = CartItem.objects.filter(item=cart_item.item, status="checkout").aggregate(
                        total=F('purchasedQty'))['total']
                    if cart_item.purchasedPrice > cart_item.item.lotSizeDigit - soldQty:
                        payload['error'] = "This item is out of stock. Please reduce your purchasing quantity."
                        lis.append(payload)
                except:
                    pass
        return lis

    def clean_invalid_items(self, instance):
        items = api.models.CartItem.objects.get_cart_items(cart=instance)
        for cart_item in items:
            if cart_item.item.date_of_expiry < timezone.now():
                cart_item.delete()
                continue
            try:
                soldQty = CartItem.objects.filter(item=cart_item.item, status="checkout").aggregate(
                    total=F('purchasedQty'))['total']
                if cart_item.purchasedPrice > cart_item.item.lotSizeDigit - soldQty:
                    cart_item.purchasedPrice = cart_item.item.lotSizeDigit - soldQty
                    cart_item.save()
                    continue
            except:
                pass
            diff = datetime.now() - cart_item.date_added
            if cart_item.isNegotiated is True and diff == 0:
                continue
            cart_item.purchasedPrice = cart_item.item.basePrice
            cart_item.purchasedPricePerDigit = cart_item.item.basePricePerDigit
            cart_item.purchasedPricePerUnit = cart_item.item.pricePerUnit
            cart_item.status = "success"
            cart_item.save()


class CartItemManager(models.Manager):

    '''
    Logic to handle all the important methods related to cart item
    '''

    def get_cart_items(self, cart):
        '''
        Method to retrieve all the information realted to a cart
        :param cart: Cart object for which the information is queried
        :return: all the cart items associated with that cart
        '''
        return self.get_queryset().filter(cart=cart)

    def get_cart_item(self, cart, item):
        '''
        Method to retrieve/create the cart item object given cart and item separately.

        Mainly used to add an item to cart.
        '''
        obj = self.get_queryset().get_or_create(cart=cart, item=item)
        assert len(obj) > 0
        # Remember that get_or_create would also return an boolean which will be ignored here
        return obj[0]


class EmptyCartError(Exception):

    '''
    Custom Error for better error handling

    As the name suggests it will be used to denote empty cart.
    Mainly the use case arises at checkout as you cannot checkout an empty cart.
    '''

    def __init__(self):
        self.message = "Cart is Empty. Try adding some items to continue!"
        super().__init__(self.message)


class InvalidItems(Exception):

    '''
    Custom Error for better error handling

    As the name suggests it will be used to denote empty cart.
    Mainly the use case arises at checkout as you cannot checkout an empty cart.
    '''

    def __init__(self, lis):
        self.message = {"error_code": 1, "errors": lis}
        super().__init__(self.message)


class TransactionManager(models.Manager):

    '''
    Logic to handle all the procedures involving transaction
    '''

    @transaction.atomic
    def checkout(self, user, **extras):
        '''
        This method will create a new transaction and return the transaction_id for payment at client's side

        :param user: signifies the user trying to perform the transaction
        :param extras: dictionary consisting all the remaining attributes required to perform a transaction
        '''

        cart = api.models.Cart.objects.get_current_cart(
            user)   # Get the current cart
        cart_items = api.models.CartItem.objects.get_cart_items(
            cart)   # Get the current items in the cart
        if(len(cart_items) is 0):   # if the cart is empty, then raise appropriate erro
            raise EmptyCartError()
        lis = api.models.Cart.objects.get_invalid_items(cart)
        if len(lis) > 0:
            raise InvalidItems(lis)
            # Create a new transaction instance
        obj = self.model(cart=cart, **extras)
        obj.amount = obj.amount_due = api.models.Cart.objects.get_total_amount(
            cart)
        obj.amount_paid = 0
        obj.buyer = user
        obj.save()

        # attach the timer
        self.attach_timeout(obj.id)

        return obj

    def verify(self, transaction_id, payment_id):
        '''
        This method will use the transaction_id from db, payment_id from the client and a secret key to verify the payment
        '''

        '''
        Do all the hashing and verification part here
        Basically we would use the transaction_id and secret key to generate the hash and equate it to payment_id

        if match:
            return success
        else:
            return failure
        '''
        pass

    @background(schedule=settings.TRANSACTION_TIMEOUT_PERIOD)
    def attach_timeout(self, transaction_id):
        '''
        The following method would automatically move the delayed transactions to failed after a certain amount of time
        '''
        self.transaction_fail(transaction_id)

    def change_status(self, transaction_id, status):
        '''
        Method to handle changing status attribute associated with transaction
        :param transaction_id: As the name suggests, it contains the transaction id for which the status change action is intended
        :param status: contains the new status which has to be assigned.
        :return: updated transaction object
        '''
        transaction = self.get_queryset().get(
            id=transaction_id)    # Retrieve the transaction object here using the transaction id provided
        transaction.status = status  # Change the transaction status here
        if transaction.status == "success":
            api.models.Cart.objects.checkout(transaction.user)
        transaction.save()  # Save back the object to DB
        return transaction

    # Following methods are used to set appropriate status messages to the transaction objects

    def transaction_cancel(self, transaction_id):
        '''
        method to change the status to 'CANCEL'
        '''
        return self.change_status(transaction_id, "cancel")

    def transaction_fail(self, transaction_id):
        '''
        method to change the status to 'FAILED'
        '''
        return self.change_status(transaction_id, "failed")

    def transaction_success(self, transaction_id):
        '''
        method to change the status to 'SUCCESS'
        '''

        return self.change_status(transaction_id, "success")


import api.models
