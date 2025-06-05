# Myntra Clone - Django Backend

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/Scripts/activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Load initial data:
```bash
python load_items.py
```

5. Run the server:
```bash
python manage.py runserver
```

## API Endpoints
- `GET /items/`: Retrieve all items
- `GET /items/{id}/`: Retrieve a specific item by ID
- `POST /items/`: Create a new item

## Features
- Django REST Framework backend
- CORS enabled
- UUID-based item identification
- Simple item management
