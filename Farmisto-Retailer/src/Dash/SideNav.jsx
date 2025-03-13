import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import {
  MdDiscount,
  MdHome,
  MdMessage,
  MdShoppingCart,
  MdSpaceDashboard,
} from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("isOpen");
    if (savedState) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const routes = [
    { path: "/", name: "Home", icon: MdHome },
    { path: "/dashboard", name: "Dashboard", icon: MdSpaceDashboard },
    { path: "/Additem", name: "Add Items", icon: MdShoppingCart },
    { path: "/Orders", name: "Orders", icon: FaBox },
    { path: "/Message", name: "Messages", icon: MdMessage },
    { path: "/Discounts", name: "Discounts", icon: MdDiscount },
  ];

  const toggleNav = () => {
    setIsOpen((prevState) => {
      const newState = !prevState;
      localStorage.setItem("isOpen", JSON.stringify(newState));
      return newState;
    });
  };

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1;
  }

  const links = (
    <div className="space-y-4 px-3 mt-8">
      {routes.map((route, key) => {
        const isActive = activeRoute(route.path);
        return (
          <NavLink
            to={route.path}
            key={key}
            className={`flex items-center ${isOpen ? "p-3" : ""} sm:p-3 font-medium 
                transition-all duration-300 ease-in-out 
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#7a9f35] to-[#6b8e2b]"
                    : "text-[#405f27]"
                } 
                hover:bg-gradient-to-r hover:from-[#6b8e2b] hover:to-[#7a9f35] hover:text-white 
                hover:shadow-lg rounded-lg`}
          >
            <route.icon className={`w-6 h-6 ${isOpen ? "ml-2" : "mr-0"}`} />
            {isOpen && <span className="ml-7 text-base lg:text-xl">{route.name}</span>}
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <div
      className={`${
        isOpen ? "w-[60%] lg:w-[15%]" : "w-[0%] lg:w-[5%]"
      } h-screen sm:relative absolute z-20 left-0 top-0 flex flex-col items-center bg-[#F7F3E9] shadow-2xl select-none border-r-2 border-[#D9CDA3] transition-all duration-300 scrollbar-none`}
    >
      <div className="flex flex-col w-full items-start mt-4">
        {/* Toggle Button */}
        <div
          onClick={toggleNav}
          className="mb-4 p-3 pl-5 text-[#3D5A4A] transition-colors rounded-full transform hover:scale-[1.08] cursor-pointer"
        >
          <HiOutlineBars3 size={30} />
        </div>
      </div>

      <div className="flex-grow w-full">{links}</div>

      {/* Divider */}
      <hr className="border-t-2 border-[#D9CDA3] w-full mt-4" />

      {/* Themed Banner Section */}
      {isOpen && (
        <div className={`w-full h-16 hidden sm:block p-3 bg-[#3D5A4A] text-white text-center`}>
          <p className="text-sm lg:text-base font-semibold">
            Grow your farm
          </p>
          <p className="text-sm lg:text-base font-semibold">
           Grow your future
          </p>
        </div>
      )}
    </div>
  );
};

export default SideNav;
