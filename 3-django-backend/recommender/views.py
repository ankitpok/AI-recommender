from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import ProductRecommender
from django.views.decorators.csrf import csrf_exempt
from items.models import Product


@csrf_exempt
@api_view(['POST'])
def product_recommendations(request):
    try:
        # Proper JSON parsing
        data = request.data
        product_title = data.get('input', '')  # Changed from request.GET
        
        if not product_title:
            #print("ERROR: Empty product title received")
            return Response({'error': 'Product title is required'}, status=400)
            
        #print(f"Processing recommendations for: '{product_title}'")
        
        recommender = ProductRecommender()
        recommendations = recommender.recommend(product_title)
        recommended_products = Product.objects.filter(
            product_name__in=recommendations
        ).values('product_id', 'product_name', 'image_url', 'discounted_price')[:5]
        
        return Response({
            'input': product_title,
            'recommendations': recommendations,
            'products': list(recommended_products)
            
        })
        
    except Exception as e:
        print("API Error:", str(e))
        return Response({'error': str(e)}, status=500)