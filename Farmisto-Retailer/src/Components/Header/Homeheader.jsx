import React from "react";

const Homeheader = () => {
  const backgroundImageStyle = {
    backgroundImage:
      "url('https://cdn.pixabay.com/photo/2017/10/29/15/58/trees-2900064_960_720.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="w-full h-screen p-5 bg-zinc-100">
      <div
        style={backgroundImageStyle}
        className="w-full h-full flex flex-col items-center justify-center text-center text-white bg-gray-800 bg-opacity-50 rounded-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          Relax in harmony
          <br />
          with nature
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium ">
          Unique ecotourism experience, allowing guests to immerse themselves in
          real farm life
        </p>
        <div className="h-12 mt-5 w-[28%] z-50 border border-white rounded-full flex items-center gap-2 px-2">
              <span className="z-50 h-2 w-2 bg-white rounded-full" />
              <p className="z-50 text-xl text-white font-normal">
                Fuel your health with fresh, nutritious veggies.
              </p>
            </div>
        <div className="flex gap-4 mt-8">
          <div className="px-6  py-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-gray-700 transition duration-300">
           FARM
          </div>
          <div className="px-6 py-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-gray-700 transition duration-300">
           TO
          </div>
          <div className="px-6  py-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-gray-700 transition duration-300">
            HOME
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeheader;
