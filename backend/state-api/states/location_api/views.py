from django.shortcuts import render
from rest_framework import permissions, viewsets, filters, generics, mixins
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .serializers import StateSerializer
from .models import State


class StateViews(viewsets.GenericViewSet):

    serializer_class = StateSerializer
    queryset = State.objects.all()
    permission_classes = []

    @action(methods=['GET'], detail=False)
    def places(self, request):
        data = State.objects.order_by().values('state').distinct()
        params = request.query_params
        if params.get('state') is not None:
            data = State.objects.filter(state=params.get(
                'state')).order_by().values('district').distinct()
        if params.get('district') is not None:
            data = State.objects.filter(district=params.get(
                'district')).order_by().values('sub_district').distinct()
        if params.get('sub_district') is not None:
            data = State.objects.filter(sub_district=params.get(
                'sub_district')).order_by().values('village').distinct()
        serialized_data = StateSerializer(data, many=True)
        return Response(data={"data": serialized_data.data}, status=status.HTTP_200_OK)
