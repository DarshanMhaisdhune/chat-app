import React, { useEffect, useState } from 'react'
import { BsMoonFill } from "react-icons/bs";
import { GrSun } from "react-icons/gr";


const DarkMode: React.FC = () => {

  const[theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  const darkTheme = document.documentElement ;

  useEffect(()=>{
    if(theme === 'dark'){
      darkTheme.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    else{
      darkTheme.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  },[theme])

  return (
    <div className='fixed top-4 right-4 z-50'>
     { theme ==='dark'?
      (<div onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}>
        <BsMoonFill className='w-10 h-10 bg-white p-2 rounded-full' />
        </div>) :
      (<div onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}>
        <GrSun className='w-10 h-10 bg-white p-2 rounded-full' />
        </div>)  
     }  
        
    </div>
  )
}

export default DarkMode;