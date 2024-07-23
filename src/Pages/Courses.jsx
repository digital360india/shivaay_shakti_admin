import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

import AddCourse from '../Components/AddCourse';
import Card1 from '../Components/Card1';
function Courses() {
  const [toggle,setToggle]=useState(false);
  const [data,setData]=useState([]);
  async function adddata()
  {
    try{
     const res=await axios.get('http://localhost:5000/api/course');
     //console.log(res.data.data);
     setData(res.data.data);
    }
    catch(e)
    {
//console.log(e);
    }
  }
  useEffect(()=>{
    adddata();
  },[toggle])
  return (
    <>
    <div className='  w-[100vw] h-screen overflow-y-auto  pl-72  pt-28  ' >
      <div className=' w-[80vw]    '>
        <div className=' flex justify-between '>
        <h1 className='  text-3xl font-bold underline underline-offset-8  '>All COURSES</h1>
        <button onClick={()=>setToggle(true)} className=' p-3 bg-black hover:scale-105 hover:bg-yellow-600  hover:text-red-600  font-semibold text-white'>Add Course +</button>
        </div>
        <section className=' hidden sm:flex box     gap-7 sm:gap-10 mt-4  scrollbar-hide   overflow-scroll '>
        {data.map((value,index)=>
        <>
            <Card1 key={index} value={value} toggle={toggle} setToggle={setToggle}  />
            </>
        )}
         </section>
      </div>  
        <AddCourse toggle={toggle} setToggle={setToggle} />
    </div>
      </>
  )
}

export default Courses
