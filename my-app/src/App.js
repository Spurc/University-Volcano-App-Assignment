import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./MenuItems/Home";
import Login from "./MenuItems/Login";
import Register from "./MenuItems/Register";
import VolcanoList from "./MenuItems/VolcanoList";
import Volcano from "./MenuItems/Volcano";



export default function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/VolcanoList" element={<VolcanoList />} />
          <Route path="/Volcano" element={<Volcano />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
