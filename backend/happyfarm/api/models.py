# from .manager import CustomUserManager
from django.db import models

from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.core.validators import ValidationError
from django.contrib.auth.base_user import BaseUserManager


from phonenumber_field.modelfields import PhoneNumberField

import api.manager as manager


class CustomUser(AbstractUser):

    # This is required to override the existing AbstractUser

    """
    Custom User model

    First Name :
    Last Name :
    Phone :
    Email :
    Password :
    Gender :
    Address :
    City :
    State :
    Date of Joining :
    Bank Account No. :
    IFSC Code :
    Registration Mode :
    Current Location :
    Crops Cultivated :
    Rating :
    Search History :
    """

    # Since username is set unique in AbstractUser we will set it to NULL
    username = None
    # Since we want all the emails to be unique, we have to override it here as it is absent in parent class
    email = models.EmailField(_('email_field'), blank=True)
    phone = models.CharField(
        _('Phone Number'), unique=True, max_length=20, blank=False)

    # This specifies that email will be used for authentication
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []

    objects = manager.CustomUserManager()

    """
    Declaring Feilds
    """
    first_name = models.CharField(
        _('first_name_field'), max_length=100, blank=True)
    last_name = models.CharField(
        _('last_name_field'), max_length=100, blank=True)

    phoneVerified = models.BooleanField(
        _('Phone Verified'), blank=True, default=False)
    plan = models.CharField(_('plan'), max_length=20,
                            blank=True, default="free")
    prefLang = models.CharField(
        _('Preferred Language'), max_length=50, blank=True, default="en")
    gender = models.CharField(_('gender_field'), max_length=20, blank=True)
    date_of_joining = models.DateTimeField(_('date_field'), auto_now_add=True)
    bank_account_no = models.CharField(
        _('bank_account_field'), max_length=50, blank=True)
    ifsc_code = models.CharField(
        _('ifsc_code_field'), max_length=50, blank=True)
    registration_mode = models.CharField(
        _('registration_field'), max_length=20, blank=False, default="website")
    current_location_latitude = models.DecimalField(
        max_digits=9, decimal_places=2, blank=True, null=True)
    current_location_longitude = models.DecimalField(
        max_digits=9, decimal_places=2, blank=True, null=True)
    profile_photo = models.ImageField(
        _('Profile Photo'), null=True, blank=True, upload_to="profile_photo/")
    alternate_profile_url = models.CharField(
        _('Alternate Photo Url'), max_length=300, blank=True, null=True)
    rating = models.DecimalField(
        _('User Rating'), max_digits=10, decimal_places=2, blank=True, default=0)

    # TODO: Crops Cultivated, rating, search history, pin

    def __str__(self):
        return self.phone  # to identify users based on their emails

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Address(models.Model):

    """
    Basic Model class to store address of users.(Mainly a list of address)
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(_('Name'), max_length=100, blank=False)
    country = models.CharField(_('Country'), max_length=100, blank=False)
    state = models.CharField(_('State'), max_length=100, blank=False)
    dist = models.CharField(_('District'), max_length=100, blank=False)
    subDist = models.CharField(_('Sub District'), max_length=100, blank=False)
    villageCity = models.CharField(
        _('Village City'), max_length=100, blank=True)
    address = models.CharField(_('Address'), max_length=300, blank=False)
    pin = models.CharField(_('Pin'), max_length=10, blank=False)
    contact = PhoneNumberField(_('Contact Number'), blank=False)
    isDefault = models.BooleanField(_('Is Default'), blank=True, default=False)

    class Meta:
        verbose_name = 'address'
        verbose_name_plural = 'address'


class IdProof(models.Model):

    """
    Basic Model class for storing ID proofs

    status = {failed,  verified,  pending}
    name
    file
    """

    status_choices = (
        ('rejected', 'Rejected'),
        ('verified', 'Verified'),
        ('pending', 'Pending')
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    status = models.CharField(
        _('Status'), max_length=50, choices=status_choices, default="pending")
    name = models.CharField(_('ID Name'), max_length=100, blank=False)
    file = models.FileField(_('File'), upload_to="id_proofs")


class Item(models.Model):

    """
    Basic Model class for Items

    Name:
    Item_type:
    status:
    seller:
    date_of_creation:
    date_of_expiry:
    base_price:
    quantity:
    is_negotiable:
    descritption:
    delivery_preference:

    """

    objects = manager.ItemManager()

    delivery_choices = (
        ('pick_up', 'Pick Up'),
        ('home_delivery', 'Home Delivery')
    )

    item_type_choices = (
        ('bulk', 'Bulk'),
        ('individual', 'Individual')
    )

    weight_cat_choices = (
        (1, 'mass'),
        (2, 'liquid'),
        (3, 'numbers')
    )

    status_states = (
        ("out_of_stock", "Out of Stock"),
        ("in_stock", "In Stock"),
        ("deleted", "Deleted"),
        ("draft", "Draft")
    )

    name = models.CharField(_('Item Name'), max_length=100, blank=False)
    group = models.CharField(
        _('Item Group'), max_length=10, choices=item_type_choices, default="bulk")
    status = models.CharField(
        _('Current Status'), max_length=20, choices=status_states, default="draft")
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date_of_creation = models.DateTimeField(
        _('Creation Date'), auto_now_add=True)
    date_of_expiry = models.DateTimeField(
        _('Expiry Date'), blank=True, null=True)
    is_negotiable = models.BooleanField(
        _('Negotiable'), default=False, blank=True)
    description = models.CharField(
        _('Description'), max_length=300, blank=True)
    delivery_preference = models.CharField(
        _('Delivery Preferences'), max_length=50, choices=delivery_choices, default="pick_up")
    breed = models.CharField(_('breed'), max_length=100, blank=True)
    location = models.CharField(_('location'), max_length=200, blank=True)
    category = models.CharField(_('Category'), max_length=100, blank=True)
    lotSizeDigit = models.DecimalField(_('Lot Size Digit(For Bulk)'),
                                       max_digits=30, decimal_places=2, blank=True, null=True)
    lotSizeUnit = models.CharField(
        _('Lot size unit(For Bulk)'), max_length=100, blank=True, null=True)
    basePrice = models.DecimalField(_('Base Price'),
                                    max_digits=30, decimal_places=2, blank=True, null=True)
    basePricePerDigit = models.DecimalField(_('Base Price Per Digit'),
                                            max_digits=30, decimal_places=2, blank=True, null=True)
    pricePerUnit = models.CharField(
        _('Price Per Unit(For Bulk)'), max_length=100, blank=True, null=True)
    shelfLifeDigit = models.DecimalField(_('Shelf life Digit'),
                                         max_digits=30, decimal_places=2, blank=True, null=True)
    shelfLifeSubDigit = models.DecimalField(_('Shelf Life Sub Digit'),
                                            max_digits=30, decimal_places=2, blank=True, null=True)
    shelfLifeUnit = models.CharField(
        _('Shelf Life Unit'), max_length=100, blank=True, null=True)
    shelfLifeSubUnit = models.CharField(
        _('Shelf Life Sub Unit'), max_length=100, blank=True, null=True)
    minBookVal = models.DecimalField(_('Min Book Value(For Bulk)'),
                                     max_digits=30, decimal_places=2, blank=True, null=True)
    minBookValUnit = models.CharField(
        _('Min Book Value Unit(For Bulk)'), max_length=100, blank=True, null=True)
    maxBookVal = models.DecimalField(_('Max Book Value(For Bulk)'),
                                     max_digits=30, decimal_places=2, blank=True, null=True)
    maxBookValUnit = models.CharField(
        _('Max Book Value Unit'), max_length=100, blank=True, null=True)
    isFresh = models.BooleanField(
        _('Is Fresh(For Individual)'), blank=True, default=True)
    item_type = models.CharField(
        _('Item Type(For Individual)'), max_length=100, blank=True, null=True)
    rating = models.DecimalField(_('Rating'),
                                 max_digits=10, decimal_places=2, blank=True, null=True)
    weightCat = models.DecimalField(
        _('Delivery Preferences'), max_digits=1, decimal_places=0, choices=weight_cat_choices, default=1)
    thumbnail = models.ImageField(
        _('Thumbnail'), blank=True, null=True, upload_to="item_images/thumbnails/")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Item'
        verbose_name_plural = 'Items'


class ItemDescription(models.Model):

    brief = models.CharField(
        _('Brief'), max_length=500, blank=True, null=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Item Description"
        verbose_name_plural = "Item Descriptions"


class ItemTable(models.Model):

    ItemDescription = models.ForeignKey(
        ItemDescription, on_delete=models.CASCADE)
    key = models.CharField(_('Key'), max_length=100, blank=True, null=True)
    value = models.CharField(_('Value'), max_length=200, blank=True, null=True)

    class Meta:
        verbose_name = "Item Table"
        verbose_name_plural = "Item Tables"


class ItemImage(models.Model):

    """
    Basic Model class to store images of Items uploaded by User

    Item: (Foreign Key)
    Image: (Using pillow lib)
    """

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    image = models.ImageField(_('Image'), null=True,
                              blank=True, upload_to="item_images/")
    alternate_image_url = models.CharField(
        _('Alternate Image Url'), max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = 'Item Image'
        verbose_name_plural = 'Items Images'


class Cart(models.Model):

    """
    Basic Model class for Cart

    Status:
    Buyer:
    """

    status_choices = (
        ('current', 'Current Cart'),
        ('checkout', 'Cart checked out')
    )

    objects = manager.CartManager()

    status = models.CharField(
        _('status'), max_length=20, choices=status_choices, blank=True, default="current")
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.buyer) + " " + self.status

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Cart'


class CartItem(models.Model):

    """
    Basi Model class for Individual Cart Items

    item_id:
    cart_id:
    final_price:
    date_added:
    quantity:
    """

    status_choices = (
        ('success', 'Success'),
        ('rejected', 'Rejected'),
        ('pending', 'Pending Request')
    )

    objects = manager.CartItemManager()

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    date_added = models.DateTimeField(_('Date Added'), auto_now_add=True)
    purchasedPrice = models.DecimalField(
        _('Purchased Price'), max_digits=20, decimal_places=2, blank=True, null=True)
    purchasedPricePerDigit = models.DecimalField(
        _('Purchased Price Per Digit'), max_digits=20, decimal_places=2, blank=True, null=True)
    purchasedPricePerUnit = models.CharField(
        _('Purchased Price Per Unit'), max_length=20, blank=True, null=True)
    isDeliverable = models.BooleanField(
        _('Is Deliverable'), blank=True, default=True)
    isNegotiated = models.BooleanField(
        _('Is Negotiated'), blank=True, default=False)
    purchasedQty = models.DecimalField(
        _('Purchased Quantity'), max_digits=20, decimal_places=2, blank=True, null=True)
    purchasedQtyUnit = models.CharField(
        _('Purchased Quantity Unit'), max_length=20, blank=True, null=True)
    taxPerc = models.DecimalField(
        _('Tax Percent'), max_digits=10, decimal_places=2, blank=True, default=18)
    deliveryCharge = models.DecimalField(
        _('Delivery Charge'), max_digits=20, decimal_places=2, blank=True, default=100)
    status = models.CharField(_('Status'), max_length=20,
                              choices=status_choices, default="success", blank=True)

    class Meta:
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Items'


class Transaction(models.Model):

    """
    Basic Model class for Transactions

    Procedure:
    1 - Client makes a request for a checkout(Current Cart).
    2 - An unique Transaction ID is generated and sent back to client
    3 - Client uses this id to make the online transaction
    4 - The signature recieved by the client from any payment gateway is verified with backend and the transaction completes

    Methods to handle above procedure:
    checkout(cart_id): returns transaction_id
    verify(payment_id): returns status

    cart:
    date:
    status:
    amount:
    amount_paid:
    amount_due:
    payment_mode:
    transport_mode:

    TODO:
    buyer_rating:
    seller_rating:
    """

    objects = manager.TransactionManager()

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    date = models.DateTimeField(_('Created at'), auto_now_add=True)
    status = models.CharField(
        _('Status'), max_length=10, blank=True, default="Pending")
    amount = models.DecimalField(
        _('Amount'), decimal_places=2, max_digits=10, blank=True, null=True)
    amount_paid = models.DecimalField(
        _('Amount Paid'), decimal_places=2, max_digits=10, blank=True, null=True)
    amount_due = models.DecimalField(
        _('Amount Due'), decimal_places=2, max_digits=10, blank=True, null=True)
    payment_mode = models.CharField(
        _('Payment Mode'), max_length=50, default="Online", blank=True, null=True)
    transport_mode = models.CharField(
        _('Transport Mode'), max_length=50, default='Courier', blank=True, null=True)
    # TODO: buyer and seller rating fields(Probably make a new rating class)

    class Meta:
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'


class Connections(models.Model):

    """
    Basic Model class for Connections

    Main methods:
    Follow(user_id)
    Unfollow(user_id)
    List_following()
    List_followers()
    is_following(user_id)

    follower:
    following:
    date_of_creation:
    status:

    """

    follower = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="Follower")
    following = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="Following")
    date_of_creation = models.DateTimeField(
        _('Creation Date'), auto_now_add=True)

    class Meta:
        verbose_name = 'Connection'
        verbose_name_plural = 'Connections'


'''
Category List:
name:
iconUrl:


topCarouselUrl:
name:
url:

AdCategoryData:
Sample
{
  adList: [
    {
      adId: "4376f",
      offerVal: "Upto 30% off",
      adImgUrl: Placeholder,
      adTitle: "Grapefruit",
      adDesc: "Tropica juicy fruit",
      adSubDesc: "from ₹ 59.00 / kg",
      adLink: "#",
    }
  ],
}

'''


class ItemCategory(models.Model):

    name = models.CharField(
        _('Item Category Name'), primary_key=True, max_length=200)
    iconUrl = models.CharField(
        _('Category Image Url'), max_length=300, blank=True, null=True)
    redirectUrl = models.CharField(
        _('Category Redirect Url'), max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class TopCarouselUrl(models.Model):

    name = models.CharField(
        _('Name'), max_length=200, blank=True)
    url = models.CharField(_('Top Carousel Image Url'),
                           max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = 'TopCarousel'
        verbose_name_plural = 'TopCarousel'


class AdCategoryData(models.Model):

    titleLeft1 = models.CharField(
        _('Title left 1'), max_length=300, blank=True, null=True)
    titleLeft2 = models.CharField(
        _('Title left 2'), max_length=300, blank=True, null=True)
    titleRight1 = models.CharField(
        _('Title right 1'), max_length=300, blank=True, null=True)
    titleRight2 = models.CharField(
        _('Title right 2'), max_length=300, blank=True, null=True)
    bgImage = models.CharField(
        _('Bg Image'), max_length=300, blank=True, null=True)
    bgImagePC = models.CharField(
        _('Bg Image PC'), max_length=300, blank=True, null=True)
    btnColor = models.CharField(
        _('Btn Color'), max_length=300, blank=True, null=True)
    fontColor = models.CharField(
        _('Font Color'), max_length=300, blank=True, null=True)
    fontColorPC = models.CharField(
        _('Font Color PC'), max_length=300, blank=True, null=True)
    graphicsLeftUrl = models.CharField(
        _('Graphics Left Url'), max_length=300, blank=True, null=True)
    graphicsRightUrl = models.CharField(
        _('Graphics Right Url'), max_length=300, blank=True, null=True)
    viewAllLink = models.CharField(
        _('View All Link'), max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = 'Ad Category Data'
        verbose_name_plural = 'Ad Category Data'


class AdData(models.Model):

    category = models.ForeignKey(AdCategoryData, on_delete=models.CASCADE)
    offerVal = models.CharField(
        _('Offer Value'), max_length=300, blank=True, null=True)
    adImgUrl = models.CharField(
        _('Ad Image Url'), max_length=300, blank=True, null=True)
    adTitle = models.CharField(
        _('Ad Title'), max_length=300, blank=True, null=True)
    adDesc = models.CharField(
        _('Ad Description'), max_length=300, blank=True, null=True)
    adSubDesc = models.CharField(
        _('Ad Sub Description'), max_length=300, blank=True, null=True)
    adLink = models.CharField(
        _('Ad Link'), max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = 'Ad Data'
        verbose_name_plural = 'Ad Data'
