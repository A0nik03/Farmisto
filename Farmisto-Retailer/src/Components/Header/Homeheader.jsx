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
    <div className="h-screen mx-2 bg-[#f7f3e9] overflow-hidden">
      <div
        style={backgroundImageStyle}
        className="w-full h-full flex flex-col items-center justify-center text-center text-white bg-[#00000080] rounded-2xl"
      >
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#ffffffd9] drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)] px-2">
          Relax in harmony
          <br />
          with nature
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-[#ffffffc0] drop-shadow-[1px_2px_4px_rgba(0,0,0,0.5)] px-2">
          Unique ecotourism experience, allowing guests to immerse themselves in
          real farm life
        </p>

        <div className="h-auto mt-5 w-auto max-w-[90%] sm:max-w-[70%] z-10 border border-[#ffffff80] rounded-full flex items-center gap-2 bg-[#ffffff20] backdrop-blur-lg shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
          <p className="z-10 text-sm sm:text-lg md:text-xl py-2 px-1 text-white font-normal text-nowrap drop-shadow-[1px_2px_4px_rgba(0,0,0,0.5)]">
            Fuel your health with fresh, nutritious veggies.
          </p>
        </div>


        <div className="flex flex-wrap gap-2 sm:gap-4 mt-6">
          <div className="px-4 py-2 sm:px-6 sm:py-2 bg-[#7a9f35] text-[#f7f3e9] font-semibold rounded-full hover:bg-[#6b8e2b] transition duration-300 shadow-lg cursor-pointer text-sm sm:text-base">
            FARM
          </div>
          <div className="px-4 py-2 sm:px-6 sm:py-2 bg-[#6b4226] text-[#f7f3e9] font-semibold rounded-full hover:bg-[#5a341e] transition duration-300 shadow-lg cursor-pointer text-sm sm:text-base">
            TO
          </div>
          <div className="px-4 py-2 sm:px-6 sm:py-2 bg-[#7a9f35] text-[#f7f3e9] font-semibold rounded-full hover:bg-[#6b8e2b] transition duration-300 shadow-lg cursor-pointer text-sm sm:text-base">
            HOME
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeheader;
