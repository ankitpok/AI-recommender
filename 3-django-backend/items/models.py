from django.db import models

# Create your models here.

class Item(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    image = models.CharField(max_length=255)
    company = models.CharField(max_length=100)
    item_name = models.CharField(max_length=255)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.IntegerField()
    return_period = models.IntegerField()
    delivery_date = models.CharField(max_length=50)
    rating_stars = models.FloatField()
    rating_count = models.IntegerField()

    def __str__(self):
        return self.item_name

class Product(models.Model):
    product_id = models.CharField(max_length=100, primary_key=True)
    product_name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percent = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    rating_count = models.IntegerField()
    image_url = models.URLField()
    product_url = models.URLField()
    
    def __str__(self):
        return self.product_name
    class Meta:
        db_table = 'flipkart_products'