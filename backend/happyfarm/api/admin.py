from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from . import models


@admin.register(models.CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = models.CustomUser

    list_display = ('phone', 'is_staff', 'is_active',)
    list_filter = ('phone', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'phone',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active',)}),
        ('Profile', {'fields': ('first_name', 'last_name',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('phone', 'password1', 'password2', 'phone', 'is_staff', 'is_active',)
        }),
    )

    search_fields = ('email', 'phone',)
    ordering = ('phone',)


@admin.register(models.Item)
class ItemAdmin(admin.ModelAdmin):

    readonly_fields = ('date_of_creation',)
    list_display = ('name', 'seller', 'group',
                    'status', 'date_of_creation')
    ordering = ('date_of_creation',)
    search_fields = ('seller', 'name', 'date_of_creation', 'group',)


@admin.register(models.ItemImage)
class ItemImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_seller', 'item',)
    ordering = ('item',)
    search_fields = ('id', 'item')

    def get_seller(self, obj):
        return obj.item.seller


@admin.register(models.Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_buyer', 'payment_mode', 'status', 'date',)
    ordering = ('date',)
    search_fields = ('id', 'cart')

    def get_buyer(self, obj):
        return obj.cart.buyer


@admin.register(models.Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer', 'status')
    ordering = ('id',)
    search_fields = ('buyer', 'status')


@admin.register(models.CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'item', 'get_buyer', 'date_added',)
    ordering = ('item', 'date_added')
    search_fields = ('get_buyer',)

    def get_buyer(self, obj):
        return obj.cart.buyer


@admin.register(models.Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'state', 'country', 'dist',)
    ordering = ('user', 'state', 'country')
    search_fields = ('id', 'user', 'country', 'state', 'dist')


@admin.register(models.IdProof)
class IdProofAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'status',)
    ordering = ('user', 'status', 'name')
    search_fields = ('id', 'user', 'name', 'status',)


@admin.register(models.ItemCategory)
class ItemCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)
    search_fields = ('name', 'url',)


@admin.register(models.TopCarouselUrl)
class TopCarouselAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    ordering = ('name',)
    search_fields = ('id', 'name', 'url',)


@admin.register(models.AdCategoryData)
class AdCategoryDataAdmin(admin.ModelAdmin):
    list_display = ('id',)
    ordering = ('id',)
    search_fields = ('id',)


@admin.register(models.AdData)
class AdDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'adTitle', 'category',)
    ordering = ('category',)
    search_fields = ('id', 'category', 'adTitle')


@admin.register(models.ItemDescription)
class ItemDescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'brief')
    ordering = ('id', 'brief')
    search_fields = ('id', 'brief')


@admin.register(models.ItemTable)
class ItemTableAdmin(admin.ModelAdmin):
    list_display = ('id', 'key', 'value',)
    ordering = ('key',)
    search_fields = ('id', 'value', 'key')
