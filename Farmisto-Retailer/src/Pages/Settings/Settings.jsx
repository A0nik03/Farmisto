import React, { useState } from "react";
import SideNav from "../../Dash/SideNav";
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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f7f3e9]">
      <SideNav />
      <div className="flex flex-col w-full overflow-y-auto font-[Fjalla One]">
        <div className="w-full min-h-screen flex flex-col md:flex-row">
          {/* Mobile horizontal navigation */}
          <div className="md:hidden pt-20 w-full flex overflow-x-auto border-b-4 border-[#70942e] p-4 gap-4 bg-white sticky top-0 z-10">
            {settingsData.map((section, index) => (
              <Link
                to={section.link}
                onClick={() => setSelectedOption(index)}
                key={index}
                className={`min-w-[150px] h-10 rounded-lg flex items-center justify-center border-2 border-[#e8dab7] ${
                  selectedOption === index
                    ? "bg-[#e8dab7]"
                    : "hover:bg-[#e8dab7]"
                } cursor-pointer transition-colors shrink-0`}
              >
                <h2 className="text-base font-medium text-[#2A293E] whitespace-nowrap">
                  {section.options}
                </h2>
              </Link>
            ))}
          </div>

          {/* Desktop vertical navigation */}
          <div className="hidden md:flex h-full w-full md:w-1/4 flex-col items-center gap-6 px-5 py-4">
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

          {/* Content Area */}
          <div className="h-full w-full md:w-3/4 border-t-4 md:border-t-0 md:border-l-4 border-[#70942e] p-4 md:p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;