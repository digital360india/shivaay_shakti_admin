import React, { useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function AddCourse({ toggle, setToggle }) {
  const [data, setData] = useState({
    image1: "",
    image2: "",
    image3: "",
    name: "",
    description: "",
    main_url: "",
    course_type1: "Personal Training Course",
    Personal_description1: "",
    live_sessions1: 0,
    recorded_sessions1: 0,
    course_duration_days1: 0,
    beginner_friendly1: true,
    female_oriented1: true,
    age_range1: "",
    price1: 0,
    personal_url1: "",
    course_type2: "Group Training Course",
    Group_description2: "",
    live_sessions2: 0,
    recorded_sessions2: 0,
    course_duration_days2: 0,
    beginner_friendly2: true,
    female_oriented2: true,
    age_range2: "",
    price2: 0,
    group_url2: "",
    group_timing:"",
    group_starting_date:"",
    group_batch_size:0,
    group_session:"Morning",
    message: "",
    loading: false,
    add:false,
    add1:false,
    timing:"",
    personal_duration:[],
    group_duration:[],
    timing1:"",
    price3:0,
    price:0,
  });
  function handledone()
  {
    setData({
      ...data,
      personal_duration: [...data.personal_duration, { timing: data.timing, price: data.price }],
      timing:"",
      price:0,
      add:false
    });
  }
  function handledone1()
  {
    setData({
      ...data,
      group_duration: [...data.group_duration, { timing1: data.timing1, price3: data.price3 }],
      timing1:"",
      price3:0,
      add1:false
    });
  }

  const uploadImage = async (type) => {
    //console.log(data);
    //console.log(type);
    setData({ ...data, loading: true });
    const data1 = new FormData();
    if (type == "main") data1.append("file", data.image1);
    else if (type == "personal") data1.append("file", data.image2);
    else if (type == "group") data1.append("file", data.image3);
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
      //console.log(url);
      if (type === "main") {
        setData({...data, main_url: url });
      } else if (type === "personal") {
        setData({ ...data, personal_url1: url });
      } else if (type === "group") {
        setData({ ...data, group_url2:url });
      }
    } catch (error) {
      setData({ ...data, message: "error to upload" });
      setData({ ...data, loading: false });
    }
  };
  const handleImageChange = (type, event) => {
    const file = event.target.files[0];
    if (type == "main") setData({ ...data, image1: file });
    else if (type == "personal") setData({ ...data, image2: file });
    else if (type == "group") setData({ ...data, image3: file });
  };

  async function handlesubmit(e) {
    e.preventDefault();
    // console.log(data);
    if (
      data.name != "" &&
      data.description != "" &&
      data.main_url != "" &&
      data.Personal_description1 != "" &&
      data.live_sessions1 != 0 &&
      data.recorded_sessions1 != 0 &&
      data.course_duration_days1 != 0 &&
      data.age_range1 != "" &&
      data.price1 != 0 &&
      data.personal_url1 != "" &&
      data.Group_description2 != "" &&
      data.live_sessions2 != 0 &&
      data.recorded_sessions2 != 0 &&
      data.course_duration_days2 != 0 &&
      data.age_range2 != "" &&
      data.price2 != 0 &&
      data.group_url2 != "" &&
      data.main_url != "" &&
      data.personal_url1 != "" &&
      data.group_url2 != "",
      data.group_timing != "",
      data.group_batch_size != 0,
      data.group_starting_date != "",
      data.personal_duration.length>0,
      data.group_duration.length>0
    ) {
      // console.log("rh")
      // console.log(data);
      setData({ ...data, message: "" });
      try{
        delete data.image1;
      delete data.image2;
      delete data.image3;
      delete data.message;
      delete data.loading;
      delete data.price;
      delete data.price3;
      delete data.timing;
      delete data.timing1;
      delete data.add;
      delete data.add1;
      console.log(data);
      const res=await axios.post("http://localhost:5000/api/course",data,{
        headers:{
          Authorization:localStorage.getItem('jwt')
        }
      })
      if(res.data.message==="Course Added Succesfully")
      {
        setToggle(false);
      }
      }
      catch(e)
      {
        data.message="Server Error"
        setData(data);
      }
      
    } else {
      setData({ ...data, message: "* All fields are Mandatory" });
    }
  }
  
  return (
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
      <div className=" text-white">
        <button
          onClick={() => setToggle(false)}
          className=" absolute top-2 right-2 p-2   text-3xl font-semibold bg-black text-white "
        >
          X
        </button>
        <form onSubmit={handlesubmit}>
          <div className=" flex gap-10">
            <div className="flex gap-3 ">
              <label className="text-xl font-semibold" htmlFor="Cname">
                Course Name
              </label>
              <input
                type="text"
                id="Cname"
                name="name"
                className=" px-3 w-[300px] h-[25px] text-red-600 font-semibold border border-black"
                value={data.name}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
              
            </div>
            
          </div>
          <div className="flex gap-3 mt-5 ">
            
            <label className="text-xl   font-semibold" htmlFor="Cdesc">
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
              <label htmlFor="mainimg">Course Image <br/> <span className="text-red-500">( Width= 320px , Height=218px)</span> </label>
              <input
                type="file"
                name="main_url"
                
                accept="image/*"
                onChange={(event) => handleImageChange("main", event)}
                id="mainimg"
              />
              <button
                type="button"
                onClick={() => uploadImage("main")}
                className="text-white font-semibold mt-2 rounded-2xl py-2 text-xs  bg-red-600 px-5  "
              >
                Upload
              </button>
              {data.main_url!=""&&<img src={data.main_url} height={218} width={320} alt="" />}
            </div>

          <div className="flex mt-10 flex-col  gap-20 ">
            <table cellPadding={3} cellSpacing={3}>
              <p className=" text-xl flex  items-center gap-5 m-2   underline underline-offset-8 text-center">
                <span>Personal Training Course</span>
              
              </p>
              <tr >
                <td>Description</td>
                <td>
                  {" "}
                  <input
                    type="text"
                    name="Personal_description1"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.Personal_description1}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="  ">Personal Image <br/> <span className="text-red-500">( Width= 415px , Height=150px)</span> </td>
                <td className=" ">
                  {" "}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange("personal", event)}
                    name="personal_url"
                    id="mainimg"
                  />
                  <button
                    type="button"
                    className="text-white font-semibold mt-2 rounded-2xl py-2 text-xs  bg-red-600 px-5  "
                    onClick={() => uploadImage("personal")}
                  >
                    Upload
                  </button></td>
                  <td>{data.personal_url1!=""&&<img className="inline m-2 " src={data.personal_url1} height={150} width={415}  alt="" />}</td>
                
              </tr>

              <tr>
                <td>Live Session</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    name="live_sessions1"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.live_sessions1}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Recorded Session</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.recorded_sessions1}
                    name="recorded_sessions1"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Course Duration</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.course_duration_days1}
                    name="course_duration_days1"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Beginner Friendly</td>
                <td>
                  {" "}
                  <select
                    name="beginner_friendly1"
                    className=" text-red-600"
                    value={data.beginner_friendly1}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id=""
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Female Oriented</td>
                <td>
                  <select
                    className=" text-red-600"
                    name="female_oriented1"
                    value={data.female_oriented1}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id=""
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Age Range</td>
                <td>
                  {" "}
                  <input
                    type="text"
                    name="age_range1"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.age_range1}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.price1}
                    name="price1"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className=" flex gap-8">
                  <span>Duration</span>
                <button   type="button" onClick={()=>{
                  setData({...data,add:!data.add})
                }} className=" px-2 py-1 bg-blue-500">Add+</button>
                </td>
              </tr>
              {data.personal_duration.map((value,i)=>
              <>
              <tr className="    text-red-500 ">
              <td className="space-x-5 bg-white font-semibold mt-2 border-2 border-black   ">
                <span className=""></span>
               <span className="">Timing:{value.timing}</span>
               <span>Price:{value.price}</span>
               </td>
               <button type="button" onClick={()=>{
                data.personal_duration.splice(i,1);
                setData(data);
               }} className="bg-blue-500 px-2  py-1">Delete</button>
              </tr>
              </>

              )}
              
              {data.add&&
              <><tr>
                <td className=" ">
                  <span>Timing</span>
                  </td>
                  <td>
              <input type="text" className=" text-red-500" value={data.timing} name="timing" onChange={(e)=>setData({...data,timing:e.target.value})} />
                  </td>
              </tr>
              <tr>
                <td className="">
                  <span>Price</span>
                  </td>
                  <td>
              <input type="text" className=" text-red-500 " value={data.price} name="price" onChange={(e)=>setData({...data,price:parseInt(e.target.value)})} />
                  </td>
              </tr>
              <tr>
                <td></td>
                <td className="">
          <button type="button" onClick={handledone} className="bg-green-500 px-2 py-1 rounded-md ">Done</button>
                  </td>
              </tr>
              </>}
              
            </table>
            <table cellPadding={3} cellSpacing={3}>
              <p className="m-2 text-xl flex gap-3 mb-3 underline underline-offset-8 text-center">
                <span>Group Training Course</span>
          
              </p>
              <tr>
                <td>Description</td>    
                <td>
                  {" "}
                  <input
                    type="text"
                    name="Group_description2"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.Group_description2}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Group Image<br/> <span className="text-red-500">( Width= 415px , Height=150px)</span> </td>
                <td className=" ">
                  {" "}
                  <input
                    type="file"
                    onChange={(event) => handleImageChange("group", event)}
                    id="mainimg"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    className="text-white font-semibold mt-2 rounded-2xl py-2 text-xs  bg-red-600 px-5  "
                    onClick={() => uploadImage("group")}
                  >
                    Upload
                  </button>
                </td>
                 <td> {data.group_url2!=""&&<img src={data.group_url2}  height={150} width={415}   alt="" />}</td>
              </tr>

              <tr>
                <td>Live Session</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    name="live_sessions2"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.live_sessions2}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Recorded Session</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.recorded_sessions2}
                    name="recorded_sessions2"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Course Duration</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.course_duration_days2}
                    name="course_duration_days2"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Beginner Friendly</td>
                <td>
                  {" "}
                  <select
                    name="beginner_friendly2"
                    value={data.beginner_friendly2}
                    className=" text-red-600"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id=""
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Female Oriented</td>
                <td>
                  <select
                    className=" text-red-600"
                    value={data.female_oriented2}
                    name="female_oriented2"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id=""
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Age Range</td>
                <td>
                  {" "}
                  <input
                    type="text"
                    name="age_range2"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.age_range2}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.price2}
                    name="price2"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Timing</td>
                <td>
                  {" "}
                  <input
                    type="string"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.group_timing}
                    name="group_timing"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: (e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Session</td>
                <td>
                  {" "}
                  <select value={data.group_session}
                    name="group_session"  onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: (e.target.value),
                      })
                    } className=" text-red-500" >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>

                </td>
              </tr>
              <tr>
                <td>Starting Date</td>
                <td>
                  {" "}
                  <input
                    type="date"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.group_starting_date}
                    name="group_starting_date"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: (e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Batch Size</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className=" px-2 text-red-600  font-semibold border border-black"
                    value={data.group_batch_size}
                    name="group_batch_size"
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className=" flex gap-8">
                  <span>Duration</span>
                <button type="button" onClick={()=>{
                  setData({...data,add1:!data.add1})
                }} className=" px-2 py-1 bg-blue-500">Add+</button>
                </td>
              </tr>
              {data.group_duration.map((value,i)=>
              <>
              <tr className="    text-red-500 ">
              <td className="space-x-5 bg-white font-semibold mt-2 border-2 border-black   ">
               <span className="">Timing:{value.timing1}</span>
               <span>Price:{value.price3}</span>
               </td>
               <button type="button" onClick={()=>{
                data.group_duration.splice(i,1);
                setData(data);
               }} className="bg-blue-500 px-2  py-1">Delete</button>
              </tr>
              </>

              )}
              {data.add1&&
              <><tr>
                <td className=" ">
                  <span>Timing</span>
                  </td>
                  <td>
              <input type="text" className=" text-red-500" value={data.timing1} name="timing1" onChange={(e)=>setData({...data,timing1:e.target.value})} />
                  </td>
              </tr>
              <tr>
                <td className="">
                  <span>Price</span>
                  </td>
                  <td>
              <input type="text" className=" text-red-500 " value={data.price3} name="price3" onChange={(e)=>setData({...data,price3:parseInt(e.target.value)})} />
                  </td>
              </tr>
              <tr>
                <td></td>
                <td className="">
          <button type="button" onClick={handledone1} className="bg-green-500 px-2 py-1 rounded-md ">Done</button>
                  </td>
              </tr>
              </>}
              
            </table>
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
      </div>
    </Popup>
  );
}
export default AddCourse;
