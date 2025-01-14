import React from "react";
import { FaArrowRightLong, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { link: "About", path: "/about" },
    { link: "Contact", path: "/contact" },
    {link:"FAQs",path:"/faq"},
    {link:"Terms & Conditions",path:"/terms-conditions"},
    {link:"Privacy Policy",path:"/privacy-policy"},
  ]
  return (
    <div className="h-[80vh] bg-[#123827] w-full flex flex-col font-[satoshi]">
      <div className="w-full h-2 flex">
        <div className="w-1/2 h-full bg-teal-400"></div>
        <div className="w-1/2 h-full bg-green-400"></div>
      </div>

      <div className="w-[90%] h-full mx-auto p-5">
        <div className="w-full h-[15vh] flex items-center mt-5">
          <div className="w-1/2">
            <p className="text-2xl font-bold text-white tracking-wide">
              Sign up to receive the latest deals and fresh produce directly
              from farmers in your area
            </p>
          </div>
          <div className="w-1/2 p-5 flex">
            <div className="h-14 w-full px-2 flex items-center bg-[#114f35] rounded-lg">
              <MdEmail size={30} className="text-zinc-200" />
              <input
                type="text"
                placeholder="Enter your email address"
                className="w-3/4 text-md font-semibold h-full outline-none px-4 bg-[#114f35] text-zinc-200"
              />
              <button className="w-44 h-12 rounded-md bg-white flex gap-2 items-center justify-center hover:shadow-lg">
                <p className="text-xl font-medium">Subscribe</p>
                <FaArrowRightLong size={20} />
              </button>
            </div>
          </div>
        </div>

        <hr className="border-[1px] border-white w-full mt-10 rounded-full opacity-10" />

        <div className="w-full h-[40vh] flex items-center justify-between">
          <div className="h-full w-1/2 flex flex-col items-center">
            <div className="h-20 flex gap-6 mt-10">
              {links.map((item, index) => (
                <Link to={item.path} key={index} className="px-4 py-2">
                  <p className="text-zinc-300 text-md font-medium whitespace-nowrap hover:text-white scale-[1.02]">{item.link}</p>
                </Link>
              ))}
            </div>
            <h1 className="text-white font-black text-8xl opacity-50 mt-5">Farmisto.</h1>
          </div>

          <div className="w-1/2 h-full flex justify-center items-center gap-6">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
              <Icon key={index} className="text-4xl text-zinc-200 hover:text-teal-600 cursor-pointer" />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#114f35] text-white py-4 flex justify-center space-x-8 items-center px-10">
        <div className="text-white text-sm">&copy; {new Date().getFullYear()} Farmisto. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
