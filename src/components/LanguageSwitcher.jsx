import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./LanguageSwitcher.css";


export default function LanguageSwitcher(){

  const {
    language,
    changeLanguage
  } = useLanguage();


  const [open,setOpen] = useState(false);



  const languages = [

    {
      code:"en",
      label:"English",
      flag:"🇬🇧"
    },

    {
      code:"am",
      label:"አማርኛ",
      flag:"🇪🇹"
    },

    {
      code:"om",
      label:"Afaan Oromo",
      flag:"🌿"
    }

  ];



  const current =
  languages.find(
    lang => lang.code === language
  ) || languages[0];



  return (

    <div className="language-switcher">


      <button

        className="language-switcher__button"

        onClick={()=>{
          setOpen(!open)
        }}

      >

        {current.flag}

        <span>
          {current.label}
        </span>


        <span className="arrow">
          ▼
        </span>


      </button>




      {
        open && (

          <div className="language-switcher__menu">


            {
              languages.map((lang)=>(

                <button

                  key={lang.code}

                  className={
                    language === lang.code
                    ?
                    "active"
                    :
                    ""
                  }


                  onClick={()=>{


                    changeLanguage(
                      lang.code
                    );


                    setOpen(false);


                  }}

                >

                  <span>
                    {lang.flag}
                  </span>


                  <span>
                    {lang.label}
                  </span>


                </button>


              ))

            }


          </div>

        )
      }


    </div>

  )

}