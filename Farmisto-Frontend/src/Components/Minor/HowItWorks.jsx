import React from "react";

const HowItWorks = () => {
  const images = {
    1: "https://images.pexels.com/photos/220237/pexels-photo-220237.jpeg?auto=compress&cs=tinysrgb&w=600",
    2: "https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    3: "https://images.pexels.com/photos/693857/pexels-photo-693857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    4: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    5: "https://images.pexels.com/photos/209695/pexels-photo-209695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    6: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  const cells = [
    { id: 1, content: "Step 1: Connect Farmers & Consumers" },
    { id: 2, content: "Step 2: Radius-Based Matching" },
    { id: 3, content: "Step 3: Farmer Dashboard" },
    { id: 4, content: "Step 4: Retailer Section" },
    { id: 5, content: "Step 5: Farm Supply & Retailer Interaction" },
    { id: 6, content: "Step 6: Promotes Fair Trade" },
  ];

  return (
    <div className="w-[90%] h-[80vh] mx-auto flex flex-col justify-center items-center py-8 gap-8">
      {/* Heading */}
      <h1 className="text-5xl text-[#242424] font-bold mb-8">How It Works</h1>

      {/* Step Cards */}
      <div className="flex justify-center items-center flex-wrap gap-8">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="relative w-48 h-52 flex justify-center items-center text-white font-bold bg-[#0d331c] hover:scale-125 hover:rounded-xl transition-all duration-500 shadow-lg"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              backgroundImage: `url(${images[cell.id]})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="text-sm text-center">{cell.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
