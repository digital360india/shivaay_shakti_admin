import axios from 'axios';
import React, { useEffect } from 'react'
import Popup from 'reactjs-popup'

function PersonalLinkPopup({setToggle,data,value}) {
    async function updatelink()
    {
      setToggle({...data,message:"loading"})
      console.log(data?.link)
      console.log(value?._id)
      if(data?.link!=="")
     { try {
         const res=await axios.put(`http://localhost:5000/api/purchase/personallink/${value?._id}`,{
        //  const res=await axios.put(`http://localhost:5000/api/purchase/personallink/${value?._id}`,{
          link:data?.link,
         },{ headers:{
          Authorization:localStorage.getItem('jwt')
        }})
        console.log(res);
        if(res.status===200)
        setToggle({...data,message:"",toggle:false,link:""});
      } catch (e) {
        setToggle({...data,message:"server error"})
         console.log(e);
      }}
      else{
        setToggle({...data,message:"* Add link"})
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
       height: "30vh",
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
   <div className='flex gap-6'>
   <input value={data?.link} onChange={(e)=>{setToggle({...data,link:e.target.value})}} type="text" className='border border-black flex-1'/>
   <button onClick={updatelink} className=' bg-blue-500 hover:bg-white border hover:border-blue-500 hover:text-blue-500 text-white py-1 px-2 rounded-md'>Add</button>
   </div>
   </div>
   <div className='text-center mt-5 text-red-500'>
   {data?.message}
   </div>
   </div>
   </Popup>
    </>
  )
}

export default PersonalLinkPopup
