import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MenuCard from "./components/MenuCard";
import AddMenu from "./components/AddMenu";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";

const App = () => {

  return (
    <Routes>
      {/* Pass the `addOrder` function to MenuCard */}
      <Route path="/" element={<MenuCard  />} />
      <Route path="/add" element={<AddMenu />} />
      {/* Pass the `orders` state to AdminPage */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin" element={<AdminPage/>} />
    </Routes>
  );
};

export default App;
