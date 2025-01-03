import React, { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "Our platform connects consumers directly with farmers, ensuring access to fresh produce while promoting fair trade and sustainability.",
    },
    {
      question: "How does it work?",
      answer:
        "Consumers can browse farmers within a 30km radius, negotiate prices, and purchase produce directly. Farmers and retailers also have access to dashboards to track their items and profits.",
    },
    {
      question: "What are the benefits for farmers?",
      answer:
        "Farmers get better recognition, fair prices for their produce, and direct connections with consumers and retailers, reducing middlemen costs.",
    },
    {
      question: "How can I register as a farmer or retailer?",
      answer:
        "You can sign up through our platform and select your role as either a farmer or retailer. Once registered, you will have access to all relevant features, including item tracking and analytics.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, we are focused on the web platform, but we are working on developing a mobile app for easier access.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="h-auto w-full bg-gradient-to-b from-zinc-100 to-white">
      <NavBar />

      {/* Hero Section */}
      <div className="h-[20vh] flex items-center justify-center bg-green-800 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold font-[satoshi] leading-tight">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h1>
          <p className="text-md mt-2 font-medium leading-relaxed">
            Your queries answered, all in one place.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 px-10 space-y-10">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-xl font-bold text-green-800">
                {faq.question}
              </h2>
              <span
                className={`text-green-800 font-bold text-2xl transition-transform ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ⌵
              </span>
            </div>
            <div
              className={`mt-4 text-md text-gray-600 leading-relaxed ${
                activeIndex === index ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action */}
      <div className="mt-20 p-10 text-center bg-green-800 text-white">
        <h2 className="text-4xl font-bold">Have More Questions?</h2>
        <p className="text-lg mt-5">
          Feel free to reach out to us for any additional information or
          concerns.
        </p>
        <button className="mt-10 px-8 py-3 bg-white text-green-800 font-bold rounded-full shadow-lg hover:scale-[1.03] transition">
          Contact Us
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default FAQs;
