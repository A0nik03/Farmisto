import React from "react";
import { FaAirbnb } from "react-icons/fa";
import { PiFramerLogoFill } from "react-icons/pi";
import { FaMountainSun } from "react-icons/fa6";
import { SiTreehouse, SiWprocket } from "react-icons/si";

const Trusted = () => {
  const partners = {
    Airbnb: FaAirbnb,
    Framer: PiFramerLogoFill,
    Himalayas: FaMountainSun,
    Treehouse: SiTreehouse,
    Pendo: SiWprocket,
  };

  return (
    <div className="h-[40vh] w-full pb-8 p-5 flex flex-col justify-center items-center font-[satoshi]">
      {/* Heading */}
      <h1 className="text-3xl lg:text-5xl font-semibold text-[#242424] text-center">
        Trusted by Over 20,000 Partners
      </h1>

      {/* Partner Logos */}
      <div className="flex flex-wrap justify-center gap-10 lg:gap-14 mt-8 mb-10">
        {Object.keys(partners).map((partner, index) => {
          const Icon = partners[partner];
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <Icon size={40} className="text-emerald-900 mb-2" />
              <p className="text-lg lg:text-3xl text-emerald-700 font-medium">
                {partner}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trusted;
