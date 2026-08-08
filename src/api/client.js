// src/api/client.js

const BASE_URL = "http://localhost:4000/api";


// ===============================
// API REQUEST HELPER
// ===============================

async function request(path, options = {}) {

  const headers = { ...(options.headers || {}) };

  // Only send JSON header if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {

    const res = await fetch(
      `${BASE_URL}${path}`,
      {
        ...options,
        headers,
      }
    );


    const data = await res.json();


    if (!res.ok) {

      throw new Error(
        data.error || `HTTP ${res.status}`
      );

    }


    return data;


  } catch (err) {

    console.error(
      "API Error:",
      err.message
    );

    return null;

  }

}



// ===============================
// API FUNCTIONS
// ===============================

export const api = {  deleteDish:(id)=>
    request(
        `/dishes/${id}`,
        {
            method:"DELETE"
        }
    ),


  // =========================
  // ADMIN LOGIN
  // =========================

  adminLogin: (data) =>
    request(
      "/admin/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),



  // =========================
  // DASHBOARD
  // =========================

  getStats: () =>
    request("/stats"),



  // =========================
  // DISHES / MENU
  // =========================


  // get menu items
  getDishes: (all = false) =>
    request(
      `/dishes${all ? "?all=true" : ""}`
    ),



  // get single dish
  getDish: (id) =>
    request(
      `/dishes/${id}`
    ),



  // add new food
  addDish: (data) =>
  request(
    "/dishes",
    {
      method: "POST",
      body: data,
    }
  ),



  // change price, image, name, description...
  updateDish: (id, data) =>
    request(
      `/dishes/${id}`,
      {
        method: "PUT",
        body: data
      }
    ),



  // hide/show food
  toggleAvailability: (id, available) =>
    request(
      `/dishes/${id}/availability`,
      {
        method: "PATCH",
        body: JSON.stringify({
          available,
        }),
      }
    ),

updateDish:(id,data)=>

request(
`/dishes/${id}`,
{
method:"PUT",
body:JSON.stringify(data)
}
),

  // remove food permanently
  deleteDish: (id) =>
    request(
      `/dishes/${id}`,
      {
        method: "DELETE",
      }
    ),




  // =========================
  // CATEGORIES
  // =========================


  getCategories: () =>
    request(
      "/categories"
    ),



  addCategory: (data) =>
    request(
      "/categories",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),



  updateCategory: (id, data) =>
    request(
      `/categories/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),



  deleteCategory: (id) =>
    request(
      `/categories/${id}`,
      {
        method: "DELETE",
      }
    ),




  // =========================
  // ORDERS (future)
  // =========================


  getOrders: () =>
    request(
      "/orders"
    ),



  createOrder: (data) =>
    request(
      "/orders",
      {
        method:"POST",
        body:JSON.stringify(data),
      }
    ),



  updateOrderStatus:(id,status)=>
    request(
      `/orders/${id}/status`,
      {
        method:"PATCH",
        body:JSON.stringify({
          status
        })
      }
    )

     

};