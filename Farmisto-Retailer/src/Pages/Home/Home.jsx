import React from "react";
import NavBar from "../../Components/Major/Navbar";
import Footer from "../../Components/Footer/Footer";
import Homeheader from "../../Components/Header/Homeheader";
import Panel from "../../Components/Panel/Panel";
import Work from "../../Components/Work/Work";
const Home = () => {
  return (
    <div className="relative h-screen">
      <NavBar />
      <Homeheader />
      <Panel />
      {/* <div className="bg-[#d6e3bf]">
        <Work />
      </div> */}
      <Footer />
    </div>
  );
};

export default Home;
