import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { RiLeafFill } from "react-icons/ri";

const Register = () => {
  return (
    <div style={{backgroundImage:'url(https://cdn.dribbble.com/userupload/15096871/file/original-7d27c04dcd28a05d8dc9cf004a9548ac.jpg?resize=1200x904&vertical=center)'}} className="h-full w-full flex justify-center items-center">
      <div className="w-[80%] h-[90%] flex rounded-xl overflow-hidden mx-auto">
        <div className="h-full w-1/2 bg-white flex flex-col items-center  p-5">
        {/* Logo */}
          <span className="relative flex w-32 mt-5 ml-2">
            <span className="h-12 w-12 border-[2px] border-[#0d331c] rounded-full"></span>
            <span className="absolute left-3 h-12 w-12 flex justify-center items-center rounded-full bg-[#0d331c]">
              <RiLeafFill size={27} color="#fff" />
            </span>
          </span>

          <h1 className="text-6xl font-bold mt-5">Sign Up</h1>
        </div>
        <div className="h-full w-1/2 bg-white p-2">
          <img
            src="https://cdn.dribbble.com/userupload/12474394/file/original-f302b712afeab2efe8b2ac76d999476d.png?resize=1200x900&vertical=center"
            className="h-full w-full object-cover rounded-lg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
