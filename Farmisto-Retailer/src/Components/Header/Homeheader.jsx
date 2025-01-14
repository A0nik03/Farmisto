import React from "react";

const Homeheader = () => {
  const backgroundImageStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="w-full h-screen px-5 bg-[#f7f3e9]">
      <div
        style={backgroundImageStyle}
        className="w-full h-full flex flex-col items-center justify-center text-center text-white bg-[#00000080] rounded-2xl"
      >
        {/* Heading with shadow */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#ffffffd9] drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)]">
          Relax in harmony
          <br />
          with nature
        </h1>

        {/* Subtitle with shadow */}
        <p className="mt-4 text-lg md:text-xl font-medium text-[#ffffffc0] drop-shadow-[1px_2px_4px_rgba(0,0,0,0.5)]">
          Unique ecotourism experience, allowing guests to immerse themselves in
          real farm life
        </p>

        {/* Glassy "Fuel your health" div */}
        <div className="h-12 mt-5 w-auto z-50 border border-[#ffffff80] rounded-full flex items-center gap-2 px-4 bg-[#ffffff20] backdrop-blur-lg shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
          <span className="z-50 h-3 w-3 bg-[#7a9f35] shadow-lg shadow-[#5e7b28] rounded-full" />
          <p className="z-50 text-xl text-white font-normal text-nowrap drop-shadow-[1px_2px_4px_rgba(0,0,0,0.5)]">
            Fuel your health with fresh, nutritious veggies.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <div className="px-6 py-2 bg-[#7a9f35] text-[#f7f3e9] font-semibold rounded-full hover:bg-[#6b8e2b] transition duration-300 shadow-lg cursor-pointer">
            FARM
          </div>
          <div className="px-6 py-2 bg-[#6b4226] text-[#f7f3e9] font-semibold rounded-full hover:bg-[#5a341e] transition duration-300 shadow-lg cursor-pointer">
            TO
          </div>
          <div className="px-6 py-2 bg-[#7a9f35] text-[#f7f3e9] font-semibold rounded-full hover:bg-[#6b8e2b] transition duration-300 shadow-lg cursor-pointer">
            HOME
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeheader;
