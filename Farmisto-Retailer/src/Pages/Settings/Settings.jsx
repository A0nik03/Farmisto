import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import SideNav from "../../Dash/sidenav";
import { Link, Outlet } from "react-router-dom";

const settingsData = [
  {
    options: "Profile Settings",
    link: "ProfileSettings",
  },
  {
    options: "Payment Settings",
    link: "PaymentSettings",
  },
  {
    options: "Help & Support",
    link: "HelpAndSupport",
  },
  {
    options: "Legal & Compliance",
    link: "LegalAndCompliance",
  },
];

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="h-screen w-full flex bg-[#f7f3e9]">
      <SideNav />
      <div className="flex flex-col w-full overflow-y-auto font-[Fjalla One]">
        <div className="w-full h-screen flex">
          <div className="h-full w-1/4 flex flex-col items-center gap-6 px-5 py-4">
            <h2 className="text-3xl text-nowrap w-full font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E] mb-10">
              Settings Panel
            </h2>
            {settingsData.map((section, index) => (
              <Link
                to={section.link}
                onClick={() => setSelectedOption(index)}
                key={index}
                className={`h-12 w-60 rounded-lg flex items-center justify-center border-2 border-[#e8dab7] ${
                  selectedOption === index
                    ? "bg-[#e8dab7]"
                    : "hover:bg-[#e8dab7]"
                } cursor-pointer transition-colors`}
              >
                <h2 className="text-lg font-medium text-[#2A293E]">
                  {section.options}
                </h2>
              </Link>
            ))}
          </div>

          <div className="h-full w-3/4 border-l-4 border-[#70942e]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
