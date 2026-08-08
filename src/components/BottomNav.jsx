import React from 'react'
import './BottomNav.css'

import { useLanguage } from '../i18n/LanguageContext.jsx'


export default function BottomNav({
  activeScreen,
  onNavigate,
  cartCount
}) {


  const { t } = useLanguage()



  const tabs = [

    {
      id:'home',
      label:t('home'),
      icon:HomeIcon
    },


    {
      id:'menu',
      label:t('menu'),
      icon:MenuIcon
    },


    {
      id:'favorites',
      label:t('saved'),
      icon:HeartIcon
    },


    {
      id:'cart',
      label:t('cart'),
      icon:CartIcon,
      badge:cartCount
    },


    {
      id:'profile',
      label:t('profile'),
      icon:ProfileIcon
    }

  ]



  return (

    <nav className="bottom-nav">

      <div className="bottom-nav__inner">


      {
        tabs.map((tab)=>{


          const Icon = tab.icon


          const active =
          activeScreen === tab.id



          return (

          <button

          key={tab.id}

          className={
          `bottom-nav__tab ${
          active
          ?
          'bottom-nav__tab--active'
          :
          ''
          }`
          }


          onClick={()=>
          onNavigate(tab.id)
          }


          >


            <span className="bottom-nav__icon-wrap">


              <Icon />


              {
                tab.badge > 0 &&
                (

                <span className="bottom-nav__badge">

                  {tab.badge}

                </span>

                )

              }


            </span>



            <span className="bottom-nav__label">

              {tab.label}

            </span>



          </button>


          )


        })

      }



      </div>


    </nav>

  )

}





function HomeIcon(){

return(

<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">

<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>

</svg>

)

}





function MenuIcon(){

return(

<svg width="22" height="22" viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2">


<rect x="3" y="3" width="7" height="7"/>

<rect x="14" y="3" width="7" height="7"/>

<rect x="3" y="14" width="7" height="7"/>

<rect x="14" y="14" width="7" height="7"/>


</svg>

)

}





function HeartIcon(){

return(

<svg width="22" height="22"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2">


<path d="
M20.84 4.61
a5.5 5.5 0 0 0-7.78 0
L12 5.67
l-1.06-1.06
a5.5 5.5 0 0 0-7.78 7.78
L12 21.23
l7.78-7.78
a5.5 5.5 0 0 0 1.06-8.84z"
/>


</svg>

)

}





function CartIcon(){

return(

<svg width="22" height="22"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2">


<circle cx="9" cy="21" r="1"/>

<circle cx="20" cy="21" r="1"/>

<path d="
M1 1h4l2.68 13.39
a2 2 0 0 0 2 1.61
h9.72
a2 2 0 0 0 2-1.61
L23 6H6
"/>


</svg>

)

}





function ProfileIcon(){

return(

<svg width="22" height="22"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2">


<path d="
M20 21
v-2
a4 4 0 0 0-4-4
H8
a4 4 0 0 0-4 4
v2
"/>


<circle cx="12" cy="7" r="4"/>


</svg>

)

}