import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import CircularOverlay from "../../Components/Minor/CircularOverlay";
import MarketHeader from "../../Components/Header/MarketHeader";
import VegMarquee from "../../Components/Minor/VegMarquee";
import TwoCards from "./TwoCards";
import BuyBlock from "./BuyBlock";
import Footer from "../../Components/Footer/Footer";

const MarketPlace = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <CircularOverlay />
      <MarketHeader />
      <VegMarquee />
      <TwoCards />
      <BuyBlock />
      <Footer />
    </div>
  );
};

export default MarketPlace;
