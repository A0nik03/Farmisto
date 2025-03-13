import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Dash/Dashboard";
import AddItem from "./Dash/AddItem";
import Order from "./Dash/Order";
import Message from "./Dash/Message";
import Payments from "./Dash/Payments";
import Register from "./Pages/Register/Register";
import Discounts from "./Pages/Discounts/Discounts";
import Settings from "./Pages/Settings/Settings";
import Learn from "./Pages/Learn/Learn";
import ProfileSettings from "./Pages/Settings/Sections/ProfileSettings";
import PaymentSettings from "./Pages/Settings/Sections/PaymentSettings";
import HelpAndSupport from "./Pages/Settings/Sections/HelpAndSupport";
import LegalAndCompliance from "./Pages/Settings/Sections/LegalAndCompliance";
import Market from "./Pages/Market/Market";

const App = () => {
  return (
    <div className="h-screen font-[Fjalla One] bg-[#f7f3e9] scrollbar-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Additem" element={<AddItem />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/market" element={<Market />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/Settings" element={<Settings />}>
          <Route path="ProfileSettings" element={<ProfileSettings />} />
          <Route path="PaymentSettings" element={<PaymentSettings />} />
          <Route path="HelpAndSupport" element={<HelpAndSupport />} />
          <Route path="LegalAndCompliance" element={<LegalAndCompliance />} />
        </Route>

        <Route path="/Discounts" element={<Discounts />} />
      </Routes>
    </div>
  );
};

export default App;
