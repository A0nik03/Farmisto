import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const TermsConditions = () => {
  return (
    <div className="h-auto w-full bg-gradient-to-b from-zinc-100 to-white">
      <NavBar />

      {/* Hero Section */}
      <div className="h-[20vh] flex items-center justify-center bg-green-800 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold font-[satoshi] leading-tight">
            Terms & <span className="text-yellow-400">Conditions</span>
          </h1>
          <p className="text-md mt-2 font-medium leading-relaxed">
            Know the rules before you engage with our platform.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-20 px-10 space-y-20">
        {/* Introduction */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1655979910796-7d81bd5449a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Terms and Conditions"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">Welcome</h2>
            <p className="text-md mt-5 text-green-800 font-medium leading-relaxed">
              By using our platform, you agree to adhere to these terms and
              conditions. Please read them carefully before proceeding.
            </p>
          </div>
        </div>

        {/* User Responsibilities */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">
              User Responsibilities
            </h2>
            <ul className="list-disc mt-5 text-green-800 font-medium leading-relaxed">
              <li>
                Users must provide accurate and truthful information during
                registration.
              </li>
              <li>
                Misuse of the platform for illegal activities is strictly
                prohibited.
              </li>
              <li>
                Ensure the security of your account credentials.
              </li>
              <li>
                Report any suspicious activity immediately.
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="User Responsibilities"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="https://plus.unsplash.com/premium_photo-1700681802465-63aae555de29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByaXZhY3l8ZW58MHx8MHx8fDA%3D"
              alt="Privacy Policy"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">
              Privacy Policy
            </h2>
            <p className="text-md mt-5 text-green-800 font-medium leading-relaxed">
              Your data privacy is our priority. We ensure that your information
              is securely stored and not shared with third parties without your
              consent.
            </p>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="flex items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-[#242424]">
              Limitation of Liability
            </h2>
            <p className="text-md mt-5 text-green-800 font-medium leading-relaxed">
              While we strive to provide accurate information and a seamless
              experience, we are not liable for any direct, indirect, or
              incidental damages that may occur while using our platform.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg"
              alt="Limitation of Liability"
              className="h-[50vh] w-full object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
      <Footer />
      </div>
    </div>
  );
};

export default TermsConditions;
