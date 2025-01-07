import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSchedule,
  AiOutlineMessage,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsFillTreeFill, BsCreditCard } from "react-icons/bs";

const SideNav = () => {
  const routes = [
    { path: "/dashboard", name: "Dashboard", icon: AiOutlineHome },
    { path: "/schedule", name: "Schedule", icon: AiOutlineSchedule },
    { path: "/plants", name: "Plants", icon: BsFillTreeFill },
    { path: "/messages", name: "Messages", icon: AiOutlineMessage },
    { path: "/payments", name: "Payments", icon: BsCreditCard },
    { path: "/settings", name: "Settings", icon: AiOutlineSetting },
  ];

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1;
  }

  const links = (
    <div className="space-y-4 mt-8">
      {routes.map((route, key) => {
        const isActive = activeRoute(route.path);
        return (
          <NavLink
            to={route.path}
            key={key}
            className={`flex items-center p-3 rounded-md font-mono font-medium
                hover:bg-green-500 hover:text-white transition-colors duration-100
             `}
          >
            <route.icon
              className={`w-6 h-6 ml-4 `}
            />
            <span className={`ml-5 `}>
              {route.name}
            </span>
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <div className="w-[20%] flex flex-col items-center bg-zinc-100  h-full shadow-lg">
      <div className="flex-grow w-full">
        <p className="h-full w-full">{links}</p>
      </div>
      <div>
        <div style={
            {
                backgroundImage: 'url(https://cdn.dribbble.com/userupload/15096871/file/original-7d27c04dcd28a05d8dc9cf004a9548ac.jpg?resize=1200x904&vertical=center)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        } className="h-52 w-52 mb-3 overflow-hidden rounded-2xl flex flex-col justify-end">
          <div className="w-full h-20  rounded-b-xl bg-black opacity-60 flex items-center justify-center">
            <p className="text-lg font-bold text-white">
                Add Form
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
