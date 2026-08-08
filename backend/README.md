# Habesha Bites — Backend (Node + Express + MySQL)

REST API for the Habesha Bites app. Manages dishes, categories, orders, users, and admin stats.

## Setup

1. **Start MySQL** (XAMPP / MariaDB / standalone).
2. **Create the database & tables:**
   ```bash
   mysql -u root < schema.sql
   ```
3. **Load seed data:**
   ```bash
   mysql -u root < seed.sql
   ```
4. **Install dependencies & start:**
   ```bash
   npm install
   npm start
   ```
   The API runs on `http://localhost:4000`.

## Database config

`db.js` defaults to XAMPP settings (`root`, blank password, `habesha_bites`). Edit it if your MySQL setup differs.

## API endpoints

### Categories

| Method | Path              | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/api/categories` | List all categories |

### Dishes

| Method | Path                           | Description                                                        |
| ------ | ------------------------------ | ------------------------------------------------------------------ |
| GET    | `/api/dishes`                  | List dishes (optional `?category=`, `?all=true` to include hidden) |
| GET    | `/api/dishes/:id`              | Get one dish                                                       |
| POST   | `/api/dishes`                  | Add a dish (admin)                                                 |
| PUT    | `/api/dishes/:id`              | Update any dish field — price, image, name, etc. (admin)           |
| PATCH  | `/api/dishes/:id/availability` | Toggle available / hide from cart (admin)                          |
| DELETE | `/api/dishes/:id`              | Delete a dish (admin)                                              |

### Orders

| Method | Path                     | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | `/api/orders`            | List all orders with items (admin) |
| POST   | `/api/orders`            | Place a new order                  |
| PATCH  | `/api/orders/:id/status` | Update order status (admin)        |

### Users

| Method | Path         | Description             |
| ------ | ------------ | ----------------------- |
| POST   | `/api/users` | Create or update a user |

### Admin stats

| Method | Path         | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/api/stats` | Dashboard summary (revenue, counts) |

## Example requests

```bash
# Get all available dishes
curl http://localhost:4000/api/dishes

# Change a dish price
curl -X PUT http://localhost:4000/api/dishes/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 390}'

# Change a dish image
curl -X PUT http://localhost:4000/api/dishes/1 \
  -H "Content-Type: application/json" \
  -d '{"image_url": "https://example.com/new-photo.jpg"}'

# Hide a dish from the menu & cart
curl -X PATCH http://localhost:4000/api/dishes/1/availability \
  -H "Content-Type: application/json" \
  -d '{"available": false}'

# Add a new dish
curl -X POST http://localhost:4000/api/dishes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gomen",
    "category_id": 3,
    "price": 150,
    "portion": "Serves 1 • 250g",
    "image_url": "https://example.com/gomen.jpg",
    "description": "Collard greens sautéed with garlic and ginger.",
    "rating": 4.6,
    "prep_time_minutes": 15,
    "available": true
  }'

# Place an order
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "items": [{"dish_id": 1, "qty": 2, "price": 350}],
    "subtotal": 700,
    "delivery_fee": 40,
    "discount": 60,
    "total": 680
  }'
```
