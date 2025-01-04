import React from "react";

const Story = () => {
  return (
    <div className="h-[80vh] bg-white flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="relative w-full lg:w-1/3 px-5 lg:px-20">
        <div className="absolute w-[80%] h-[90%] top-28">
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
            className="absolute w-[40%] h-[10%] top-[50%] -right-14 flex items-center justify-center rounded-3xl py-10 px-"
          >
            <p
              style={{
                textShadow: "2px 2px 2px rgba(0,0,0,0.2)",
              }}
              className="text-white text-2xl font-semibold text-nowrap"
            >
              Since 2001
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-full lg:w-2/3 p-5 lg:p-10 pt-24 pl-5 lg:pl-20">
        <h1 className="text-3xl lg:text-5xl text-[#242424] font-bold">
          Our Story
        </h1>
        <p className="text-sm lg:text-lg mt-5 text-[#242424] font-medium tracking-wider w-full lg:w-[80%] pt-5">
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
        <div className="rounded-full mt-10 h-12 w-40 bg-green-800 flex justify-center items-center text-white cursor-pointer hover:bg-green-700 transition-all duration-300">
          <p className="text-sm lg:text-base">Learn More</p>
        </div>
      </div>
    </div>
  );
};

export default Story;
