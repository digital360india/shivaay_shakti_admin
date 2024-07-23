import axios from 'axios';
import React from 'react'
import Popup from 'reactjs-popup'

function RolePopup({setToggle,data,value}) {
    console.log(value)
    // console.log(data);
    async function updaterole()
    {
        setToggle({...data,message:"...loading"});
        console.log(data?.isAdmin);
        if(data?.isAdmin!==""){
      try {
         const res=await axios.put(`http://localhost:5000/api/auth/update/${value?._id}`,{
          isAdmin:data?.isAdmin
         },{ headers:{
          Authorization:localStorage.getItem('jwt')
        }})
        if(res.status===200)
        setToggle({...data,message:"",toggle:false});
      } catch (e) {
        setToggle({...data,message:"server error"})
         console.log(e);
      }}
      else{
        setToggle({...data,message:"*Select"})
      }
    }
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
    <span className=' font-bold'>Select Role</span>
   <select onChange={(e)=>setToggle({...data,isAdmin:e.target.value})} className=' border border-black ' name="" id="">
    <option value="">Select</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="trainer">Trainer</option>
   </select>

   <button onClick={()=>setToggle({...data,toggle:false})} className=' text-xl font-bold absolute top-5 right-10'>X</button>
   <div className=' flex   gap-x-5 mt-5 '>
    <button onClick={updaterole} className='bg-blue-500 text-white  px-2 py-1  rounded-md'>Submit</button>
     <p className='text-red-800'>{data?.message}</p>
   </div>
</div>

   </Popup>
    </>
  )
}

export default RolePopup
