import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SurveyPreview from '../Components/SurveyPreview';

const Survey = () => {
  const [survey,setSurvey]=useState([]);
  const [toggle,setToggle]=useState(false);
  async function handleDelete(id)
  {
    console.log(id);
    try{
     const res=await axios.delete(`http://localhost:5000/api/survey/${id}`,{
      headers:{
        Authorization:localStorage.getItem('jwt')
      }
     });
     if(res.data.success===true)
     {
      getdata();
     }
    }
    catch(e)
    {
      console.log(e);
    }
  }
  async function getdata()
  {
    try{
      const res=await axios.get("http://localhost:5000/api/survey",{
        headers:{
          Authorization:localStorage.getItem('jwt')
        }
      });
   console.log(res?.data?.dta);
   setSurvey(res?.data?.dta);
    }
    catch(e)
    {
console.log(e);
    }
  }
  useEffect(()=>{
    getdata();
  },[])
  return (
    <>
     <div className='  w-[100vw] h-screen overflow-y-auto  pl-[18vw]  pt-[14vh]  ' >
     <div className=' w-[80vw]'>
        <div className='  '>
        <h1 className='  text-3xl font-semibold underline underline-offset-8  '>Survey Data</h1>
        <table cellPadding={2} cellSpacing={2} className=' mt-8   text-left w-full   ' >
          <tr className=' text-2xl border border-black bg-black  text-white p-2  '>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Country</th>
            <th>Gender</th>
            <th>Date</th>
            <th></th>
          </tr>
       <div className='mt-4'></div>
        {survey?.map((value,i)=>
          <>
          <tr className=' hover:bg-red-600 hover:text-white   text-[20px] font-semibold  border-2 border-black bg-gray-400 '>
            <td className='   '>{++i}.</td>
          <td className=' capitalize  '>{value?.name}</td>
          <td>{value?.country}</td>
          <td>{value?.gender}</td>
          <td>{value?.date}</td>
          <td className=' space-x-5 '>
            <button onClick={()=>setToggle(true)} className=' hover:text-blue-700 underline  font-bold ' >Preview</button>
            <button onClick={()=>handleDelete(value?._id)} className=' hover:text-blue-700 underline  font-bold ' >Delete</button>
            <SurveyPreview data={value} toggle={toggle} setToggle={setToggle} />
          </td>
          </tr>  
          </>
          )}
           </table>
      </div>  
        
    </div>
    </div>
    </>
  )
}

export default Survey
