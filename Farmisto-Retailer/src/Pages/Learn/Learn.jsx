import React from "react";
import NavBar from "../../Components/Major/NavBar";
import Footer from '../../Components/Footer/Footer'

const Learn = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col w-full overflow-y-auto flex-1">
        <div className="px-5 mt-14 flex flex-col items-center justify-center text-center rounded-2xl mb-10">
          <h1 className="text-5xl md:text-7xl font-bold text-[#2A293E]">
            Welcome to Farmisto: A Guide for Farmers
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium text-[#2A293E]">
            Learn how to use the Farmisto website to sell your produce directly
            to customers.
          </p>
        </div>

        <div className="px-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-20 w-full">
          {/* Dashboard Overview Section */}
          <section className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">
              1. Your Dashboard
            </h2>
            <div className="flex justify-center items-center">
              <iframe
                width="450"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Farmisto Dashboard Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </section>

          {/* Listing Produce Section */}
          <section className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">
              2. Listing Your Produce
            </h2>
            <div className="flex justify-center items-center">
              <iframe
                width="450"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="How to List Produce on Farmisto"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </section>

          {/* Orders Management Section */}
          <section className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">
              3. Managing Orders
            </h2>
            <div className="flex justify-center items-center">
              <iframe
                width="450"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Managing Orders on Farmisto"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </section>

          {/* Settings Page Section */}
          <section className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">
              4. Settings
            </h2>
            <div className="flex justify-center items-center">
              <iframe
                width="450"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Settings on Farmisto"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </section>

          {/* Sales Stats Section */}
          <section className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">
              5. Sales Stats & Reports
            </h2>
            <div className="flex justify-center items-center">
              <iframe
                width="450"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sales Stats and Reports"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </section>

          {/* Graphics & Tutorials Section */}
          <section className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">
              6. Graphics & Tutorials
            </h2>
            <div className="flex justify-center items-center">
              <iframe
                width="450"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="6. Graphics & Tutorials"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </section>
        </div>

        {/* Final Note */}
        <section className="text-center w-full">
          <p className="text-xl text-gray-800">
            We hope this guide helps you get started on Farmisto! If you need
            further assistance, feel free to contact our support team.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
