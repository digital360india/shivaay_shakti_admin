import React from 'react'
import {  useNavigate } from 'react-router-dom';
function Header({logged,setLogged}) {
  const navigate=useNavigate();
  return (
    <div className=' bg-gray-100 border  border-gray-400 w-screen fixed   '>
     <h1 className=' p-5   text-red-600    shadow-inner   font-serif  font-bold    text-center  sm:text-2xl md:text-3xl lg:text-5xl '>Shivaay Shakti Yog</h1>
     <button onClick={()=>{
      localStorage.removeItem("user");
setLogged(false)
navigate('/');
     }} className=' absolute top-6 right-5 font-semibold  border border-gray-600 hover:border-none bg-white p-2 hover:bg-red-500 hover:text-white rounded-md z-50 text-black '>Log Out</button>
   </div>
  )
}

export default Header 
