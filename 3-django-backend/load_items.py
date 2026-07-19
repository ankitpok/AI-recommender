import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myntra_backend.settings')
django.setup()

from items.models import Item, Product


DATA_DIR = os.environ.get('DATA_DIR', os.path.join(os.path.dirname(__file__), '..', 'data'))


def load_items():
    items_path = os.path.join(DATA_DIR, 'items.json')
    with open(items_path, 'r') as f:
        data = json.load(f)

    Item.objects.all().delete()

    for item_data in data['items'][0]:
        Item.objects.create(
            id=item_data.get('id', ''),
            image=item_data.get('image', ''),
            company=item_data.get('company', ''),
            item_name=item_data.get('item_name', ''),
            original_price=item_data.get('original_price', 0),
            current_price=item_data.get('current_price', 0),
            discount_percentage=item_data.get('discount_percentage', 0),
            return_period=item_data.get('return_period', 0),
            delivery_date=item_data.get('delivery_date', ''),
            rating_stars=item_data.get('rating', {}).get('stars', 0),
            rating_count=item_data.get('rating', {}).get('count', 0)
        )

    print(f"Loaded {Item.objects.count()} items")


def load_flipkart_data():
    flipkart_path = os.path.join(DATA_DIR, 'flipkart_fashion_products_dataset.json')
    with open(flipkart_path, 'r') as f:
        products = json.load(f)

    Product.objects.all().delete()

    def parse_price(value):
        try:
            return float(str(value).replace(',', '').replace('₹', '').strip())
        except:
            return 0.0

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
        product_title = product.get('title', '').strip().lower()

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
    load_items()
    load_flipkart_data()
