import React from 'react'
import logovideo from '../../public/loutput.gif'
import { Link, useLocation } from 'react-router-dom'
function SideBar() {
    const location = useLocation();
  return (
    <div className=' hidden sm:flex text-white w-60 bg-red-800 rounded-e-3xl h-screen  absolute z-10  justify-center   '>
       <div className='  flex flex-col  gap-4 '>
        <div className=' w-56 mx-auto mt-2 rounded-2xl bg-gray-200'>
        <img src={logovideo} className=' mx-auto     w-36 h-36  ' alt="" />
        </div>
        {/* <Link to='/' className={`text-2xl font-semibold  ${location.pathname==="/"&&"bg-white text-black "} hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-3 text-center bg-black  `}>Courses</Link> */}
        {/* <Link to='/Content'  className={`text-2xl font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-3 text-center bg-black ${location.pathname==="/Content"&&"bg-white text-black "} `}>Content</Link> */}
         <Link  to='/' className={`text-2xl ${location.pathname==="/"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl mt-12  w-60 p-2 text-center  border-b  `}>Users</Link>
         <Link  to='/group' className={`text-2xl ${location.pathname==="/group"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-2 text-center border-b  `}>Group </Link>
         <Link  to='/personal' className={`text-2xl ${location.pathname==="/personal"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-2 text-center border-b `}>Personal </Link>
         <Link  to='/transactions' className={`text-2xl ${location.pathname==="/transactions"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-3 text-center border-b  `}>Transactions</Link>
         <Link  to='/pending' className={`text-2xl ${location.pathname==="/pending"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-2 text-center border-b  `}>Pending</Link>
        <Link  to='/Survey' className={`text-2xl ${location.pathname==="/Survey"&&"bg-white text-black "}   font-semibold  hover:bg-yellow-400 hover:text-red-700 rounded-e-3xl  w-60 p-2 text-center border-b  `}>Survey</Link>
       
       </div>
    </div>
  )
}

export default SideBar
