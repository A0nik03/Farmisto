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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.feedback.trim()) {
      alert("Please enter your feedback before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "/farmer/support/feedback",
        { feedback: formData.feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Feedback submitted successfully!");
        setFormData({ feedback: "" });
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#e8dab7] flex flex-col">
      <main className="flex-1 flex justify-center items-start p-4 sm:p-6">
        <div className="w-full max-w-4xl transform transition-all duration-300 hover:shadow-lg">
          <div className="text-2xl sm:text-3xl font-semibold text-[#5a4e2d] border-b-4 border-[#70942e] mb-4 sm:mb-6 tracking-tight text-center">
            Help & Support
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FAQs */}
            <div>
              <div
                onClick={() => toggleSection("faqs")}
                className="flex items-center justify-between w-full text-base sm:text-lg font-medium text-[#5a4e2d] mb-3 sm:mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaQuestionCircle className="text-[#70942e] w-5 h-5" /> FAQs
                </span>
                {expandedSections.faqs ? (
                  <FaAngleUp className="text-[#70942e] w-5 h-5" />
                ) : (
                  <FaAngleDown className="text-[#70942e] w-5 h-5" />
                )}
              </div>
              {expandedSections.faqs && (
                <div className="pl-2 sm:pl-4 space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-[#f5f0e1] p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#70942e]"
                    >
                      <div className="flex items-start gap-3">
                        <FaLeaf className="text-[#70942e] mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                        <div>
                          <h3 className="text-[#5a4e2d] font-semibold text-sm sm:text-base flex items-center gap-2">
                            {faq.question}
                            <FaCheckCircle className="text-[#70942e] text-xs sm:text-sm" />
                          </h3>
                          <p className="text-[#5a4e2d] text-xs sm:text-sm mt-1">{faq.answer}</p>
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
                className="flex items-center justify-between w-full text-base sm:text-lg font-medium text-[#5a4e2d] mb-3 sm:mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaCommentDots className="text-[#70942e] w-5 h-5" /> Feedback/Suggestions
                </span>
                {expandedSections.feedbackSuggestions ? (
                  <FaAngleUp className="text-[#70942e] w-5 h-5" />
                ) : (
                  <FaAngleDown className="text-[#70942e] w-5 h-5" />
                )}
              </div>
              {expandedSections.feedbackSuggestions && (
                <div className="space-y-4 pl-2 sm:pl-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all resize-y"
                        placeholder="Share your feedback or suggestions"
                        rows="3 sm:rows-4"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#70942e] text-white rounded-lg hover:bg-[#7fa834] transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default HelpAndSupport;