import React from "react";
import { FaArrowRightLong, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="h-[80vh] bg-[#2c3e2e] flex flex-col">
      {/* Top Gradient Bar */}
      <div className="w-full h-2 flex">
        <div className="w-1/2 h-full bg-[#7a9f35]"></div>
        <div className="w-1/2 h-full bg-[#5a7f4e]"></div>
      </div>

      <div className="w-[90%] h-full mx-auto p-5">
        {/* Sign-up Section */}
        <div className="w-full h-[15vh] flex items-center justify-between mt-5">
          <div className="w-1/2">
            <p className="text-2xl font-bold text-white tracking-wide">
              Sign up to receive the latest deals and fresh produce directly
              from farmers in your area
            </p>
          </div>
          <div className="w-1/2 p-5 flex items-center">
            <div className="h-14 w-full px-2 flex items-center bg-[#5a7f4e] rounded-lg">
              <MdEmail size={30} className="text-white" />
              <input
                type="text"
                placeholder="Enter your email address"
                className="w-3/4 text-md font-semibold outline-none px-4 bg-transparent text-white placeholder-white"
              />
              <button className="w-44 h-12 rounded-md bg-white flex gap-2 items-center justify-center hover:shadow-lg hover:bg-[#7a9f35] transition-all">
                <p className="text-xl font-medium">Subscribe</p>
                <FaArrowRightLong size={20} />
              </button>
            </div>
          </div>
        </div>

        <hr className="border-[1px] border-white w-full mt-10 rounded-full opacity-10" />

        {/* Middle Section */}
        <div className="w-full h-[40vh] flex items-center justify-between">
          {/* Links and Branding */}
          <div className="h-full w-1/2 flex flex-col items-center">
            <div className="h-20 flex gap-6 mt-10">
              {["Company", "About Us", "FAQs", "Shipping & Returns", "Contact Us"].map((item, index) => (
                <div key={index} className="px-4 py-2">
                  <p className="text-zinc-300 text-md font-medium whitespace-nowrap">{item}</p>
                </div>
              ))}
            </div>
            <h1 className="text-white font-black text-8xl opacity-50 mt-5">Farmisto.</h1>
          </div>

          {/* Social Media Icons */}
          <div className="w-1/2 h-full flex justify-center items-center gap-6">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
              <Icon
                key={index}
                className="text-4xl text-zinc-200 hover:text-[#7a9f35] cursor-pointer transition-transform transform hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-[#5a7f4e] text-white py-4 flex justify-center space-x-8 items-center px-10">
        <div className="text-white text-sm">&copy; {new Date().getFullYear()} Farmisto. All Rights Reserved.</div>
        <a href="/privacy-policy" className="hover:text-[#7a9f35] whitespace-nowrap">
          Privacy Policy
        </a>
        <a href="/terms-conditions" className="hover:text-[#7a9f35] whitespace-nowrap">
          Terms & Conditions
        </a>
        <a href="/legal-notice" className="hover:text-[#7a9f35] whitespace-nowrap">
          Legal Notice
        </a>
      </div>
    </div>
  );
};

export default Footer;
