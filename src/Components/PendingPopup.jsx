import axios from 'axios';
import React from 'react'
import Popup from 'reactjs-popup'

function PendingPopup({setToggle,data,value}) {
    console.log(value?._id)
    async function updatetransaction()
    {
        setToggle({...data,message:"...loading"});
      try {
         const res=await axios.put(`https://shivaay-shakti-backend-1.onrender.com/api/purchase/pending/${value?._id}`,{
          transaction_status:"completed"
         },{ headers:{
          Authorization:localStorage.getItem('jwt')
        }})
        console.log(res);
        if(res.status===200)
        setToggle({...data,message:"",toggle:false});
      } catch (e) {
        setToggle({...data,message:"server error"})
         console.log(e);
      }} 
  return (
    <>
     <Popup
     open={data?.toggle}
     closeOnDocumentClick={false}
     closeOnEscape={false}
     contentStyle={{
       width: "20vw",
       height: "20vh",
       overflow: "hidden",
       padding: "30px",
       backdropFilter: "blur(5px)",
       backgroundColor: "white",
       position:"relative"
     }}
     position="center center"
   >
<div className='space-x-5'>
    <span className=' font-bold'>Are You Sure?</span>
  

   <button onClick={()=>setToggle({...data,toggle:false})} className=' text-xl font-bold absolute top-5 right-10'>X</button>
   <div className=' flex   gap-x-5 mt-5 '>
    <button onClick={updatetransaction} className='bg-blue-500 text-white  px-2 py-1  rounded-md'>Yes</button>
    <button onClick={()=>setToggle({...data,toggle:false})} className='bg-blue-500 text-white  px-2 py-1  rounded-md'>No</button>
     <p className='text-red-800'>{data?.message}</p>
   </div>
</div>

   </Popup>
    </>
  )
}

export default PendingPopup
