import SideNav from "./sidenav";
import { BsPersonCircle } from "react-icons/bs";
function SettingOption({ option }) {
  return (
    <button className="w-6/12 text-left bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-gray-800 font-medium shadow-sm transition">
      {option}
    </button>
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
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className=" mx-10 w-full h-full bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
        <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Settings Panel
        </h1>
        <BsPersonCircle
          size={36}
          className="text-gray-600 hover:scale-[1.05] hover:cursor-pointer"
        />
        </div>
        <div className="space-y-6 ">
          {settingsData.map((section, index) => (
            <div key={index} className="border-b pb-4 last:border-none">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                {section.category}
              </h2>
              <div className="grid grid-cols-2 gap-4">
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
