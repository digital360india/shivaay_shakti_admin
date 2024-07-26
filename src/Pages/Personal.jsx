import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GroupLinkPopup from '../Components/GroupLinkPopup';
import PersonalLinkPopup from '../Components/PersonalLinkPopup';
function Personal() {
  const [data,setData]=useState({
    data:[],
    index:null,
    // index1:null,
    toggle:false,
    message:"",
    link:""
  });
  async function getdata()
  {
    try{
  const response=await axios.get("https://shivaay-shakti-backend-vm3k.onrender.com/api/purchase/personal",{ headers:{
    Authorization:localStorage.getItem('jwt')
  }});
  console.log(response?.data?.data);
   setData({...data,data:response?.data?.data});
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
    <div className='  w-[100vw] h-screen overflow-y-auto  pl-[18vw]  pt-[14vh]  ' >
    <div className=' w-[80vw]'>
       <div className='  '>
       <h1 className='  text-3xl font-semibold underline underline-offset-8  '>Group Courses</h1>
       <table cellPadding={2} cellSpacing={2} className=' mt-8   text-left w-full   ' >
         <tr className=' text-2xl border border-black bg-black  text-white p-2  '>
           <th>Sr. No.</th>
           <th>Name</th>
           <th>Course Name</th>
           <th>Timing</th>
          <th></th>
         </tr>
      <div className='mt-4'></div>
       {data?.data?.map((value,i)=>
         <>
         <tr className=' hover:bg-red-600 hover:text-white   text-[20px] font-semibold  border-2 border-black bg-gray-400 '>
           <th className='   '>{i+1}.</th>
         <td className=' capitalize '>{value?.name}</td>
         <td className=' capitalize '>{value?.course_name}</td>
         <td className=' capitalize '>{value?.preferred_timing}</td>
        <td className=' space-x-5 '>
          <button  onClick={()=>setData({...data,toggle:true,index:i})}  className=' hover:text-blue-700 underline  font-bold ' >Add Link</button>
          {data?.index===i&&<PersonalLinkPopup data={data}   setToggle={setData}   value={value} />}
          </td>
         </tr>  
         </>
         )}
          </table>
     </div>  
       
   </div>
   </div>
  )
}

export default Personal
