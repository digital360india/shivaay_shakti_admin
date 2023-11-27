import React, { useEffect, useState } from 'react'
import AddArticle from '../Components/AddArticle';
import axios from 'axios';
import ArticlePreview from '../Components/ArticlePreview';
import EditArticle from '../Components/EditArticle';

function Content() {
  const [index,setIndex]=useState(null)
  const [toggle,setToggle]=useState(false);
  const [toggle1,setToggle1]=useState(false);
  const [toggle2,setToggle2]=useState(false);
  const [data,setData]=useState([]);
  async function getdata()
  {
  try{
 const response=await axios.get('https://shivaay-shakti-backend-1.onrender.com/api/article');
 console.log(response);
 if(response.data.success===true)
 {
setData(response?.data?.dta)
   console.log(response?.data?.dta);
 }
  }
  catch(e)
  {
 console.log(e);
  }
  }
  useEffect(()=>{
    getdata();
  },[toggle])
  async function handleDelete(id)
  {
    try{
  const response=await axios.delete(`https://shivaay-shakti-backend-1.onrender.com/api/article/${id}`)
  if(response.data.success=true)
  getdata();
    }
    catch(e)
    {
  console.log(e);
    }
  }
  return (
    <>
      <div className='  w-[100vw] h-screen overflow-y-auto  pl-72  pt-28  ' >
     <div className=' w-[80vw]  '>
        <div className=' flex  justify-between '>
        <h1 className='  text-3xl font-bold underline underline-offset-8  '>News And Article</h1>
        <button onClick={()=>setToggle(true)} className=' p-3 bg-black hover:scale-105 hover:bg-yellow-600  hover:text-red-600  font-semibold text-white'>Add Article +</button>
        <AddArticle toggle={toggle} setToggle={setToggle} />
      </div>  
        <table cellPadding={2} cellSpacing={2} className=' w-full text-left  mt-5  '>
          <tr className='  bg-black text-white  '>
            <th>S.No.</th>
            <th>Heading</th>
            <th>Description</th>
            <th>Date</th>
            <th></th>
          </tr>
         {
          data.map((value,i)=>
          <tr className=' mt-2 bg-gray-200 border  border-black hover:bg-yellow-400 hover:text-white '>
            <td>{++i}.</td>
            <td>{value?.heading}</td>
            <td>{value?.description.slice(0,30)}...</td>
            <td>{value?.date}</td>
            <td className=' flex gap-2'>
              <button onClick={()=>{setToggle2(true); setIndex(i)}} className='  hover:text-black  bg-green-500 text-white p-1 '>Edit</button>
              <button onClick={()=>{setToggle1(true); setIndex(i)}} className=' hover:text-black bg-blue-500 text-white p-1 '>Preview</button>
              <button onClick={()=>handleDelete(value?._id)} className=' hover:text-black bg-red-500 text-white p-1 '>Delete</button>
              {(toggle1 &&index==i)&&<ArticlePreview key={i} toggle1={toggle1} setToggle1={setToggle1} value={value} />}
              {(toggle2 &&index==i)&&<EditArticle key={i} toggle2={toggle2} setToggle2={setToggle2} value={value} setToggle={setToggle}  />}
            </td>
          </tr>
          )
         }
         </table>
        
    </div>
    </div>
    </>
  )
}

export default Content
