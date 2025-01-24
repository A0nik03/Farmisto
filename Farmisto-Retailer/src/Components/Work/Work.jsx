import React from "react";
import {
  Event,
  Subtitle,
  Timeline,
  Title,
} from "@reactuiutils/horizontal-timeline";
import {
  FaUser,
  FaHandsHelping,
  FaClipboardList,
  FaDollarSign,
  FaBoxOpen,
  FaRocket,
} from "react-icons/fa"; // Updated icons

const Work = () => {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      subtitle: "Start by creating your account",
      icon: FaUser,
      color: "#A6C8E1",
    },
    {
      id: 2,
      title: "How It Works",
      subtitle: "Understand the workflow",
      icon: FaHandsHelping,
      color: "#FFE47A",
    },
    {
      id: 3,
      title: "Add Product Details",
      subtitle: "Provide details about your product",
      icon: FaClipboardList,
      color: "#81C784",
    },
    {
      id: 4,
      title: "Set Product Price",
      subtitle: "Define the pricing structure",
      icon: FaDollarSign,
      color: "#FFB0B0",
    },
    {
      id: 5,
      title: "Manage Inventory",
      subtitle: "Organize your stock",
      icon: FaBoxOpen,
      color: "#FFAB91",
    },
    {
      id: 6,
      title: "Publish and Sell",
      subtitle: "Make your product live",
      icon: FaRocket,
      color: "#D1C4E9",
    },
  ];

  return (
    <div className="w-full h-screen bg-[#f7f3e9] mx-auto flex rounded-t-full flex-col justify-center items-center py-8 gap-8">
      <h1 className="text-4xl font-bold mt-12 text-gray-700">
        Our Work Process
      </h1>
      <div className="h-full w-[70%] mt-10 flex items-center justify-center">
        <Timeline minEvents={6}>
          {steps.map((step) => (
            <Event
              key={step.id}
              color={step.color}
              className="relative flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-center -translate-y-28 p-2">
                <step.icon className="text-3xl text-white shadow-sm"/>
              </div>
              <Title className="text-xl font-medium text-gray-800 mt-2 text-center">
                {step.title}
              </Title>
              <Subtitle className="text-lg text-gray-600 text-center mt-2">
                {step.subtitle}
              </Subtitle>
            </Event>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default Work;
