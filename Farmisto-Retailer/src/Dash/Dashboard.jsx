import React from "react";
import Maindash from "./MainDash";
import SideNav from "./sidenav";
const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen">
      <SideNav />
      <Maindash />
    </div>
  );
};

export default Dashboard;
