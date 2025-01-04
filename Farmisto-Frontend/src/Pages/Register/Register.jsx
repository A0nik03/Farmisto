import React, { useState, useEffect } from "react";
import { RiLeafFill } from "react-icons/ri";
import { FaApple, FaArrowLeftLong, FaArrowUpLong, FaHand } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleNavigate = () => {
    navigate("/");
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in", formData);
    } else {
      console.log("Signing up", formData);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://cdn.dribbble.com/userupload/15096871/file/original-7d27c04dcd28a05d8dc9cf004a9548ac.jpg?resize=1200x904&vertical=center)",
      }}
      className="h-full w-full flex justify-center items-center relative"
    >
    <div onClick={handleNavigate} className="absolute h-11 w-11 rounded-full bg-black flex justify-center items-center left-12 top-6 hover:scale-[1.05] cursor-pointer">
      <FaArrowLeftLong size={20} color="white"/>
    </div>
      <div className="w-[80%] h-[95%] flex rounded-xl overflow-hidden mx-auto">
        <div className="h-full w-1/2 bg-white flex flex-col items-center p-5">
          <span className="relative flex w-32 mt-5 ml-14">
            <span className="h-12 w-12 border-[2px] border-[#0d331c] rounded-full"></span>
            <span className="absolute left-3 h-12 w-12 flex justify-center items-center rounded-full bg-[#0d331c]">
              <RiLeafFill size={27} color="#fff" />
            </span>
          </span>

          <h1 className="text-6xl font-bold mt-5 font-[kurale]">
            {isLogin ? "Log In" : "Sign Up"}
          </h1>
          <p className="text-md font-medium text-zinc-400 mt-4 font-[kurale]">
            Welcome to Farmisto - {isLogin ? "Log in to your account" : "Let's create an account"}
          </p>

          <div className="w-full flex gap-4 mt-5 px-10">
            <button className="w-full flex justify-center items-center hover:bg-zinc-100 gap-3 p-3 border-[1px] border-zinc-500 rounded-2xl">
              <FcGoogle size={22} />
              <span className="text-md font-medium text-black">
                Log in with Google
              </span>
            </button>
            <button className="w-full flex justify-center items-center hover:bg-zinc-100 gap-3 p-3 border-[1px] border-zinc-500 rounded-2xl">
              <FaApple size={22} />
              <span className="text-md font-medium text-black">
                Log in with Apple
              </span>
            </button>
          </div>

          <form className="w-full mt-8 px-10" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full py-3 px-5 border-[1px] border-zinc-500 rounded-2xl focus:outline-none mt-4"
                value={formData.name}
                onChange={handleInputChange}
              />
            )}
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full py-3 px-5 border-[1px] border-zinc-500 rounded-2xl focus:outline-none mt-4"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full py-3 px-5 border-[1px] border-zinc-500 rounded-2xl focus:outline-none mt-4"
              value={formData.password}
              onChange={handleInputChange}
            />
            {/* <p className="flex items-center gap-3 mt-3 ml-3">
              <input
                type="checkbox"
                name="check"
                id="check"
                className="h-3 w-3"
                style={{ accentColor: "black" }}
              />
              you agree to the{" "}
              <span className="text-amber-500">Terms of Service</span> and{" "}
              <span className="text-amber-500">Privacy Policy</span>
            </p> */}
            <button
              className="w-full h-14 mt-4 rounded-xl bg-black text-white font-semibold relative"
              type="submit"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            <p className="text-center text-md font-normal text-black mt-3">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-amber-500 hover:text-green-600 font-semibold cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-amber-500 hover:text-green-600 font-semibold cursor-pointer"
                  >
                    Log In
                  </span>
                </>
              )}
            </p>
          </form>
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
