from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class State(models.Model):

    state_code = models.CharField(_('State code'), max_length=20, blank=True)
    state = models.CharField(_('State Name'), max_length=200, blank=True)
    district_code = models.CharField(
        _('District code'), max_length=20, blank=True)
    district = models.CharField(_('District Name'), max_length=200, blank=True)
    sub_district_code = models.CharField(
        _('State code'), max_length=20, blank=True)
    sub_district = models.CharField(
        _('State Name'), max_length=200, blank=True)
    village_code = models.CharField(
        _('Village code'), max_length=20, blank=True)
    village = models.CharField(_('Village Name'), max_length=200, blank=True)

    class Meta:
        verbose_name = 'State'
        verbose_name_plural = 'States'
