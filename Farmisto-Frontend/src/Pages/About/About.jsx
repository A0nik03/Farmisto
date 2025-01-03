import React from "react";
import { RiPlantLine, RiTeamLine } from "react-icons/ri";
import { GiFarmer } from "react-icons/gi";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const About = () => {
  return (
    <div className="h-auto w-full bg-gradient-to-b from-zinc-100 to-white">
      <NavBar />

      {/* Hero Section */}
      <div className="h-[20vh] flex items-center justify-center bg-green-800 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold font-[satoshi] leading-tight">
            About <span className="text-yellow-400">Us</span>
          </h1>
          <p className="text-md mt-2 font-medium leading-relaxed">
            Revolutionizing how fresh produce reaches your table.
          </p>
        </div>
      </div>

      {/* Mission, Vision, and Values Section */}
      <div className="mt-20 px-10 space-y-20">
        {/* Mission */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg"
              alt="Farm mission"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">Our Mission</h2>
            <p className="text-md mt-5 text-green-800 font-medium leading-relaxed">
              To connect consumers with farmers directly, ensuring the freshest
              produce while empowering local agriculture through fair trade and
              sustainable practices.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">Our Vision</h2>
            <p className="text-md mt-5 text-green-800 font-medium leading-relaxed">
              A future where communities thrive on locally sourced, organic food
              while farmers gain the recognition and compensation they deserve
              for their hard work.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/11691740/pexels-photo-11691740.jpeg"
              alt="Farm vision"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
        </div>

        {/* Values */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/414507/pexels-photo-414507.jpeg"
              alt="Farm values"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">Our Values</h2>
            <ul className="list-disc mt-5 text-green-800 font-medium leading-relaxed">
              <li>
                Sustainability: Protecting our planet through eco-friendly
                practices.
              </li>
              <li>
                Fair Trade: Ensuring farmers receive the value they deserve.
              </li>
              <li>
                Transparency: Building trust through honest communication and
                transactions.
              </li>
              <li>
                Community: Strengthening local economies by supporting local
                farmers.
              </li>
              <li>
                Health: Promoting nutritious and fresh food choices for all.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="mt-20 p-10 text-center bg-green-800 text-white">
        <h2 className="text-4xl font-bold">Join the Revolution</h2>
        <p className="text-lg mt-5">
          Be part of a community that values fresh, organic produce and fair
          trade. Together, we can make a difference.
        </p>
        <button className="mt-10 px-8 py-3 bg-white text-green-800 font-bold rounded-full shadow-lg hover:scale-[1.03] transition">
          Get Started Today
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default About;
