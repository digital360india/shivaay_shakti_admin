import './App.css'
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import Courses from './Pages/Courses';
import Content from './Pages/Content'
import Survey from './Pages/Survey';
import Users from './Pages/Users'
import Group from './Pages/Group'
import Personal from './Pages/Personal'
import Transactions from './Pages/Transaction'
import Pending from './Pages/Pending'
function App() {
  useEffect(()=>{
   if(localStorage.getItem('user'))
   {
    setLogged(true);
   }
   else setLogged(false);
  },[])
 const [logged,setLogged]=useState(false);
  return (

    <BrowserRouter>
    {logged && (
      <>
        <Header logged={logged}  setLogged={setLogged} />
        <SideBar />
      </>
    )}
    <Routes>
      {logged ? (
        <>
          {/* <Route path="/" element={<Courses />} /> */}
          {/* <Route path="/Content" element={<Content />} /> */}
          <Route path="/Survey" element={<Survey />} />
          <Route path="/" element={<Users/>} />
          <Route path="/group" element={<Group/>} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/pending" element={<Pending />} />
        </>
      ) : (
        <Route
          path="/"
          element={<Login setLogged={setLogged} logged={logged} />}
        />
      )}
    </Routes>
  </BrowserRouter>
  
  

  )
}

export default App
