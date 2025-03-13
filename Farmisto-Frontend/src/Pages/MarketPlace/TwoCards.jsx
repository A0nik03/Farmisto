import React from "react";

const TwoCards = () => {
  return (
    <div className="w-full min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[52vh] flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8">

      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1633954643938-cf09ec60c436?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-64 sm:h-72 md:h-80 lg:h-[80%] sm:p-5 w-full md:w-[42%] rounded-xl bg-green-100 flex flex-col gap-2 sm:gap-3 pl-4 sm:pl-5 md:pl-6 justify-center shadow-xl"
      >
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white">
          Vegetable
        </p>
        <h1 className="font-[kurale] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold">
          Green World
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white mt-1 sm:mt-2 md:mt-3">
          Get 50% off on selected Veggies.
        </p>
        <button className="bg-white text-[#0d331c] font-bold py-1 sm:py-2 px-3 sm:px-4 w-32 sm:w-36 md:w-40 rounded-lg mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base">
          Discover Now
        </button>
      </div>

      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1559028901-a2768411cc29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmslMjBmcnVpdHN8ZW58MHx8MHx8fDA%3D)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-64 sm:h-72 md:h-80 lg:h-[80%] sm:p-5 w-full md:w-[42%] rounded-xl bg-green-400 flex flex-col gap-2 sm:gap-3 pl-4 sm:pl-5 md:pl-6 justify-center shadow-xl"
      >
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white">
          Fresh Fruits
        </p>
        <h1 className="font-[kurale] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
          Healthy Food
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white mt-1 sm:mt-2 md:mt-3">
          Get 40% off on selected Fruits.
        </p>
        <button className="bg-white text-[#0d331c] font-bold py-1 sm:py-2 px-3 sm:px-4 w-32 sm:w-36 md:w-40 rounded-lg mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base">
          Discover Now
        </button>
      </div>
    </div>
  );
};

export default TwoCards;