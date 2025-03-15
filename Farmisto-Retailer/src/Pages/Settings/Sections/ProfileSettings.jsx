import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaLock,
  FaHome,
  FaCity,
  FaMapPin,
  FaGlobe,
  FaCamera,
  FaEdit,
} from "react-icons/fa";
import axios from "../../../utils/axios";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    farmerProfilePhoto: null,
    farmerMobile: "",
    farmerPassword: "",
    farmerAddress: "",
    farmerCity: "",
    farmerStateZip: "",
    farmerCountry: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [editFields, setEditFields] = useState({
    farmerName: false,
    farmerMobile: false,
    farmerPassword: false,
    farmerAddress: false,
    farmerCity: false,
    farmerStateZip: false,
    farmerCountry: false,
    farmerProfilePhoto: false,
  });

  const fetchDefaultData = async () => {
    try {
      const response = await axios.get("/farmer/settings/profile-data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setFormData(response.data.farmer);
      setPhotoPreview(response.data.farmer.farmerProfilePhoto);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, farmerProfilePhoto: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setEditFields((prev) => ({ ...prev, farmerProfilePhoto: true }));
    }
  };

  const toggleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
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
      if (field === "farmerProfilePhoto" && formData[field] instanceof File) {
        formDataToSend.append("profilePhoto", formData[field]);
      } else {
        formDataToSend.append(field, formData[field]);
      }
    });

    try {
      const response = await axios.patch(
        "/farmer/settings/update-profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        await fetchDefaultData();
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }

    setEditFields({
      farmerName: false,
      farmerMobile: false,
      farmerPassword: false,
      farmerAddress: false,
      farmerCity: false,
      farmerStateZip: false,
      farmerCountry: false,
      farmerProfilePhoto: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#e8dab7] flex flex-col">
      <main className="flex-1 flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-4xl transform transition-all duration-300">
          <div className="text-2xl sm:text-3xl font-semibold text-[#5a4e2d] border-b-4 border-[#70942e] mb-4 sm:mb-6 tracking-tight text-center">
            Profile Settings
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <img
                  src={
                    photoPreview ||
                    formData.farmerProfilePhoto
                  }
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-[#70942e]"
                />
                <label
                  htmlFor="farmerProfilePhoto"
                  onClick={() => toggleEdit("farmerProfilePhoto")}
                  className="absolute bottom-0 right-0 bg-[#8a7a4d] text-white rounded-full p-2 cursor-pointer hover:bg-[#6f623b] transition-colors"
                >
                  <FaCamera className="w-4 h-4" />
                </label>
                <input
                  id="farmerProfilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!editFields.farmerProfilePhoto}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                  <FaUser className="text-[#70942e]" /> Full Name
                </label>
                <input
                  type="text"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  disabled={!editFields.farmerName}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                    !editFields.farmerName ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  placeholder="Your name"
                />
              </div>
              <button
                type="button"
                onClick={() => toggleEdit("farmerName")}
                className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile and Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                    <FaPhone className="text-[#70942e]" /> Mobile
                  </label>
                  <input
                    type="text"
                    name="farmerMobile"
                    value={formData.farmerMobile}
                    onChange={handleChange}
                    maxLength={10}
                    disabled={!editFields.farmerMobile}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                      !editFields.farmerMobile ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    placeholder="10-digit mobile"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggleEdit("farmerMobile")}
                  className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                    <FaLock className="text-[#70942e]" /> Password
                  </label>
                  <input
                    type="password"
                    name="farmerPassword"
                    value={formData.farmerPassword}
                    onChange={handleChange}
                    disabled={!editFields.farmerPassword}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                      !editFields.farmerPassword ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    placeholder="New password"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggleEdit("farmerPassword")}
                  className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                  <FaHome className="text-[#70942e]" /> Address
                </label>
                <input
                  type="text"
                  name="farmerAddress"
                  value={formData.farmerAddress}
                  onChange={handleChange}
                  disabled={!editFields.farmerAddress}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                    !editFields.farmerAddress ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  placeholder="Street address"
                />
              </div>
              <button
                type="button"
                onClick={() => toggleEdit("farmerAddress")}
                className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>

            {/* City and State/ZIP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                    <FaCity className="text-[#70942e]" /> City
                  </label>
                  <input
                    type="text"
                    name="farmerCity"
                    value={formData.farmerCity}
                    onChange={handleChange}
                    disabled={!editFields.farmerCity}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                      !editFields.farmerCity ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    placeholder="City name"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggleEdit("farmerCity")}
                  className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                    <FaMapPin className="text-[#70942e]" /> State & ZIP
                  </label>
                  <input
                    type="text"
                    name="farmerStateZip"
                    value={formData.farmerStateZip}
                    onChange={handleChange}
                    disabled={!editFields.farmerStateZip}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                      !editFields.farmerStateZip ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    placeholder="State, ZIP"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggleEdit("farmerStateZip")}
                  className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Country */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#5a4e2d] mb-1 flex items-center gap-2">
                  <FaGlobe className="text-[#70942e]" /> Country
                </label>
                <input
                  type="text"
                  name="farmerCountry"
                  value={formData.farmerCountry}
                  onChange={handleChange}
                  disabled={!editFields.farmerCountry}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#f5f0e1] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/30 focus:border-[#8a7a4d] transition-all ${
                    !editFields.farmerCountry ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  placeholder="Country name"
                />
              </div>
              <button
                type="button"
                onClick={() => toggleEdit("farmerCountry")}
                className="p-2 text-[#8a7a4d] hover:text-[#6f623b] transition-colors"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>

            {/* Submit Button */}
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

export default ProfileSettings;