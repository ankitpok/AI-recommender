# Myntra Clone React Frontend

## Project Setup

This is a React-based frontend for the Myntra clone project.

### Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Backend Options

### Node.js Backend
- Runs on `http://localhost:8080`
- Original implementation

### Django Backend
- Runs on `http://localhost:8000`
- Alternative implementation with similar API

### Running Both Backends

1. Start the Node.js backend:
   ```bash
   cd ../2-actual-backend
   npm start
   ```

2. Start the Django backend:
   ```bash
   cd ../3-django-backend
   python manage.py runserver
   ```

3. Start the React frontend:
   ```bash
   npm run dev
   ```

**Note:** The application is currently configured to display items from the Django backend. You can switch between backends by modifying the API endpoint in `FetchItemsDjango.jsx`.