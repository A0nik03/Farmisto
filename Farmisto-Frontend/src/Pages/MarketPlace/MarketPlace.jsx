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
    <div className="w-full">
      <NavBar />
      <CircularOverlay />
      <MarketHeader />
     <div className="w-full overflow-hidden">
       <VegMarquee />
     </div>
      <TwoCards />
      <BuyBlock />
      <Footer />
    </div>
  );
};

export default MarketPlace;
