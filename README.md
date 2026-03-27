# Online Storefront

An educational SPA built with Vue 3 + Vite, featuring local product CRUD.

## Features

- Browse the product list
- Open product details by id
- Add a product
- Edit a product
- Delete a product
- Toast notifications
- Product image validation:
  - If the URL does not end with an image extension, a default image is used
  - If the image URL fails to load, the UI falls back to the default image

## Tech Stack

- Vue 3
- Vue Router
- Vite
- Tailwind CSS
- Axios
- json-server
- vue-toastification

## Data Source

Local database file:

- `src/products.json`

json-server exposes this endpoint:

- `http://localhost:5000/products`

The frontend uses the Vite proxy route:

- `/api/products`

## Installation

```bash
npm install
```

## Development Run

Run 2 processes in separate terminals.

1. Local API (json-server):

```bash
npm run server
```

2. Vite dev server:

```bash
npm run dev
```

After that, the app will be available at the Vite URL (usually `http://localhost:3000`).

## Scripts

- `npm run dev` - start frontend (Vite)
- `npm run server` - start json-server on port 5000
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run format` - format source files

## Structure (Short)

- `src/components` - UI components
- `src/views` - app pages
- `src/router` - routing
- `src/assets` - styles and images
- `src/products.json` - local product data

## Important Notes

- If you see a proxy error like `ECONNREFUSED`, `npm run server` is not running.
- If you see `EADDRINUSE: 5000`, port 5000 is already occupied by another json-server process.
- This project is intended for local use as an educational example with a file-based database.

## Views
