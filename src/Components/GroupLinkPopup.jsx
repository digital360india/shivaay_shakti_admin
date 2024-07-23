import axios from 'axios';
import React, { useEffect } from 'react'
import Popup from 'reactjs-popup'

function GroupLinkPopup({setToggle,data,value}) {
    async function updatelink(i,timing)
    {
      setToggle({...data,message:"loading"})
      console.log(data?.link[i])
      console.log(value?.name)
      console.log(timing)
        setToggle({...data,message:"...loading"});
        if(data?.link[i]!==undefined)
      try {
         const res=await axios.put(`http://localhost:5000/api/purchase/grouplink`,{
        //  const res=await axios.put(`http://localhost:5000/api/purchase/grouplink`,{
          link:data?.link[i],
          course_name:value?.name,
          preferred_timing:timing
         },{ headers:{
          Authorization:localStorage.getItem('jwt')
        }})
        console.log(res);
        if(res.status===200)
        setToggle({...data,message:"",toggle:false,link:[]});
      } catch (e) {
        setToggle({...data,message:"server error"})
         console.log(e);
      }
      else{
        setToggle({...data,message:"* Add Link"})
      }
    } 
  return (
    <>
     <Popup
     open={data?.toggle}
     closeOnDocumentClick={false}
     closeOnEscape={false}
     contentStyle={{
       width: "40vw",
       height: "60vh",
       overflow: "hidden",
       padding: "30px",
       backdropFilter: "blur(5px)",
       backgroundColor: "white",
       position:"relative"
     }}
     position="center center"
   >
    <button onClick={()=>setToggle({...data,toggle:false})} className=' text-xl font-bold absolute top-5 right-10'>X</button>
<div className='space-x-5'>
  <button onClick={()=>setToggle({...data,toggle:false,link:[]})} className=' text-xl font-bold absolute top-5 right-10'>X</button>
    <span className=' underline text-2xl font-bold'>Timings</span>
    <div className='flex flex-col mt-5  gap-y-5'>
   {value?.group_timing?.map((v,i)=>
   <>
   <div className='flex gap-6'>
   <label className=' text-xl' htmlFor=""><span className='font-bold'>{i+1}.</span> {v?.times}</label>
   <input value={data?.link[i]} onChange={(e)=>{data.link[i]=e.target.value;setToggle({...data})}} type="text" className='border border-black flex-1'/>
   <button onClick={()=>updatelink(i,v?.times)} className=' bg-blue-500 hover:bg-white border hover:border-blue-500 hover:text-blue-500 text-white py-1 px-2 rounded-md'>Add</button>
   </div>
   </>
   )}
   </div>
   <div className='text-center mt-5 text-red-500'>
   {data?.message}
   </div>
   </div>


   </Popup>
    </>
  )
}

export default GroupLinkPopup
