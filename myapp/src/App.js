
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from './Roster';
import Homepage from './Home/Homepage';
import Empview from './empView';
import Report from './Report';
import Header from './Home/Sidebar'
import EmpMonthlyview from "./EmpMonthlyview/empMonthlyview";
import Auth from './Ad'

function App() {

  const [user, User] = useState(JSON.parse(localStorage.getItem("name")) || undefined)
  const [isuserlength, SetUserLength] = useState(0);

  useEffect(() => {


    fetch('http://10.155.3.231:3003/',
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include'
      }
    ).then(resp => resp.json())
      .then(resp => {
        User(resp); console.log("UserName = " + resp);
        localStorage.setItem("name", JSON.stringify(resp)); SetUserLength(resp.Length)
      })
      .then(error => console.log("found error"))


  }, []);

  return (

    <div>
      {/* <Auth/> */}
      {<div>{console.log("user length = "+ JSON.stringify(user))}</div>}

      {
        JSON.stringify(user) === undefined ? <div className="conatiner">
          <div className="loader-container">
            <div className="spinner"></div>
            <div className="fw-bold  text-center shadow-lg">
              <span style={{ fontSize: 22, color: '#003366' }}>Welcome To Claim Management</span>
            </div>
            <div className="fw-bold text-center" style={{ marginTop: 310, fontSize: 22, color: '#003366' }}>
              <h2><span className="fw-bold" style={{ fontSize: 20, color: '#003366' }}>Please Wait</span></h2>
              <span>Page is Loading...</span>
            </div>


          </div>

        </div> : <div>

          <Header />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/roster" element={<Home />}></Route>
            <Route path="/empview" element={<Empview />}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="/empMonthlyview" element={<EmpMonthlyview />}></Route>
          </Routes>
        </div>
      }
    </div>

    // <Home />
  );
}

export default App;
