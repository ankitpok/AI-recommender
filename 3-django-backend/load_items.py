import os
import django
import json

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myntra_backend.settings')
django.setup()

from items.models import Item, Product


# def load_items():
#     # Read the JSON file from the original backend
#     with open(r'D:\react\Myntra clone\2-actual-backend\items.json', 'r') as f:
#         data = json.load(f)
    
#     # Clear existing items
#     Item.objects.all().delete()
    
#     # Load items from JSON
#     for item_data in data['items'][0]:
#         Item.objects.create(
#             id=item_data.get('id', ''),
#             image=item_data.get('image', ''),
#             company=item_data.get('company', ''),
#             item_name=item_data.get('item_name', ''),
#             original_price=item_data.get('original_price', 0),
#             current_price=item_data.get('current_price', 0),
#             discount_percentage=item_data.get('discount_percentage', 0),
#             return_period=item_data.get('return_period', 0),
#             delivery_date=item_data.get('delivery_date', ''),
#             rating_stars=item_data.get('rating', {}).get('stars', 0),
#             rating_count=item_data.get('rating', {}).get('count', 0)
#         )
    
#     print(f"Loaded {Item.objects.count()} items")
    





def load_flipkart_data():

    with open(r'D:\react\Myntra clone\2-actual-backend\flipkart_fashion_products_dataset.json', 'r') as f:
        products = json.load(f)

    Product.objects.all().delete()

    def parse_price(value):
        try:
            return float(str(value).replace(',', '').replace('₹', '').strip())
        except:
            return 0.0

    def parse_float(value, default=0.0):
        try:
            return float(value)
        except (ValueError, TypeError):
            return default

    def parse_int(value, default=0):
        try:
            if value in ['', None]:
                return default
            return int(float(str(value).strip()))
        except (ValueError, TypeError):
            return default

    seen_ids = set()
    seen_titles = set()

    for product in products:
        product_id = product.get('pid')
        product_title = product.get('title', '').strip().lower()  # Normalize title

        # Skip if ID or title already seen
        if not product_id or product_id in seen_ids or product_title in seen_titles:
            continue

        seen_ids.add(product_id)
        seen_titles.add(product_title)

        images = product.get('images', [])

        try:
            Product.objects.create(
                product_id=product_id,
                product_name=product.get('title', ''),
                brand=product.get('brand', ''),
                category=product.get('category', ''),
                price=parse_price(product.get('actual_price', '0')),
                discounted_price=parse_price(product.get('selling_price', '0')),
                discount_percent=parse_int(product.get('discount', '0%').replace('%', '').replace(' off', '').strip()),
                rating=parse_price(product.get('average_rating', '0')),
                rating_count=parse_int(product.get('rating_count', '0')),
                image_url=images[0] if images else '',
                product_url=product.get('url', ''),
            )
        except Exception as e:
            print(f"Error creating product {product_id}: {str(e)}")
            continue

    print(f"Successfully loaded {Product.objects.count()} products")

    
if __name__ == '__main__':
    #load_items()
    load_flipkart_data()