import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Dash/Dashboard";
import AddItem from "./Dash/AddItem";
import Order from "./Dash/Order";
import Message from "./Dash/Message";
import Payments from "./Dash/Payments";
import Register from "./Pages/Register/Register";
import Settings from "./Dash/Settings";
import Discounts from "./Pages/Discounts/Discounts";

const App = () => {
  return (
    <div className="h-screen w-screen font-[Fjalla One] bg-[#f7f3e9] scrollbar-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Additem" element={<AddItem />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Discounts" element={<Discounts/>} />
      </Routes>
    </div>
  );
};

export default App;
