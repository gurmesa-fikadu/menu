import React, { useState, useEffect } from 'react'
import './App.css'

import HomeScreen from './screens/HomeScreen.jsx'
import MenuScreen from './screens/MenuScreen.jsx'
import DishDetailScreen from './screens/DishDetailScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import CheckoutScreen from './screens/CheckoutScreen.jsx'

import { Routes, Route } from 'react-router-dom'

import AdminLayout from './admin/AdminLayout.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import MenuManager from './admin/MenuManager.jsx'
import AdminLogin from './admin/AdminLogin.jsx'

import BottomNav from './components/BottomNav.jsx'

import { dishes as seedDishes } from './data/mockData.js'

// ── API BASE URL (Vercel Env Variable or Render Production Backend) ──
const API_BASE = import.meta.env.VITE_API_URL || 'https://restaurant-backend-lrk6.onrender.com'

export default function App() {

  const [screen, setScreen] = useState('home')

  // ADMIN
  const [adminPage, setAdminPage] = useState('dashboard')

  const [adminLogged, setAdminLogged] = useState(
    Boolean(localStorage.getItem("admin"))
  )

  const [selectedDish, setSelectedDish] = useState(null)

  const [cart, setCart] = useState([])

  const [dishes, setDishes] = useState([])

  const [categories, setCategories] = useState([])

  const loadDishes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/dishes`)
      const data = await res.json()
      setDishes(data)
    } catch(err){
      console.error("Loading dishes failed:", err)
    }
  }

  useEffect(() => {
    loadDishes()
  }, [])

  // LOAD CATEGORIES
  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
      .catch(err => {
        console.error("Category loading error:", err)
      })
  }, [])





  const addToCart=(dish)=>{


    if(dish.available===false)
      return



    setCart(prev=>{


      const existing =
      prev.find(i=>i.id===dish.id)



      if(existing){

        return prev.map(i=>

          i.id===dish.id

          ?

          {
            ...i,
            qty:i.qty+1
          }

          :

          i

        )

      }



      return [

        ...prev,

        {

          id:dish.id,
          name:dish.name,
          price:dish.price,
          portion:dish.portion,
          image:dish.image,
          qty:1

        }

      ]


    })


  }





  const viewDish=(dish)=>{

    setSelectedDish(dish)

    setScreen('detail')

  }






  const handleNavigate = (tab) => {

  if (tab === 'home') {
    setScreen('home')
  }

  else if (tab === 'menu') {
    setScreen('menu')
  }

  else if (tab === 'cart') {
    setScreen('cart')
  }

  else if (tab === 'profile') {
    setScreen('profile')
  }

}





  const cartCount =
  cart.reduce(
    (sum,item)=>sum+item.qty,
    0
  )





  // ============================
  // ADMIN AREA
  // ============================

  if(screen==='admin'){



    // NOT LOGGED IN

    if(!adminLogged){


      return (

        <AdminLogin

          onLogin={()=>{

          setAdminLogged(true)

          setScreen("admin")

   }}

/>

      )

    }




    // LOGGED IN

    return (

      <AdminLayout

      connected={true}

      activePage={adminPage}

      onNavigate={(page)=>{

        console.log(
          "ADMIN PAGE:",
          page
        )

        setAdminPage(page)

      }}


      onExit={()=>{

        localStorage.removeItem("admin")

        setAdminLogged(false)

        setScreen("home")

      }}

      >



      {
        adminPage==='dashboard'

        &&

        <AdminDashboard />

      }




      {
         adminPage === "menu" &&
        <MenuManager
         refreshDishes={loadDishes}
         />
      }




      </AdminLayout>

    )


  }








  // DISH DETAIL

  if(screen==='detail' && selectedDish){


    return (

      <DishDetailScreen

      dish={selectedDish}

      onBack={()=>setScreen('home')}

      onAddToCart={addToCart}

      />

    )

  }






  // CART

  if(screen==='cart'){


    return (

      <CartScreen

      cartItems={cart}

      setCartItems={setCart}

      onBack={()=>setScreen('home')}

      onCheckout={()=>setScreen('checkout')}

      />

    )

  }





  // CHECKOUT

  if(screen==='checkout'){


    return (

      <CheckoutScreen

      cartItems={cart}

      onBack={()=>setScreen('cart')}

      onPlaceOrder={()=>{}}

      />

    )

  }

// =========================
// MENU
// =========================

if (screen === 'menu') {

  return (

    <MenuScreen

      dishes={dishes}

      categories={categories}

      onViewDish={viewDish}

      onAddToCart={addToCart}

      onNavigate={handleNavigate}

      activeScreen={screen}

      cartCount={cartCount}

    />

  )

}



  // PROFILE

  if(screen==="profile"){

return(

<div className="profile-screen">

<div className="profile-header">

<div className="profile-avatar">

<img
src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
alt="profile"
/>

</div>

<h2>Welcome</h2>



</div>

<div className="profile-card">

<button
className="profile-item"
>


</button>

<button
className="profile-item"

onClick={()=>setScreen("admin")}

>


<div>

<h4>Admin Panel</h4>

<p>Restaurant management</p>

</div>

</button>

</div>

<BottomNav

activeScreen={screen}

onNavigate={handleNavigate}

cartCount={cartCount}

/>

</div>

)

}








  // HOME

  return (


    <HomeScreen


    dishes={dishes}


    categories={categories}


    onViewDish={viewDish}


    onAddToCart={addToCart}


    onNavigate={handleNavigate}


    activeScreen={screen}


    cartCount={cartCount}



    onAdmin={()=>{

      setScreen('admin')

    }}


    />


  )


}

