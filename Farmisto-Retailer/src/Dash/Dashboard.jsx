import React from "react";
import Maindash from "./Maindash";
import SideNav from "./sidenav";
const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-300">
      <SideNav />
      <Maindash />
    </div>
  );
};

export default Dashboard;
