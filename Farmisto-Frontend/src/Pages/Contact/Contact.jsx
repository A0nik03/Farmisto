import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const ContactUs = () => {
  return (
    <div className="h-auto w-full bg-gradient-to-b from-zinc-100 to-white">
      <NavBar />

      {/* Hero Section */}
      <div className="h-[20vh] flex items-center justify-center bg-green-800 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold font-[satoshi] leading-tight">
            Contact <span className="text-yellow-400">Us</span>
          </h1>
          <p className="text-md mt-2 font-medium leading-relaxed">
            Get in touch with us for any inquiries or support.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-20 px-10">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10">
          <h2 className="text-4xl font-bold text-[#242424] text-center mb-8">
            We’d love to hear from you!
          </h2>
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-md font-medium text-green-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Enter your full name"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-md font-medium text-green-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Enter your email address"
              />
            </div>
            {/* Subject */}
            <div>
              <label className="block text-md font-medium text-green-800 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Enter the subject"
              />
            </div>
            {/* Message */}
            <div>
              <label className="block text-md font-medium text-green-800 mb-2">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Write your message"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-green-800 text-white font-bold rounded-full shadow-lg hover:scale-[1.03] transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Additional Contact Details */}
      <div className="mt-20 px-10 mb-10">
        <div className="max-w-5xl mx-auto bg-green-800 text-white rounded-lg p-10">
          <h3 className="text-3xl font-bold mb-4">Our Contact Details</h3>
          <ul className="space-y-4 text-md font-medium">
            <li>
              <strong>Address:</strong> 123 Green Street, Farmer’s City, AG
              45678
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@farmfresh.com" className="underline">
                support@farmfresh.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> +1 (123) 456-7890
            </li>
            <li>
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
