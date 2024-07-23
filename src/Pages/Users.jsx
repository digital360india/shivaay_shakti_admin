import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RolePopup from '../Components/RolePopup';

export default function Users() {
  const [data,setData]=useState({
    data:[],
    toggle:false,
    message:"",
    isAdmin:"",
  });
  async function getdata()
  {
    try{
      const res=await axios.get("http://localhost:5000/api/auth",{
      // const res=await axios.get("http://localhost:5000/api/auth",{
        headers:{
          Authorization:localStorage.getItem('jwt')
        }
      });
   console.log(res?.data?.data);
   setData({...data,data:res?.data?.data});
    }
    catch(e)
    {
console.log(e);
    }
  }
 
  useEffect(()=>{
    getdata();
  },[data?.toggle])
  return (
    <>
      <div className='  w-[100vw] h-screen overflow-y-auto  pl-[18vw]  pt-[14vh]  ' >
     <div className=' w-[80vw]'>
        <div className='  '>
        <h1 className='  text-3xl font-semibold underline underline-offset-8  '>User</h1>
        <table cellPadding={2} cellSpacing={2} className=' mt-8   text-left w-full   ' >
          <tr className=' text-2xl border border-black bg-black  text-white p-2  '>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
       <div className='mt-4'></div>
        {data?.data?.map((value,i)=>
          <>
          <tr className=' hover:bg-red-600 hover:text-white   text-[20px] font-semibold  border-2 border-black bg-gray-400 '>
            <th className='   '>{i+1}.</th>
          <td className=' capitalize  '>{value?.name}</td>
          <td>{value?.email}</td>
          <td>{value?.isAdmin}</td>
          <td className=' space-x-5 '>
          <button onClick={()=>setData({...data,toggle:true,index:i})}  className=' hover:text-blue-700 underline  font-bold ' >Modify</button>
          {data?.index===i&&<RolePopup value={value} data={data}  setToggle={setData} />}
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
