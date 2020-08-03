from django.contrib import admin

from .models import State

# Register your models here.
@admin.register(State)
class ItemAdmin(admin.ModelAdmin):

    list_display = ('state', 'district', 'sub_district',
                    'village',)
    ordering = ('state', 'district', 'sub_district',
                'village',)
    search_fields = ('state', 'district', 'sub_district',
                     'village')
