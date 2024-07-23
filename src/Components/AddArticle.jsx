import axios from 'axios';
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
function AddArticle({toggle,setToggle}) {
    const [data,setData]=useState({
        heading:"",
        articleimg:"",
        description:"",
        loading:false,
        image1:"",
        message:""
    })
    function handleImageChange(event)
    {
        const file = event.target.files[0];
        setData({ ...data, image1: file });
    }
   async function uploadImage()
    {
        setData({ ...data, loading: true });
        const data1 = new FormData();
       data1.append("file", data.image1);
       data1.append("upload_preset", "ixbhf3qy");
    data1.append("cloud_name", "dmmiirdfo");
    data1.append("folder", "Cloudinary-React");
    try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dmmiirdfo/image/upload`,
          {
            method: "POST",
            body: data1,
          }
        );
        const { url } = await response.json();
        setData({...data, articleimg: url });}
        catch (error) {
            setData({ ...data, message: "error to upload" });
            setData({ ...data, loading: false }); 
        }}
        async function handlesubmit(e)
        {
          
            e.preventDefault();
            console.log(data);
          if(data.articleimg!=="")
            {
              setData({...data,message:""})
              try{
              delete data.loading;
              delete data.message;
              delete data.image1;
         const response=await axios.post('http://localhost:5000/api/article',data,{
            headers:{
                Authorization:localStorage.getItem('jwt')
            }
         })
         if(response.data?.success===true)
         {
          console.log(response);
          setToggle(false);
         }
         
            }
            catch(e)
            {
              setData({...data,message:"Server Error"})
            console.log(e);
            }
        }
      else{
        setData({...data,message:"Image field is mandatory"})
      }
      }

  return (
    <>
    <Popup
        open={toggle}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{
          width: "90vw",
          height: "90vh",
          overflow: "hidden",
          padding: "30px",
          backdropFilter: "blur(5px)",
          overflow: "scroll",
          backgroundColor: "black",
        }}
        position="center center"
        >
 <button
          onClick={() => setToggle(false)}
          className=" absolute top-2 right-2 p-2   text-3xl font-semibold bg-black text-white "
        >
          X
        </button>
        <form className=' p-8' onSubmit={handlesubmit} >
        <div className=" flex flex-col gap-5">
            <div className="flex gap-3 ">
              <label className="text-xl text-white font-semibold" htmlFor="name">
                 Heading
              </label>
              <input
                type="text"
                id="name"
                name="heading"
                className=" px-3 w-[300px] h-[25px] text-red-600 font-semibold border border-black"
                value={data.heading}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
              
            </div>
            <div className="flex gap-3 mt-5 ">
            
            <label className="text-xl  text-white  font-semibold" htmlFor="Cdesc">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="px-3 text-red-600  font-semibold"
              id="Cdesc"
              cols="70"
              rows="2"
            ></textarea>
          </div>
          <div className=" flex gap-3 mt-10  items-center">
              <label className=' text-xl text-white' htmlFor="mainimg">Article Image <br/> <span className="text-red-500">( Width= 922px , Height=400px)</span> </label>
              <input
                type="file"
                name="articleimg"
                
                accept="image/*"
                onChange={handleImageChange}
                id="articleimg"
              />
              <button
                type="button"
                onClick={() => uploadImage()}
                className="text-white font-semibold mt-2 rounded-2xl py-2 text-xs  bg-red-600 px-5  "
              >
                Upload
              </button>
            </div>
              {data.articleimg!=""&&<img src={data.articleimg} height={400} width={922} alt="" />}
          </div>
          <button
            type="submit"
            className="text-white font-semibold mt-5 rounded-2xl py-2  bg-blue-600 px-5"
          >
            Submit
          </button>
          <p className=" text-red-600 text-sm text-center ">{data.message}</p>
          {data.loading && <p>Loading...</p>}
                    </form>

        </Popup>
    </>
  )
}

export default AddArticle
