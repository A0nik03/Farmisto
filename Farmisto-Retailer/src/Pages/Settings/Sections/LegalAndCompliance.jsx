import React, { useState } from "react";
import {
  FaFileContract,
  FaShieldAlt,
  FaTasks,
  FaAngleDown,
  FaAngleUp,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";

const LegalAndCompliance = () => {
  const [expandedSections, setExpandedSections] = useState({
    termsOfService: true,
    privacyPolicy: false,
    complianceChecklist: false,
  });

  const termsOfService = [
    {
      title: "Control Over Produce",
      content:
        "As a farmer on Farmisto, you have full authority to set prices, manage inventory, and decide which produce to sell directly to consumers.",
    },
    {
      title: "Payment Terms",
      content:
        "Profits are transferred weekly or monthly to your designated bank account or UPI ID, as set in Payment Settings. Farmisto ensures payment is collected from consumers before shipping.",
    },
    {
      title: "Order Cancellation",
      content:
        "You may cancel orders before shipment through the Order Management section. Cancellations after shipment are subject to Farmisto’s refund policy.",
    },
  ];

  const privacyPolicy = [
    {
      title: "Data Collection",
      content:
        "Farmisto collects your name, contact details, and payment information to facilitate transactions and communication with consumers.",
    },
    {
      title: "Data Usage",
      content:
        "Your data is used to process orders, track profits, and improve our services. We do not sell your personal information to third parties.",
    },
    {
      title: "Data Security",
      content:
        "We implement industry-standard encryption to protect your information. You can update or delete your data via the Admin Panel.",
    },
  ];

  const complianceChecklist = [
    {
      title: "Accurate Produce Listings",
      content:
        "Ensure all produce details (e.g., quantity, quality, price) are accurate to comply with consumer protection laws.",
    },
    {
      title: "Timely Order Fulfillment",
      content:
        "Ship orders within the timelines promised to consumers to maintain trust and meet Farmisto’s service standards.",
    },
    {
      title: "Tax Compliance",
      content:
        "You are responsible for reporting your earnings to local tax authorities. Farmisto provides profit summaries to assist with this.",
    },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-[#e8dab7] flex flex-col">
      <main className="flex-1 flex justify-center items-start p-4 sm:p-6">
        <div className="w-full max-w-4xl transform transition-all duration-300 hover:shadow-lg">
          <div className="text-2xl sm:text-3xl font-semibold text-[#5a4e2d] border-b-4 border-[#70942e] mb-4 sm:mb-6 tracking-tight text-center">
            Legal & Compliance
          </div>

          <div className="space-y-6">
            {/* Terms of Service */}
            <div>
              <div
                onClick={() => toggleSection("termsOfService")}
                className="flex items-center justify-between w-full text-base sm:text-lg font-medium text-[#5a4e2d] mb-3 sm:mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaFileContract className="text-[#70942e] w-5 h-5" /> Terms of Service
                </span>
                {expandedSections.termsOfService ? (
                  <FaAngleUp className="text-[#70942e] w-5 h-5" />
                ) : (
                  <FaAngleDown className="text-[#70942e] w-5 h-5" />
                )}
              </div>
              {expandedSections.termsOfService && (
                <div className="pl-2 sm:pl-4 space-y-4">
                  {termsOfService.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#f5f0e1] p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#70942e]"
                    >
                      <div className="flex items-start gap-3">
                        <FaLeaf className="text-[#70942e] mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                        <div>
                          <h3 className="text-[#5a4e2d] font-semibold text-sm sm:text-base flex items-center gap-2">
                            {item.title}
                            <FaCheckCircle className="text-[#70942e] text-xs sm:text-sm" />
                          </h3>
                          <p className="text-[#5a4e2d] text-xs sm:text-sm mt-1">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy Policy */}
            <div>
              <div
                onClick={() => toggleSection("privacyPolicy")}
                className="flex items-center justify-between w-full text-base sm:text-lg font-medium text-[#5a4e2d] mb-3 sm:mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaShieldAlt className="text-[#70942e] w-5 h-5" /> Privacy Policy
                </span>
                {expandedSections.privacyPolicy ? (
                  <FaAngleUp className="text-[#70942e] w-5 h-5" />
                ) : (
                  <FaAngleDown className="text-[#70942e] w-5 h-5" />
                )}
              </div>
              {expandedSections.privacyPolicy && (
                <div className="pl-2 sm:pl-4 space-y-4">
                  {privacyPolicy.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#f5f0e1] p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#70942e]"
                    >
                      <div className="flex items-start gap-3">
                        <FaLeaf className="text-[#70942e] mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                        <div>
                          <h3 className="text-[#5a4e2d] font-semibold text-sm sm:text-base flex items-center gap-2">
                            {item.title}
                            <FaCheckCircle className="text-[#70942e] text-xs sm:text-sm" />
                          </h3>
                          <p className="text-[#5a4e2d] text-xs sm:text-sm mt-1">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compliance Checklist */}
            <div>
              <div
                onClick={() => toggleSection("complianceChecklist")}
                className="flex items-center justify-between w-full text-base sm:text-lg font-medium text-[#5a4e2d] mb-3 sm:mb-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FaTasks className="text-[#70942e] w-5 h-5" /> Compliance Checklist
                </span>
                {expandedSections.complianceChecklist ? (
                  <FaAngleUp className="text-[#70942e] w-5 h-5" />
                ) : (
                  <FaAngleDown className="text-[#70942e] w-5 h-5" />
                )}
              </div>
              {expandedSections.complianceChecklist && (
                <div className="pl-2 sm:pl-4 space-y-4">
                  {complianceChecklist.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#f5f0e1] p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#70942e]"
                    >
                      <div className="flex items-start gap-3">
                        <FaLeaf className="text-[#70942e] mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                        <div>
                          <h3 className="text-[#5a4e2d] font-semibold text-sm sm:text-base flex items-center gap-2">
                            {item.title}
                            <FaCheckCircle className="text-[#70942e] text-xs sm:text-sm" />
                          </h3>
                          <p className="text-[#5a4e2d] text-xs sm:text-sm mt-1">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalAndCompliance;