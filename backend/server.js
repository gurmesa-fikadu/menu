// ═══════════════════════════════════════════════════════
// Habesha Bites — Express server
// Run: npm install && npm start
// (Make sure MySQL is running and schema.sql + seed.sql are imported first.)
// ═══════════════════════════════════════════════════════

const express = require('express')
const cors = require('cors')
const pool = require('./db')
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },

  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }

});

const upload = multer({
  storage
});

const app = express()
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use(
  "/uploads",
  express.static("uploads")
);

// ── Helper: map DB row → dish shape the frontend expects ──
function mapDish(row, req) {
  // Dynamically detect server domain (e.g. https://your-app.onrender.com)
  const baseUrl = req ? `${req.protocol}://${req.get('host')}` : '';
  
  return {
    id: row.id,
    name: row.name,
    category: row.category_name || 'traditional',
    categoryId: row.category_id,
    price: Number(row.price),
    portion: row.portion,
    image: row.image_url
      ? (row.image_url.startsWith('http') ? row.image_url : `${baseUrl}${encodeURI(row.image_url)}`)
      : "",
    gallery:
      typeof row.gallery === "string"
      ? JSON.parse(row.gallery || "[]")
      : row.gallery || [],
    rating: Number(row.rating),
    prepTime: row.prep_time_minutes,
    restaurant: row.restaurant,
    available: Boolean(row.available),
    description: row.description,
  }
}

// ════════ ROOT ROUTE ════════
app.get('/', (req, res) => {
  res.send('Habesha Bites API is up and running on Render!');
});

// ════════ CATEGORIES ════════

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY id')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ════════ DISHES ════════

// GET /api/dishes — optional ?category= filter, only available by default
app.get('/api/dishes', async (req, res) => {
  try {
    const { category } = req.query
    const showAll = req.query.all === 'true'

    let sql = `
      SELECT d.*, c.name AS category_name
      FROM dishes d
      LEFT JOIN categories c ON d.category_id = c.id
      WHERE 1=1
    `
    const params = []

    if (!showAll) {
      sql += ' AND d.available = TRUE'
    }
    if (category && category !== 'all') {
      sql += ' AND c.name = ?'
      params.push(category)
    }
    sql += ' ORDER BY d.id'

    const [rows] = await pool.query(sql, params)
    res.json(rows.map(row => mapDish(row, req)))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/dishes/:id
app.get('/api/dishes/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.*, c.name AS category_name
       FROM dishes d
       LEFT JOIN categories c ON d.category_id = c.id
       WHERE d.id = ?`,
      [req.params.id]
    )
    if (rows.length === 0) return res.status(404).json({ error: 'Dish not found' })
    res.json(mapDish(rows[0], req))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/dishes — admin: add a new dish
app.post(
  "/api/dishes",
  upload.single("image"),
  async (req, res) => { console.log(req.file);
console.log(req.body);
  try {
    const {
  name,
  category_id,
  description,
  price,
  portion,
  rating,
  prep_time_minutes,
  restaurant,
  available,
  gallery
} = req.body;

const image_url = req.file
  ? "/uploads/" + req.file.filename
  : null;

    const [result] = await pool.query(
  `INSERT INTO dishes
  (
    category_id,
    name,
    description,
    price,
    \`portion\`,
    image_url,
    gallery,
    rating,
    prep_time_minutes,
    restaurant,
    available
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    category_id || null,
    name,
    description || "",
    Number(price),
    portion || "",
    image_url,
    JSON.stringify([]),
    Number(rating || 0),
    Number(prep_time_minutes || 0),
    restaurant || "Habesha Bites Kitchen",
    available ? 1 : 0
  ]
);
    res.status(201).json({ id: result.insertId, message: 'Dish added' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE FOOD
// DELETE DISH
app.delete("/api/dishes/:id", async (req, res) => {

  try {

    const { id } = req.params;


    // delete related order items first
    await pool.query(
      "DELETE FROM order_items WHERE dish_id=?",
      [id]
    );


    // delete dish
    await pool.query(
      "DELETE FROM dishes WHERE id=?",
      [id]
    );


    res.json({
      success:true,
      message:"Dish deleted successfully"
    });


  } catch(error) {

    console.error("DELETE DISH ERROR:", error);


    res.status(500).json({
      success:false,
      error:error.message
    });

  }

});

// PUT /api/dishes/:id — admin: update any dish field (price, image, name, etc.)
app.put('/api/dishes/:id', async (req, res) => {
  try {
    const allowed = [
      'category_id', 'name', 'description', 'price', 'portion',
      'image_url', 'gallery', 'rating', 'prep_time_minutes', 'restaurant', 'available'
    ]
    const updates = []
    const params = []
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates.push(`${key} = ?`)
        params.push(
          key === 'gallery' ? JSON.stringify(req.body[key]) : req.body[key]
        )
      }
    }
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' })
    }
    params.push(req.params.id)

    await pool.query(`UPDATE dishes SET ${updates.join(', ')} WHERE id = ?`, params)
    res.json({ message: 'Dish updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/dishes/:id/availability — admin: hide/show a dish (toggle cart)
app.patch('/api/dishes/:id/availability', async (req, res) => {
  try {
    const { available } = req.body
    await pool.query('UPDATE dishes SET available = ? WHERE id = ?', [available, req.params.id])
    res.json({ message: 'Availability updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/dishes/:id — admin: remove a dish
app.delete('/api/dishes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM dishes WHERE id = ?', [req.params.id])
    res.json({ message: 'Dish deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ════════ ORDERS ════════

// GET /api/orders — admin: list all orders
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    const [items] = await pool.query(
      `SELECT oi.*, d.name AS dish_name
       FROM order_items oi
       LEFT JOIN dishes d ON oi.dish_id = d.id`
    )
    const result = orders.map((o) => ({
      ...o,
      items: items
        .filter((i) => i.order_id === o.id)
        .map((i) => ({ name: i.dish_name, qty: i.quantity, price: Number(i.price_at_order) })),
    }))
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/orders — create a new order
app.post('/api/orders', async (req, res) => {
  const conn = await pool.getConnection()
  try {
    const { user_id, items, subtotal, delivery_fee, discount, total } = req.body

    await conn.beginTransaction()

    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, subtotal, delivery_fee, discount, total, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [user_id || null, subtotal, delivery_fee, discount || 0, total]
    )
    const orderId = orderResult.insertId

    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items (order_id, dish_id, quantity, price_at_order)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.dish_id, item.qty, item.price]
      )
    }

    await conn.commit()
    res.status(201).json({ id: orderId, message: 'Order placed' })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally {
    conn.release()
  }
})

// PATCH /api/orders/:id/status — admin: update order status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id])
    res.json({ message: 'Order status updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ════════ USERS ════════

// POST /api/users — create or update a user (simple, no auth here)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, delivery_address } = req.body
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length) {
      await pool.query(
        'UPDATE users SET name = ?, delivery_address = ? WHERE email = ?',
        [name, delivery_address, email]
      )
      res.json({ id: existing[0].id, message: 'User updated' })
    } else {
      const [result] = await pool.query(
        'INSERT INTO users (name, email, delivery_address) VALUES (?, ?, ?)',
        [name, email, delivery_address]
      )
      res.status(201).json({ id: result.insertId, message: 'User created' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ════════ ADMIN STATS ════════

// GET /api/stats — dashboard summary
app.get('/api/stats', async (req, res) => {
  try {
    const [revenueRow] = await pool.query('SELECT COALESCE(SUM(total), 0) AS total FROM orders')
    const [orderCount] = await pool.query('SELECT COUNT(*) AS count FROM orders')
    const [pendingRow] = await pool.query("SELECT COUNT(*) AS count FROM orders WHERE status = 'pending'")
    const [dishRow] = await pool.query('SELECT COUNT(*) AS count FROM dishes')
    const [availRow] = await pool.query('SELECT COUNT(*) AS count FROM dishes WHERE available = TRUE')

    res.json({
      totalRevenue: Number(revenueRow[0].total),
      totalOrders: orderCount[0].count,
      pendingOrders: pendingRow[0].count,
      totalDishes: dishRow[0].count,
      availableDishes: availRow[0].count,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ════════ Start server ════════

// ════════ ADMIN LOGIN ════════

app.post('/api/admin/login', async(req,res)=>{

  try{

    const {username,password}=req.body

    const [rows]=await pool.query(
      "SELECT * FROM admins WHERE username=? AND password=?",
      [username,password]
    )


    if(rows.length===0){

      return res.status(401).json({
        success:false,
        message:"Invalid username or password"
      })

    }


    res.json({
      success:true,
      admin:{
        id:rows[0].id,
        username:rows[0].username
      }
    })


  }catch(err){

    res.status(500).json({
      error:err.message
    })

  }

})
// IMAGE UPLOAD CONFIG

// const storage = multer.diskStorage({

//   destination:(req,file,cb)=>{

//     cb(null,"uploads/");

//   },


//   filename:(req,file,cb)=>{

//     const uniqueName =
//     Date.now() + "-" + file.originalname;


//     cb(null,uniqueName);

//   }

// });


// const upload = multer({
//   storage
// });

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Habesha Bites API running on http://localhost:${PORT}`)
})

