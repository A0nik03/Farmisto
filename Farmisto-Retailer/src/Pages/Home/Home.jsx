import React from "react";
import NavBar from "../../Components/Major/NavBar";
import Footer from "../../Components/Footer/Footer";
import Homeheader from "../../Components/Header/Homeheader";
import Panel from "../../Components/Panel/Panel";

const Home = () => {
  return (
    <div className="relative h-screen">
      <NavBar />
      <Homeheader />
      <Panel />
      <Footer />
    </div>
  );
};

export default Home;
