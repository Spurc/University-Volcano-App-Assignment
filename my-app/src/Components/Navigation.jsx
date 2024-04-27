import React, { useState } from "react";
import { Link } from "react-router-dom";

function getTokenLogin(){
  let token = localStorage.getItem("token");

  if(token){
    return(
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/VolcanoList">Volcano List</Link>
        </li>
        <li>
          <Link to="/Login">Log Out</Link>
        </li>
      </ul>
    </nav>
    )

  }
  else {
    //console.log("Not Logged In");
    return(
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/VolcanoList">Volcano List</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li> 
        <li>
          <Link to="/Register">Register</Link>
        </li>
      </ul>
    </nav>
    )
  }

}


export default function Nav() {
  

  return (     
    <div>{getTokenLogin()}</div>
  );
}