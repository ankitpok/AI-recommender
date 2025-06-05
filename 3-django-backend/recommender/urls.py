from django.urls import path, include
from .views import product_recommendations


urlpatterns = [
    path('recommend/', product_recommendations, name='product-recommendation')
]
