import React from "react";

const Story = () => {
  return (
    <div className="min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] bg-white flex flex-col lg:flex-row py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Image Section */}
      <div className="relative w-full lg:w-1/3 px-4 sm:px-6 md:px-12 lg:px-20 flex justify-center lg:justify-start">
        <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-[240px] sm:h-[280px] md:h-[360px] lg:h-[420px] mt-8 sm:mt-10 md:mt-12 lg:mt-20">
          <img
            style={{
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "10%",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "10%",
            }}
            src="https://images.pexels.com/photos/1094544/pexels-photo-1094544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="h-full w-full object-cover shadow-2xl"
            alt="Fresh vegetables in a basket"
          />
          <div
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            }}
            className="absolute w-[100px] sm:w-[120px] md:w-[140px] h-8 sm:h-10 md:h-12 top-[50%] -right-4 sm:-right-6 md:-right-8 transform -translate-y-1/2 flex items-center justify-center rounded-3xl"
          >
            <p
              style={{
                textShadow: "2px 2px 2px rgba(0,0,0,0.2)",
              }}
              className="text-white text-base sm:text-lg md:text-xl font-semibold whitespace-nowrap"
            >
              Since 2001
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-full lg:w-2/3 px-4 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col justify-center items-center lg:items-start">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#242424] font-bold text-center lg:text-left">
          Our Story
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#242424] font-medium tracking-wider mt-3 sm:mt-4 md:mt-5 lg:mt-6 max-w-xl sm:max-w-2xl md:max-w-3xl text-center lg:text-left">
          At Farmisto, we’re redefining the farm-to-table journey by eliminating
          intermediaries. Our platform connects consumers with farmers within a
          5-kilometer radius, ensuring access to fresh, locally grown produce at
          fair prices. For retailers, we provide a space to connect and
          negotiate directly with farmers, fostering transparency and better
          deals. Farmers, in turn, earn more for their hard work while building
          trust with their communities. With Farmisto, it’s not just about
          buying and selling—it’s about creating a fair, sustainable, and
          connected food system for everyone.
        </p>
        <div className="rounded-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 h-9 sm:h-10 md:h-11 lg:h-12 w-28 sm:w-32 md:w-36 lg:w-40 bg-green-800 flex justify-center items-center text-white cursor-pointer hover:bg-green-700 transition-all duration-300">
          <p className="text-xs sm:text-sm md:text-base lg:text-base">Learn More</p>
        </div>
      </div>
    </div>
  );
};

export default Story;