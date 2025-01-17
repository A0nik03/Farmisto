// import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
// import assets from './assets/assets'
import Dashboard from "./Dash/Dashboard";
import AddItem from "./Dash/AddItem";
import Order from "./Dash/Order";
import Message from "./Dash/Message";
import Payments from "./Dash/Payments";
import Register from "./Pages/Register/Register";
import Settings from "./Dash/Settings";

const App = () => {
  return (
    <div className="h-screen w-screen font-[Fjalla One] bg-[#f7f3e9]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Additem" element={<AddItem />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
