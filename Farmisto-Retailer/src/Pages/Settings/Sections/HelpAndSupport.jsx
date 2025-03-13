import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaCommentDots,
  FaAngleDown,
  FaAngleUp,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const HelpAndSupport = () => {
  const [formData, setFormData] = useState({
    feedback: "",
  });


  const [expandedSections, setExpandedSections] = useState({
    faqs: true,
    feedbackSuggestions: false,
  });

  const faqs = [
    {
      question: "How can I track my weekly or monthly profits?",
      answer:
        "Visit 'Profit Tracking' to switch between weekly and monthly views of your earnings from consumer orders.",
    },
    {
      question: "How do I check the status of my orders?",
      answer:
        "Go to 'Order Management' to see all orders with statuses like 'Pending,' 'Shipped,' or 'Delivered,' plus customer details.",
    },
    {
      question: "Can I cancel an order after it’s placed?",
      answer:
        "Yes, in 'Order Management,' select the order, click 'Cancel,' and provide a reason before it’s shipped.",
    },
    {
      question: "How do I update my payment details?",
      answer:
        "Head to 'Payment Settings' to edit your bank account or UPI details for seamless profit transfers.",
    },
    {
      question: "What happens if a consumer doesn’t pay?",
      answer:
        "Farmisto collects payment upfront before shipping, ensuring you’re covered. Contact us if issues arise.",
    },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


  return (
    <div className="min-h-screen bg-[#e8dab7] flex flex-col overflow-y-scroll">
      <main className="h-full flex justify-center items-center">
        <div className="p-6 h-screen w-full transform transition-all duration-300">
          <div className="text-3xl w-1/4 font-semibold text-[#5a4e2d] border-b-4 border-[#70942e] mb-6 tracking-tight">
            <p className="text-center mb-2">Help & Support</p>
          </div>

          <form  className="space-y-8">
            {/* FAQs */}
            <div>
              <div
                onClick={() => toggleSection("faqs")}
                className="flex items-center justify-between w-full text-lg font-medium text-[#5a4e2d] mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaQuestionCircle className="text-[#70942e]" /> FAQs
                </span>
                {expandedSections.faqs ? (
                  <FaAngleUp className="text-[#70942e]" />
                ) : (
                  <FaAngleDown className="text-[#70942e]" />
                )}
              </div>
              {expandedSections.faqs && (
                <div className="pl-4 space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-[#f5f0e1] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#70942e]"
                    >
                      <div className="flex items-start gap-3">
                        <FaLeaf className="text-[#70942e] mt-1" />
                        <div>
                          <h3 className="text-[#5a4e2d] font-semibold flex items-center gap-2">
                            {faq.question}
                            <FaCheckCircle className="text-[#70942e] text-sm" />
                          </h3>
                          <p className="text-[#5a4e2d] text-sm mt-1">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Feedback/Suggestions */}
            <div>
              <div
                onClick={() => toggleSection("feedbackSuggestions")}
                className="flex items-center justify-between w-full text-lg font-medium text-[#5a4e2d] mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaCommentDots className="text-[#70942e]" /> Feedback/Suggestions
                </span>
                {expandedSections.feedbackSuggestions ? (
                  <FaAngleUp className="text-[#70942e]" />
                ) : (
                  <FaAngleDown className="text-[#70942e]" />
                )}
              </div>
              {expandedSections.feedbackSuggestions && (
                <div className="space-y-4 pl-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <textarea
                        name="feedback"
                        value={formData.feedback}
                        className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all`}
                        placeholder="Share your feedback or suggestions"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div
              className="w-full py-2.5 px-4 bg-[#70942e] text-white rounded-lg hover:bg-[#7fa834] transition-all duration-300 font-medium shadow-sm hover:shadow-md text-center cursor-pointer"
            >
              Submit Feedback
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default HelpAndSupport;