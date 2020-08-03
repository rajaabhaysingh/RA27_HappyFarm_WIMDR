from .models import *
from rest_framework import serializers
from django.core import serializers as serializer
from django.utils import timezone
from phonenumber_field.phonenumber import to_python
from rest_framework.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.db.models import Sum, F


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        exclude = []


class CustomUserGeneralSerializer(serializers.ModelSerializer):

    address = serializers.SerializerMethodField()

    def get_address(self, obj):
        return AddressSerializer(Address.objects.filter(user=obj, isDefault=True), many=True).data

    class Meta:
        model = CustomUser
        fields = [
            'first_name',
            'last_name',
            'profile_photo',
            'alternate_profile_url',
            'phone',
            'email',
            'rating',
            'address',
        ]


class CustomUserRegisterSerializer(serializers.ModelSerializer):

    def validate_phone(self, phone):
        print(phone)
        if phone and to_python(phone).is_valid():
            return phone
        raise ValidationError(_('Invalid Phone Number'))

    class Meta:
        model = CustomUser
        exclude = []


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    addresses = serializers.SerializerMethodField()
    idProof = serializers.SerializerMethodField()

    def get_addresses(self, obj):
        return AddressSerializer(Address.objects.filter(user=obj), many=True).data

    def get_idProof(self, obj):
        return IDSerializer(IdProof.objects.filter(user=obj), many=True).data

    def validate_phone(self, phone):
        if phone and to_python(phone).is_valid():
            return phone
        raise ValidationError(_('Invalid Phone Number'))

    class Meta:
        model = CustomUser
        exclude = ['password', 'phoneVerified', 'groups', 'user_permissions',
                   'is_superuser', 'is_staff', 'is_active', ]


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class IDSerializer(serializers.ModelSerializer):

    class Meta:
        model = IdProof
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    '''
    A Model Serializer for Items

    TODO: Validation
    - expiry date should be strictly after creation date
    '''

    item_images = serializers.SerializerMethodField()
    soldPercent = serializers.SerializerMethodField()
    delTime = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    def get_description(self, obj):
        return ItemDescriptionSerializer(ItemDescription.objects.filter(item=obj), many=True).data

    def get_delTime(self, obj):
        return timezone.now() - obj.date_of_expiry

    def get_soldPercent(self, obj):
        sold = CartItem.objects.filter(
            item=obj, status="checkout").aggregate(total=Sum(F('purchasedQty')))
        calc = 0
        try:
            calc = (sold['total'] / obj.lotSizeDigit) * 100.0
        except Exception as e:
            pass
        return calc

    def get_item_images(self, obj):
        return ItemImageSerializer(ItemImage.objects.filter(item=obj), many=True).data

    def validate(self, data):
        if data.get('date_of_expiry') is not None:
            if data['date_of_expiry'] <= timezone.now():
                raise serializers.ValidationError(
                    "Date of expiry cannot be before or on creation date")
        return data

    class Meta:
        model = Item
        exclude = []
        # Note that the user cannot change the date of creation
        read_only_fields = ('date_of_creation',)

    def update(self, instance, validated_data):
        '''
        We will override the update method to prevent user from changing the ownership of an item to other user
        '''

        # We can simply ignore the seller field in the incoming request
        if validated_data.get('seller') is not None:
            validated_data.pop('seller')
        # Then call the generic update method to update the item
        return super(ItemSerializer, self).update(instance, validated_data)


class ItemDescriptionSerializer(serializers.ModelSerializer):

    table = serializers.SerializerMethodField()

    def get_table(self, obj):
        return ItemTableSerializer(ItemTable.objects.filter(ItemDescription=obj), many=True).data

    class Meta:
        model = ItemDescription
        exclude = []


class ItemTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemTable
        exclude = []


# class BulkItemSerializer(serializers.ModelSerializer):

#     item_images = serializers.SerializerMethodField()
#     soldPercent = serializers.SerializerMethodField()
#     delTime = serializers.SerializerMethodField()

#     def get_delTime(self, obj):
#         return obj.date_of_expiry - timezone.now()

#     def get_soldPercent(self, obj):
#         sold = CartItem.objects.filter(
#             item=obj).aggregate(total=Sum(F('purchasedQty')))
#         return (sold / obj.lotSizeDigit) * 100.0

#     def get_item_images(self, obj):
#         return ItemImageSerializer(ItemImage.objects.filter(item=obj), many=True).data

#     def validate(self, data):
#         if data.get('date_of_expiry') is not None:
#             if data['date_of_expiry'] <= utc.localize(datetime.now()):
#                 raise serializers.ValidationError(
#                     "Date of expiry cannot be in the past")
#         return data

#     class Meta:
#         model = Item
#         exlude = ['isFresh', 'item_type', 'addedDigit', 'addedUnit', ]
#         read_only_fields = ('date_of_creation',)

#     def update(self, instance, validated_data):
#         '''
#         We will override the update method to prevent user from changing the ownership of an item to other user
#         '''
#         # We can simply ignore the seller field in the incoming request
#         if validated_data.get('seller') is not None:
#             validated_data.pop('seller')
#         # Then call the generic update method to update the item
#         return super(BulkItemSerializer, self).update(instance, validated_data)


class ItemImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemImage
        exclude = []


class CartSerializer(serializers.ModelSerializer):

    '''
    A Model Serializer for Cart
    '''

    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):

    '''
    A Model Serializer for Cart Items
    '''

    item_details = serializers.SerializerMethodField()

    def get_item_details(self, obj):
        return ItemSerializer(obj.item).data

    class Meta:
        model = CartItem
        exclude = []
        read_only_fields = ('date_added',)


class TransactionSerializer(serializers.ModelSerializer):

    '''
    A Model Serializer for Transaction
    '''

    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('date',)


class HistoryHelper(serializers.ModelSerializer):

    '''
    A model serializer to attach the items linked to the cart object.

    Note: The simply Cart serializer declared earlier would not allow us to encapsulate the items as well
    '''

    def get_cart_items_obj(self, obj):
        '''
        method to retrieve all the cart-items associated with the cart
        '''
        return CartItemSerializer(CartItem.objects.get_cart_items(obj), many=True).data

    # Declare an extra field along with all the attributes of cart
    cart_items_obj = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        exclude = []    # Since using fields = '__all__' would not include the cart_items_obj


class TransactionHelper(serializers.ModelSerializer):

    '''
    A model serializer to include the cart and its items associated with the transaction

    Note: The previous declaration of Transaction Serializer would not allow us to implement this feature
    '''

    # Adding an extra field to denote cart object
    cart = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        exclude = []    # Since using fields = '__all__' would not include the cart

    def get_cart(self, obj):
        '''
        This method populates the cart field using the helper function 
        '''
        return HistoryHelper([obj.cart, ], many=True).data


class ConnectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Connections
        exclude = []
        read_only_fields = ('date_of_creation',)


class ItemCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemCategory
        fields = '__all__'


class TopCarouselUrlSerializer(serializers.ModelSerializer):

    class Meta:
        model = TopCarouselUrl
        fields = '__all__'


class AdCategoryDataSerializer(serializers.ModelSerializer):

    AdList = serializers.SerializerMethodField()

    def get_AdList(self, obj):
        return AdDataSerializer(AdData.objects.filter(category=obj), many=True).data

    class Meta:
        model = AdCategoryData
        exclude = []


class AdDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdData
        fields = '__all__'
