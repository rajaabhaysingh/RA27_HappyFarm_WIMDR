from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import permissions, viewsets, filters, generics, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone
import razorpay
from django.db.models import Sum, F

now = timezone.now()

from .models import *
from . import serializers
from . import manager


'''

DONE

Item management:
- User Sell history view
- User current selling items(Types to be handled)
- User Buy history view
- Seller add product(post method)
- Single item detail
- (ListView)Items on sale(except for users own selling items)

Cart management:
- User current cart
- User previous carts
- Add item to current cart

TODO

Profile management:
- tweak the existing methods to satisfy requirement

Cart management:
- Add items from previous cart to current cart

Transaction management:
- Move current cart to payment
- integration with payment gateway
- User Transaction history
- Individual Transaction View

'''

conversion_constants = {
    "kg": 1000,
    "gm": 1,
    "mg": 0.0001,
    "quintal": 100,
    "litre": 1,
    "ml": 0.0001,
    "units": 1,
    "dozen": 12
}

defaults = ['gm', 'litre', 'units']


class CustomUserViews(viewsets.GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin):

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = serializers.CustomUserGeneralSerializer
    queryset = CustomUser.objects.all()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    filterset_fields = ['current_location_latitude',
                        'current_location_longitude']
    # ordering_fields = '__all__'


class myAddressViews(viewsets.ModelViewSet):

    '''
    ViewSet to manage requests for following usages:
    - Address mapping to a particular user
    - Includes all the opertations except update/partial_update
    '''

    permission_classes = [permissions.IsAuthenticated]
    queryset = Address.objects.none()
    serializer_class = serializers.AddressSerializer

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    # Necessary to find the images of particular item
    filterset_fields = '__all__'

    def get_queryset(self):
        '''
        Filter only the Images belonging to items owned by user(i.e. user is the seller of these products)
        '''
        return Address.objects.filter(user=self.request.user)

    def create(self, request, format=None):
        data = request.data.copy()
        data['user'] = request.user
        serialized_data = self.get_serializer(data=data)
        if serialized_data.is_valid():

            serialized_data.save()

            if serialized_data.data['isDefault'] is True:
                # Since the user wants this to be default, remove any existing defaults
                existing_default_address_count = self.get_queryset().filter(isDefault=True).count

                if existing_default_address_count > 0:

                    # Make the exiting default false
                    default_address = self.get_queryset().get(isDefault=True)
                    default_address.isDefault = False
                    default_address.save()

            return Response(data=serialized_data.data, status=status.HTTP_201_CREATED)
        return Response(data=serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        current_address = self.get_object()
        if request.data.get('isDefault') is not None:
            if current_address.isDefault is True and request.data['isDefault'] is False:
                return Response(data={"errors": "Invalid attempt to change default address. Atleast one default address is required"}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['user'] = request.user
        serializer = self.get_serializer(
            current_address, data=data, partial=True)
        if serializer.is_valid():
            if data.get('isDefault') is not None:
                if data['isDefault'] is True:
                    default_address = self.get_queryset().get(isDefault=True)
                    if default_address != current_address:
                        default_address.isDefault = False
                        default_address.save()
            self.perform_update(serializer)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class myIdProofViews(viewsets.GenericViewSet,
                     mixins.CreateModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin):

    '''
    ViewSet to manage requests for following usages:
    - ID proofs mapping to a particular user
    - Includes all the opertations except update/partial_update
    '''

    permission_classes = [permissions.IsAuthenticated]
    queryset = IdProof.objects.none()
    serializer_class = serializers.IDSerializer

    # Necessary to find the images of particular item
    filterset_fields = ['name', 'status']

    def get_queryset(self):
        '''
        Filter only the Images belonging to items owned by user(i.e. user is the seller of these products)
        '''
        return IdProof.objects.filter(user=self.request.user)


class ItemViews(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                viewsets.GenericViewSet):

    """
    Logic to retrieve/filter/search/order the items for all users(including Anonymous user)
    - Single item detail
    - (ListView)Items on sale(except for users own selling items)
    - Handle Unauthenticated request(i.e. allow only get request)

    :superclass mixins.RetrieveModelMixin: provides a .retrieve(request, pk=None) method, that implements retrieving a single object.
    :superclass mixins.ListModelMixin: Provides a .list(request, *args, **kwargs) method, that implements listing a queryset.
    :superclass viewsets.GenericViewSet: Provides all the generic functionalities requirec for a viewset

    Note: It accepts only GET requests.

    The below example returns a list of objects of type Item.
    Ex: http://localhost:8000/item/?page=1

    FilterSet:
    http://localhost:8000/accounts/item?name=onion&price=5000

    Search Filter:
    http://localhost:8000/accounts/item?search=onion
    note: also supports regex

    Ordering Filter:
    http://localhost:8000/accounts/item?ordering=name,price
    note: add prefix "-" to reverse the order
    """

    queryset = Item.objects.get_current_selling()

    filter_backends = (filters.SearchFilter,
                       DjangoFilterBackend, filters.OrderingFilter)

    # Allow filtering on all fields
    filterset_fields = ['name', 'group', 'status', 'date_of_creation', 'date_of_expiry', 'is_negotiable', 'delivery_preference', 'breed', 'location', 'category', 'lotSizeDigit',
                        'lotSizeUnit', 'basePrice', 'pricePerUnit', 'minBookVal', 'maxBookVal', 'maxBookValUnit', 'minBookValUnit', 'isFresh', 'item_type']

    serializer_class = serializers.ItemSerializer

    # Search would only lookup from the below fields
    search_fields = ['name', 'description', 'item_type']

    # Allow ordering on all fields
    ordering_fields = ['name', 'group', 'status', 'date_of_creation', 'date_of_expiry', 'is_negotiable', 'delivery_preference', 'breed', 'location', 'category', 'lotSizeDigit',
                       'lotSizeUnit', 'basePrice', 'pricePerUnit', 'minBookVal', 'maxBookVal', 'maxBookValUnit', 'minBookValUnit', 'isFresh', 'item_type']


class myItemViews(viewsets.ModelViewSet):

    '''
    ViewSet to manage requests for following usages:
    - User Sell history view
    - User current selling items(Types to be handled)
    - Seller add product(post method)
    '''

    # Setting up the permission class
    # isAuthenticated for write and read requests
    # Read only for before sign in requests
    permission_classes = [permissions.IsAuthenticated]
    # define the serializer class used for all further requests
    serializer_class = serializers.ItemSerializer

    # intialize the queryset with no objects. Actual data to be populated by overriding .get_queryset() method
    queryset = Item.objects.none()

    # Allow filtering on all fields
    filterset_fields = ['name', 'group', 'status', 'date_of_creation', 'date_of_expiry', 'is_negotiable', 'delivery_preference', 'breed', 'location', 'category', 'lotSizeDigit',
                        'lotSizeUnit', 'basePrice', 'pricePerUnit', 'minBookVal', 'maxBookVal', 'maxBookValUnit', 'minBookValUnit', 'isFresh', 'item_type']

    # Search would only lookup from the below fields
    search_fields = ['name', 'description', 'item_type']

    # Allow ordering on all fields
    ordering_fields = ['name', 'group', 'status', 'date_of_creation', 'date_of_expiry', 'is_negotiable', 'delivery_preference', 'breed', 'location', 'category', 'lotSizeDigit',
                       'lotSizeUnit', 'basePrice', 'pricePerUnit', 'minBookVal', 'maxBookVal', 'maxBookValUnit', 'minBookValUnit', 'isFresh', 'item_type']

    def get_queryset(self):
        return Item.objects.get_current_selling().filter(seller=self.request.user)

    # Override Post method to restrict creation of Items for other users
    def create(self, request, format=None):
        """
        logic to ensure the seller of this object is the user making the current request
        :return: Save the incoming form data and return appropriate message(Incuding error messages)
        """

        # Forcefully set the the seller attribute in the data to current user
        # Note that this will also accept requests which do not have seller attribute set
        # which may be normally be considered as an invalid request

        data = request.data.copy()  # Since it is immutable
        data['seller'] = request.user.id
        serialized_object = serializers.ItemSerializer(
            data=data)   # Pass the data to serializer
        # Check if the requested form data is valid
        if serialized_object.is_valid():
            validated_data = serialized_object.data
            item = serialized_object.save()

            try:
                item.basePricePerDigit = item.basePricePerDigit * \
                    conversion_constants[item.pricePerUnit.lower()]
                item.pricePerUnit = defaults[item.weightCat]
            except:
                pass
            try:
                item.lotSizeDigit = item.lotSizeDigit * \
                    conversion_constants[item.lotSizeUnit.lower()]
                item.lotSizeUnit = defaults[item.weightCat]
            except:
                pass
            try:
                item.maxBookVal = item.maxBookVal * \
                    conversion_constants[item.maxBookValUnit.lower()]
                item.maxBookValUnit = defaults[item.weightCat]
            except:
                pass
            try:
                item.minBookVal = item.minBookVal * \
                    conversion_constants[item.minBookValUnit.lower()]
                item.minBookValUnit = defaults[item.weightCat]
            except:
                pass

            item.save()

            # Check if there are any images attached to the request
            try:
                images = request.FILES
                print(images)
                for image in images.values():   # If images are found, then save them to the database
                    item_image = ItemImage(item=item, image=image)
                    item_image.save()
                return Response(serialized_object.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'data': 'error in images. Please try resubmit images.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        # Just to make sure images is also validated if info is not valid
        return Response(serialized_object.errors, status=status.HTTP_400_BAD_REQUEST)

    # "detail=False" represents that the method returns a list instead of a single object
    @action(detail=False)
    def current_selling(self, request):
        """
        logic for listing the all time selling items of authenticated user
        :params request: json object
        :returns: list of Item object for which current user is the seller
        """
        selling_history = self.get_queryset().filter(
            date_of_expiry__gte=now.date())  # Filter the items
        serialized_data = self.serializer_class(
            selling_history, many=True)  # Serialize the retrieved items
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def negotiation(self, request):
        data = CartItem.objects.filter(
            item__seller=request.user, status="pending")
        serialized_data = self.get_serializer(data, many=True)
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def change(self, request):
        if request.data.get('cart_item') is None or request.data.get('status') is None:
            return Response(data={"data": "cart_item or status are missing"}, status=status.HTTP_400_BAD_REQUEST)
        if CartItem.objects.filter(id=cart_item).count() == 0:
            return Response(data={"data": "No cart item with following id found"}, status=status.HTTP_404_NOT_FOUND)
        obj = CartItem.objects.get(id=cart_item)
        obj.status = status
        obj.save
        return Response(serializers.CartItemSerializer(obj, many=False).data, status=status.HTTP_200_OK)


class myItemImagesViews(viewsets.GenericViewSet,
                        mixins.CreateModelMixin,
                        mixins.DestroyModelMixin,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin):

    '''
    ViewSet to manage requests for following usages:
    - Images mapping to a particular item
    - Includes all the opertations except update/partial_update
    '''

    permission_classes = [permissions.IsAuthenticated]
    queryset = ItemImage.objects.none()
    serializer_class = serializers.ItemImageSerializer

    # Necessary to find the images of particular item
    filterset_fields = ['item', ]

    def get_queryset(self):
        '''
        Filter only the Images belonging to items owned by user(i.e. user is the seller of these products)
        '''
        return ItemImage.objects.filter(item__seller=self.request.user)


class CartViews(mixins.RetrieveModelMixin,
                viewsets.GenericViewSet):

    """
    Note: This model is not an ModelViewSet
    Only retrieveModelMixin is inherited to provide single cart retrieval
    All the other functionalities have been implemented separately

    Viewset to manage requests for following usages:
    - User Buying history
    - Add/Modify/Delete item in cart
    - Get user current cart
    - Get user previous checked out carts
    - Allow user to add item from previous cart to current cart
    """

    permission_classes = [permissions.IsAuthenticated]
    queryset = Cart.objects.none()
    serializer_class = serializers.CartSerializer

    def get_queryset(self):
        '''
        Although most of the queries will be handled by manager, this tweak is necessary to avoid any data leak(Mainly accessing other user carts)
        '''
        return Cart.objects.filter(buyer=self.request.user)

    def retrieve(self, request, pk=None):
        '''
        Overriding the existing retrieve method
        :purpose: Avoid User from retrieving other users cart details
        '''

        # Try/Catch required to handle the Item not found exception from DB
        try:
            cart_data = Cart.objects.get_cart(pk)  # Get the cart
            if cart_data.buyer != request.user:  # If the cart does not belong to requesting user return error
                return Response(data={'detail': "Not found."}, status=status.HTTP_404_NOT_FOUND)
            serialized_data = serializers.HistoryHelper(
                cart_data)  # Serialize the retrieved data
            return Response(data=serialized_data.data)
        except:
            return Response(data={'detail': "Not found."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False)
    def current(self, request):
        '''
        logic to retrieve the current cart of the requesting user
        :param request: Incoming request in json format
        :return: Current cart data.
        Note: If the current cart is not found for the user, then a new cart is created by the manager
        '''
        current_cart = Cart.objects.get_current_cart(
            request.user)  # Using the manager to get the cart
        serialized_data = serializers.HistoryHelper(
            current_cart)   # Using the custom serializer
        return Response(data=serialized_data.data)

    @action(detail=False)
    def history(self, request):
        '''
        logic to retrieve users previous carts irrespective of status
        :param request: json format
        :return: Requested Users all previous carts
        '''
        history = Cart.objects.get_history(
            request.user)    # Note the use of manager to retrieve data
        serialized_data = serializers.HistoryHelper(history, many=True)
        return Response(data=serialized_data.data)

    @action(detail=False)
    def checkout(self, request):
        '''
        Logic to checkout the user from his current cart

        Although most of this is internally handled my manager
        '''
        response_data = dict()  # Initialize a dictionary that will be returned later with the response
        try:
            # Start the transaction for
            transaction_data = Transaction.objects.checkout(
                request.user)
            serialized_data = serializers.TransactionHelper(transaction_data)
            response_data['data'] = serialized_data.data
        except Exception as e:
            print(e)
            response_data['error'] = str(e)
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)
        return Response(data=response_data)

    @action(detail=False, methods=['GET'])
    def clean_items(self, request):
        cart = Cart.objects.get_current_cart(request.user)
        Cart.objects.clean_invalid_items(cart)
        serialized_data = serializers.HistoryHelper(cart, many=False)
        return Response(serialized_data.data, status=status.HTTP_200_OK)


class myCartItemsView(viewsets.GenericViewSet,
                      mixins.CreateModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin):

    '''
    logic to handle retrieval/updation/deletion of Cart Items present in Users Current cart
    Note: Assuming that the user cannot change any details of checked out cart
    '''

    permission_classes = [permissions.IsAuthenticated]
    queryset = CartItem.objects.none()
    serializer_class = serializers.CartItemSerializer

    def get_queryset(self):
        '''
        Override the existing .get_queryset() method to allow access to only users cart items and not all cart items
        Note: Assuming that the user is only allowed to make changes to his current cart and not the previously checked out carts
        '''
        user_current_cart = Cart.objects.get_current_cart(self.request.user)
        return CartItem.objects.get_cart_items(user_current_cart)

    # Override create method to link the cart item to correct cart
    def create(self, request, format=None):
        '''
        Logic to add an item to users cart(current)

        Note that we did not extend the CreateModelMixin for this model.
        The reason being, we would have to run some logic before directly linking the item to Cart.
        We use managers to handle the internal logic for us.
        '''

        # Get current cart of the user
        current_cart = Cart.objects.get_current_cart(request.user)
        data = request.data.copy()  # Since request.data is immutable, make a copy
        data['cart'] = current_cart.id
        serialized_object = self.get_serializer(
            data=data)  # Pass the data to serializer
        if serialized_object.is_valid():    # Check if the requested form data is valid
            soldQty = 0
            try:
                soldQty = CartItem.objects.filter(item=Item.objects.get(data['item']), status="checkout").aggregate(
                    total=F('purchasedQty'))['total']
            except:
                soldQty = 0
            cart_item = serialized_object.save()
            try:
                cart_item.purchasedPricePerDigit = cart_item.purchasedPricePerDigit * \
                    conversion_constants[cart_item.purchasedPricePerUnit.lower()]
                cart_item.purchasedPricePerUnit = defaults[cart_item.item.weightCat]
            except:
                pass
            try:
                cart_item.purchasedQty = cart_item.purchasedQty * \
                    conversion_constants[cart_item.purchasedQtyUnit.lower()]
                cart_item.purchasedQtyUnit = defaults[cart_item.item.weightCat]
            except:
                pass
            if cart_item.isNegotiated is True:
                if cart_item.item.is_negotiable is False:
                    cart_item.delete()
                    return Response({"data": "This item is non negotiable"}, status=status.HTTP_400_BAD_REQUEST)
                cart_item.status = "pending"
            else:
                cart_item.status = "success"
            try:
                if cart_item.item.group == "bulk":
                    if cart_item.purchasedQty < cart_item.item.minBookVal:
                        cart_item.delete()
                        return Response({"data": "You have to purchase the farmers minimum threshold"}, status=status.HTTP_400_BAD_REQUEST)
                    if cart_item.purchasedQty > cart_item.item.maxBookVal:
                        cart_item.delete()
                        return Response({"data": "You cannot exceed farmers maximum threshold"}, status=status.HTTP_400_BAD_REQUEST)
                    if cart_item.purchasedQty > cart_item.item.lotSizeDigit - soldQty:
                        cart_item.delete()
                        return Response({"data": "Sorry! there is not enough stock left. Please try a smaller quantity."}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    if cart_item.purchasedQty > 10000:
                        cart_item.delete()
                        return Response({"data": "Sorry! there is not enough stock left. Please try a smaller quantity."}, status=status.HTTP_400_BAD_REQUEST)
            except:
                pass
            cart_item.save()
            return Response(serialized_object.data, status=status.HTTP_201_CREATED)
        return Response(serialized_object.errors, status=status.HTTP_400_BAD_REQUEST)


class myTransactionViews(viewsets.ModelViewSet):
    '''
    Fetch Structure:
    -id
    -time
    -description
    -amount
    -status
    '''

    permission_classes = [permissions.IsAuthenticated]
    queryset = Transaction.objects.none()
    serializer_class = serializers.TransactionHelper

    def get_queryset(self):
        '''
        Overriding the .get_queryset() method to include transactions belonging to user only
        '''
        return Transaction.objects.filter(cart__buyer=self.request.user)

    @action(detail=False, methods=['post'])
    def verify(self, request, *args, **kwargs):
        '''
        Verify the signatures using hashing and the payment_id recieved by client from the payment gateway
        '''
        if request.data.get('razorpay_payment_id') == None or request.data.get('razorpay_order_id') == None or request.data.get('razorpay_signature') == None:
            return Response(data={'data': "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
        client = razorpay.Client(
            auth=("rzp_test_qhsWdZwF3QKDfN", "B7BfIcSvcnsPR9Ed2DdcGYO6"))
        params_dict = {
            'razorpay_order_id': request.data['razorpay_order_id'],
            'razorpay_payment_id': request.data['razorpay_payment_id'],
            'razorpay_signature': request.data['razorpay_signature']
        }
        try:
            client.utility.verify_payment_signature(params_dict)
            Transaction.objects.transaction_success(
                request.data['razorpay_order_id'])
        except Exception as e:
            Transaction.objects.transaction_fail(
                request.data['razorpay_order_id'])
            return Response(data={"data": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"data": "Payment successful"}, status=status.HTTP_200_OK)


class myConnectionsView(viewsets.GenericViewSet):

    permission_classes = [permissions.IsAuthenticated]
    queryset = Connections.objects.all()
    serializer_class = serializers.ConnectionSerializer

    def validate_request(self, request):
        errors = dict()
        if request.data.get('user_id') == None:
            errors['error'] = 'required user_id'
            return data

        user_id = request.data['user_id']

        # Validate user_id. Check if such user exists and also the user_id should not match user making the request
        users_count = CustomUser.objects.filter(id=user_id).count()
        if users_count == 0 or str(user_id) == str(request.user.id):
            if users_count == 0:
                errors['error'] = 'User not found'
            if str(user_id) == str(request.user.id):
                errors['error'] = 'User cannot follow himself. Please provide user_id other than yourself'
            return errors

        return errors

    @action(detail=False, methods=['post'])
    def follow(self, request):
        # validate request
        data = self.validate_request(request)
        if data.get('error'):
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        user_id = request.data['user_id']

        user_instance = CustomUser.objects.get(id=user_id)

        # check if it already exits
        connection_count = self.get_queryset().filter(
            following=user_instance, follower=request.user).count()
        if connection_count == 0:  # The connection is not found. New connection needs to be established
            obj = Connections(follower=request.user, following=user_instance)
            obj.save()

        data = self.get_queryset().get(
            following=user_instance, follower=request.user)
        serialized_data = serializers.ConnectionSerializer(data)
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def unfollow(self, request):
        # validate request
        data = self.validate_request(request)
        if data.get('error'):
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        user_id = request.data['user_id']

        # if the user_id is missing, then revoke for same
        if request.data.get('user_id') == None:
            return Response(data={'error': 'user_id missing'}, status=status.HTTP_400_BAD_REQUEST)

        user_id = request.data['user_id']

        # Validate user_id. Check if such user exists and also the user_id should not match user making the request
        users_count = CustomUser.objects.filter(id=user_id).count()
        if users_count == 0 or str(user_id) == str(request.user.id):
            errors = dict()
            if users_count == 0:
                errors['error'] = 'User not found'
            if str(user_id) == str(request.user.id):
                errors['error'] = 'User cannot unfollow himself. Please provide user_id other than yourself'
            return Response(data=errors, status=status.HTTP_400_BAD_REQUEST)

        user_instance = CustomUser.objects.get(id=user_id)

        # check if it already exits
        connection_count = self.get_queryset().filter(
            following=user_instance, follower=request.user).count()
        if connection_count > 0:  # The connection is found. Delete the connection
            obj = Connections.objects.get(
                follower=request.user, following=user_instance)
            obj.delete()

        return Response(data={"data": "User successfully unfollowed"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def following(self, request):
        data_set = self.get_queryset().filter(follower=request.user)
        serialized_data = self.get_serializer(data_set, many=True)
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def followers(self, request):
        data_set = self.get_queryset().filter(following=request.user)
        serialized_data = self.get_serializer(data_set, many=True)
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def is_following(self, request):

        # validate request
        data = self.validate_request(request)
        if data.get('error'):
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        user_instance = CustomUser.objects.get(id=request.data['user_id'])
        data['is_following'] = self.get_queryset().filter(
            follower=request.user, following=user_instance).count()
        return Response(data=data, status=status.HTTP_200_OK)


# Views supporting only get requests

class ItemCategoryViews(viewsets.GenericViewSet,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin):

    queryset = ItemCategory.objects.all()
    serializer_class = serializers.ItemCategorySerializer
    permission_classes = []


class TopCarouselViews(viewsets.GenericViewSet,
                       mixins.ListModelMixin,
                       mixins.RetrieveModelMixin):

    queryset = TopCarouselUrl.objects.all()
    serializer_class = serializers.TopCarouselUrlSerializer
    permission_classes = []


class AdCategoryDataViews(viewsets.GenericViewSet,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin):

    queryset = AdCategoryData.objects.all()
    serializer_class = serializers.AdCategoryDataSerializer
    permission_classes = []


class AdDataViews(viewsets.GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin):

    queryset = AdData.objects.all()
    serializer_class = serializers.AdDataSerializer
    permission_classes = []


# Views for SMS
from rest_framework.decorators import api_view


class registerFromPhoneView(viewsets.GenericViewSet,
                            mixins.CreateModelMixin):

    queryset = CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer
    permission_classes = []

    limit_objects = 5

    def create(self, request):
        data = request.data
        serialized_data = serializers.CustomUserSerializer(data=data)
        if serialized_data.is_valid():
            user = CustomUser.objects.create_user(
                password=serialized_data.validated_data['password'], phone=serialized_data.validated_data['phone'])
            user.is_active = True
            user.save()
            return Response(data=serialized_data.data, status=status.HTTP_201_CREATED)
        return Response(data=serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def checkAuth(self, request):
        data = {"isValid": True, "data": dict()}
        if request.data.get("phone") is None:
            data["isValid"] = False
            data["data"]["error"] = "phone number should be provided"
            return data
        check = CustomUser.objects.filter(phone=request.data['phone']).count()
        if check is 0:
            data["isValid"] = False
            data["data"]["error"] = "phone number not registered yet."
            return data
        return data

    @action(methods=['POST'], detail=False)
    def get_my_items(self, request):
        result = self.checkAuth(request)
        if result['isValid'] is False:
            return Response(data=result['data'], status=status.HTTP_400_BAD_REQUEST)
        phone = request.data['phone']
        serialized_data = serializers.ItemSerializer(
            Item.objects.filter(seller__phone=phone).order_by('date_of_creation')[:self.limit_objects], many=True)
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def get_my_cart(self, request):
        result = self.checkAuth(request)
        if result['isValid'] is False:
            return Response(data=result['data'], status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.get(phone=request.data['phone'])
        current_cart = Cart.objects.get_current_cart(user)
        cart_items = CartItem.objects.get_cart_items(current_cart)
        serialized_data = serializers.CartItemSerializer(
            cart_items[:self.limit_objects], many=True)
        return Response(data=serialized_data.data, status=status.HTTP_200_OK)
