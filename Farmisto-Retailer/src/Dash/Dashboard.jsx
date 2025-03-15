import React from "react";
import Maindash from "./Maindash";
import SideNav from "./SideNav";
const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen scrollbar-none">
    {/* hidden sm:block */}
      <div className="">
      </div>
        <SideNav />
      <Maindash />
    </div>
  );
};

export default Dashboard;
