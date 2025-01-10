import React from "react";
import Maindash from "./MainDash";
import SideNav from "./sidenav";
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <Maindash />
    </div>
  );
};

export default Dashboard;
