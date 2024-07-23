import React, { useState } from "react";
import logovideo from "../../public/loutput.gif";
import axios from "axios";
import { isPassword } from "../utils";
function Login({ logged, setLogged }) {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  async function handlesubmit(e) {
    setMessage("Loading");
    e.preventDefault();
    if (isPassword(data.password.trim())) {
      try {
        // const res=await axios.post("https://shivaay-shakti-backend-1.onrender.com/api/auth/adminlogin",data);
        const res = await axios.post(
          "http://localhost:5000/api/auth/adminlogin",
          data
        );
        console.log(res);
        if (res.status === 200) {
          //console.log(res.data.user);
          setMessage("Login Successful");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("jwt", JSON.stringify(res.data.token));

          setLogged(true);
        }
      } catch (e) {
        console.log(e);
        setMessage(e.response.data.message);
      }
    } else {
      setMessage("Invalid Credentials");
    }
  }
  return (
    <div className=" w-screen h-screen bg-black grid place-content-center ">
      <div className=" flex w-[80vw]  justify-center items-center  ">
        <div className="  hidden lg:block w-1/2 ">
          <img src={logovideo} alt="" />
        </div>
        <div className=" w-[90vw] sm:w-[80vw] md:w-[70vw] h-[500px]  text-white mx-auto  lg:w-1/2 rounded-2xl  sm:p-8 md:p-12 lg:p-16 ">
          <h1 className="text-5xl ">Admin Login</h1>
          <form className=" flex flex-col mt-10 gap-5 " onSubmit={handlesubmit}>
            <div className=" flex flex-col gap-2 ">
              <label className=" text-2xl  " htmlFor="">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                className=" font-semibold  px-3   text-red-900  rounded-lg py-1 "
              />
            </div>
            <div className=" flex flex-col gap-2 ">
              <label className=" text-2xl " htmlFor="">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                className=" text-red-900 rounded-lg px-3 py-1  "
              />
            </div>
            <div className=" flex  items-center gap-5   mt-6  ">
              <button
                type="submit"
                className=" text-2xl px-3 py-1  border-2 border-white "
              >
                Submit
              </button>
              <p className=" text-[18px] font-bold text-red-900">{message}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
