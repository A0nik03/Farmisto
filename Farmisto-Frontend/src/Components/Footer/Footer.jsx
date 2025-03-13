import React from "react";
import {
  FaArrowRightLong,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="h-auto bg-[#123827] flex flex-col">
      {/* Top Gradient Bar */}
      <div className="w-full h-2 flex">
        <div className="w-1/2 h-full bg-teal-400"></div>
        <div className="w-1/2 h-full bg-green-400"></div>
      </div>

      <div className="w-[90%] mx-auto py-5">
        {/* Sign-up Section */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-6 mt-5">
          <div className="w-full lg:w-1/2">
            <p className="text-xl lg:text-2xl font-bold text-white tracking-wide leading-snug">
              Sign up to receive the latest deals and fresh produce directly
              from farmers in your area.
            </p>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="h-14 w-full px-2 flex items-center bg-[#114f35] rounded-lg">
              <MdEmail className="text-white text-4xl sm:text-5xl" />
              <input
                type="text"
                placeholder="Email Address"
                className="flex-1 w-2/3 text-sm font-semibold outline-none px-4 bg-transparent text-white placeholder-white"
              />
              <button className="w-1/3 lg:w-44 h-11 sm:h-12 rounded-md bg-white flex items-center justify-center hover:shadow-lg hover:bg-[#7a9f35] transition-all">
                <p className="text-sm lg:text-xl font-medium">Subscribe</p>
                <FaArrowRightLong  className="text-sm ml-2"/>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-[1px] border-white w-full mt-10 rounded-full opacity-10" />

        <div className="flex flex-wrap items-center justify-between gap-10 mt-10">
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6">
              {["Company", "About Us", "FAQs", "Shipping & Returns", "Contact Us"].map((item, index) => (
                <a
                  key={index}
                  href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                  className="text-zinc-300 text-sm lg:text-md font-medium hover:text-[#7a9f35] transition-colors whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>
            <h1 className="text-white font-black text-5xl lg:text-8xl opacity-50 mt-5">
              Farmisto.
            </h1>
          </div>

          <div className="w-full flex justify-center gap-6">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
              <Icon
                key={index}
                className="text-3xl lg:text-4xl text-zinc-200 hover:text-[#7a9f35] cursor-pointer transition-transform transform hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-[#114f35] text-white py-4 flex flex-wrap justify-center gap-4 items-center">
        <p className="text-sm text-center">&copy; {new Date().getFullYear()} Farmisto. All Rights Reserved.</p>
        {["Privacy Policy", "Terms & Conditions", "Legal Notice"].map((item, index) => (
          <a
            key={index}
            href={`/${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm hover:text-[#7a9f35] transition-colors whitespace-nowrap"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;

