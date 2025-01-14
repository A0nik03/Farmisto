import React from "react";
import SideNav from "./sidenav";
import { BsPersonCircle } from "react-icons/bs";

function SettingOption({ option }) {
  return (
    <div className="w-full cursor-pointer text-left bg-[#f5f0e3] hover:bg-[#d9d4b7] p-3 rounded-lg text-[#2A293E] font-medium shadow-sm">
      {option}
    </div>
  );
}

const settingsData = [
  {
    category: "Profile Settings",
    options: ["Edit Profile", "Change Profile Picture"],
  },
  {
    category: "Account Management",
    options: ["Change Password", "Two-Factor Authentication"],
  },
  {
    category: "Payment Settings",
    options: [
      "Bank Details",
      "UPI Integration",
      "Payment Gateway Settings",
      "Transaction History",
    ],
  },
  {
    category: "Help & Support",
    options: ["Contact Support", "FAQs", "Feedback/Suggestions"],
  },
  {
    category: "Legal & Compliance",
    options: ["Terms & Conditions", "Privacy Policy", "Licenses/Certificates"],
  },
  {
    category: "Logout",
    options: ["Logout"],
  },
];

const Settings = () => {
  return (
    <div className="h-screen w-full flex bg-[#f7f3e9]">
      <SideNav />
      <div className="flex flex-col w-full overflow-y-auto font-[Fjalla One]">
        <div className="flex justify-between items-center px-20 mt-10 mb-8">
          <div className="flex items-center space-x-3">
            <img src="./settings.png" className="h-9 w-9" alt="Settings Icon" />
            <h2 className="text-3xl text-nowrap w-56 font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E]">
              Settings Panel
            </h2>
          </div>
          <BsPersonCircle size={36} className="text-[#2A293E] hover:scale-[1.05] hover:cursor-pointer" />
        </div>

        <div className="w-[90%] flex flex-col gap-7 mx-auto">
          {settingsData.map((section, index) => (
            <div key={index} className="border-b pb-4 last:border-none">
              <h2 className="text-lg font-medium text-[#2A293E] mb-2">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 gap-5">
                {section.options.map((option, idx) => (
                  <SettingOption key={idx} option={option} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
