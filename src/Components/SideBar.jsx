import React from 'react'
import logovideo from '../../public/loutput.gif'
import { Link, useLocation } from 'react-router-dom'
function SideBar() {
    const location = useLocation();
  return (
    <div className=' hidden sm:flex text-white w-60 bg-red-800 rounded-e-3xl h-screen  absolute z-10  justify-center   '>
       <div className='  flex flex-col  gap-10 '>
        <div className=' w-56 mx-auto mt-2 rounded-2xl bg-white'>
        <img src={logovideo} className=' mx-auto     w-36 h-36  ' alt="" />
        </div>
        <Link to='/' className={`text-2xl font-semibold  ${location.pathname==="/"&&"bg-white text-black "} hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-3 text-center bg-black  `}>Courses</Link>
        <Link to='/Content'  className={`text-2xl font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-3 text-center bg-black ${location.pathname==="/Content"&&"bg-white text-black "} `}>Content</Link>
        <Link  to='/Survey' className={`text-2xl ${location.pathname==="/Survey"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-3 text-center bg-black  `}>Survey</Link>
       
       </div>
    </div>
  )
}

export default SideBar
