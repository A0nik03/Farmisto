import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCreditCard,
  FaBuilding,
  FaMoneyCheckAlt,
  FaEdit,
  FaWallet,
  FaHistory,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import axios from "axios";

const PaymentSettings = () => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    upiId: "",
    paymentGateway: "",
  });

  const [editFields, setEditFields] = useState({
    accountHolderName: false,
    accountNumber: false,
    bankName: false,
    ifscCode: false,
    upiId: false,
    paymentGateway: false,
  });

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    bankDetails: true,
    upiIntegration: false,
    paymentGatewaySettings: false,
    transactionHistory: false,
  });

  const fetchDefaultData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/farmer/settings/payment-data",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setFormData(response.data.payment || {});
      setTransactionHistory(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToUpdate = Object.keys(formData).filter(
      (field) => editFields[field]
    );

    if (fieldsToUpdate.length === 0) {
      alert("No fields selected for update.");
      return;
    }

    const formDataToSend = new FormData();
    fieldsToUpdate.forEach((field) => {
      formDataToSend.append(field, formData[field]);
    });

    try {
      const response = await axios.patch(
        "http://localhost:4000/farmer/settings/update-payment",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Payment settings updated successfully");
        await fetchDefaultData();
      } else {
        alert("Failed to update payment settings");
      }
    } catch (error) {
      console.error("Error updating payment settings:", error);
      alert("Error updating payment settings");
    }

    setEditFields({
      accountHolderName: false,
      accountNumber: false,
      bankName: false,
      ifscCode: false,
      upiId: false,
      paymentGateway: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#e8dab7] flex flex-col">
      <main className="h-full flex justify-center items-center">
        <div className="p-6 h-screen w-full transform transition-all duration-300 hover:shadow-lg">
          <div className="text-3xl w-1/4 font-semibold text-[#5a4e2d] border-b-4 border-[#70942e] mb-2 tracking-tight">
            <p className="text-center mb-2">Payment Settings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            <div>
              <div
                onClick={() => toggleSection("bankDetails")}
                className="flex items-center justify-between w-full text-lg font-medium text-[#5a4e2d] mb-2 transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <span>Bank Details</span>
                {expandedSections.bankDetails ? (
                  <FaAngleUp className="text-[#70942e]" />
                ) : (
                  <FaAngleDown className="text-[#70942e]" />
                )}
              </div>
              {expandedSections.bankDetails && (
                <div className="space-y-4 pl-4">
                  {/* Account Holder Name */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                        <FaUser className="text-[#70942e]" /> Account Holder Name
                      </label>
                      <input
                        type="text"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        disabled={!editFields.accountHolderName}
                        className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                          !editFields.accountHolderName ? "cursor-not-allowed opacity-75" : ""
                        }`}
                        placeholder="Account holder name"
                      />
                    </div>
                    <div
                      type="button"
                      onClick={() => toggleEdit("accountHolderName")}
                      className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.1]"
                    >
                      <FaEdit className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                        <FaCreditCard className="text-[#70942e]" /> Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        disabled={!editFields.accountNumber}
                        className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                          !editFields.accountNumber ? "cursor-not-allowed opacity-75" : ""
                        }`}
                        placeholder="Bank account number"
                      />
                    </div>
                    <div
                      type="button"
                      onClick={() => toggleEdit("accountNumber")}
                      className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.1]"
                    >
                      <FaEdit className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bank Name and IFSC Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                          <FaBuilding className="text-[#70942e]" /> Bank Name
                        </label>
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          disabled={!editFields.bankName}
                          className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                            !editFields.bankName ? "cursor-not-allowed opacity-75" : ""
                          }`}
                          placeholder="Bank name"
                        />
                      </div>
                      <div
                        type="button"
                        onClick={() => toggleEdit("bankName")}
                        className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.1]"
                      >
                        <FaEdit className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                          <FaMoneyCheckAlt className="text-[#70942e]" /> IFSC Code
                        </label>
                        <input
                          type="text"
                          name="ifscCode"
                          value={formData.ifscCode}
                          onChange={handleChange}
                          disabled={!editFields.ifscCode}
                          className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                            !editFields.ifscCode ? "cursor-not-allowed opacity-75" : ""
                          }`}
                          placeholder="IFSC code"
                        />
                      </div>
                      <div
                        type="button"
                        onClick={() => toggleEdit("ifscCode")}
                        className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.1]"
                      >
                        <FaEdit className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* UPI Integration */}
            <div>
            <div
                onClick={() => toggleSection("upiIntegration")}
                className="flex items-center justify-between w-full text-lg font-medium text-[#5a4e2d] mb-2 transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <span>UPI Integration</span>
                {expandedSections.upiIntegration ? (
                  <FaAngleUp className="text-[#70942e]" />
                ) : (
                  <FaAngleDown className="text-[#70942e]" />
                )}
              </div>
              {expandedSections.upiIntegration && (
                <div className="space-y-4 pl-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                        <FaCreditCard className="text-[#70942e]" /> UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        disabled={!editFields.upiId}
                        className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                          !editFields.upiId ? "cursor-not-allowed opacity-75" : ""
                        }`}
                        placeholder="UPI ID (e.g., name@bank)"
                      />
                    </div>
                    <div
                      type="button"
                      onClick={() => toggleEdit("upiId")}
                      className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.1]"
                    >
                      <FaEdit className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Gateway Settings */}
            <div>
              <div
                onClick={() => toggleSection("paymentGatewaySettings")}
                className="flex items-center justify-between w-full text-lg font-medium text-[#5a4e2d] mb-2 transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <span>Payment Gateway Settings</span>
                {expandedSections.paymentGatewaySettings ? (
                  <FaAngleUp className="text-[#70942e]" />
                ) : (
                  <FaAngleDown className="text-[#70942e]" />
                )}
              </div>
              {expandedSections.paymentGatewaySettings && (
                <div className="space-y-4 pl-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                        <FaWallet className="text-[#70942e]" /> Payment Gateway
                      </label>
                      <input
                        type="text"
                        name="paymentGateway"
                        value={formData.paymentGateway}
                        onChange={handleChange}
                        disabled={!editFields.paymentGateway}
                        className={`w-full px-4 py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                          !editFields.paymentGateway ? "cursor-not-allowed opacity-75" : ""
                        }`}
                        placeholder="e.g., Razorpay, Stripe"
                      />
                    </div>
                    <div
                      onClick={() => toggleEdit("paymentGateway")}
                        className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.1]"
                    >
                      <FaEdit className="w-5 h-5 text-inherit" />
                    </div>
                  </div>
                </div>
              )}
            </div>


            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#70942e] text-white rounded-lg hover:bg-[#7fa834] transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentSettings;