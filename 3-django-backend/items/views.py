from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Item, Product
from .serializers import ItemSerializer, ProductSerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    @action(detail=False, methods=['get'])
    def get_items(self, request):
        items = Item.objects.all()
        serializer = self.get_serializer(items, many=True)
        return Response({'items': serializer.data})

    @action(detail=True, methods=['get'])
    def get_item(self, request, pk=None):
        try:
            item = Item.objects.get(pk=pk)
            serializer = self.get_serializer(item)
            return Response({'item': serializer.data})
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)
        
class CustomPagination(PageNumberPagination):
    page_size = 50  # Default page size
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def get_products(request):
    try:
        products = Product.objects.all().order_by('product_id')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

