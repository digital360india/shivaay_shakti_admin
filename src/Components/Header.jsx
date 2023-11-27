import React from 'react'
function Header({logged,setLogged}) {
  return (
    <div className=' bg-black w-screen fixed   '>
     <h1 className=' p-5   text-red-600    shadow-inner   font-serif  font-bold    text-center  sm:text-2xl md:text-3xl lg:text-5xl '>Shivaay Shakti Yog</h1>
     <button onClick={()=>{
      localStorage.removeItem("user");
setLogged(false);
     }} className=' absolute top-5 right-3 font-semibold bg-white p-2 rounded-3xl z-50 text-black '>Log Out</button>
   </div>
  )
}

export default Header
