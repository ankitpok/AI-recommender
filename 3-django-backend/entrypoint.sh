#!/bin/bash
set -e

python manage.py migrate --noinput

python load_items.py

exec python manage.py runserver 0.0.0.0:8000
