import React from "react";
import "./styles.css";

const Work = () => {
  const images = {
    1: "https://images.pexels.com/photos/220237/pexels-photo-220237.jpeg?auto=compress&cs=tinysrgb&w=600",
    2: "https://images.template.net/wp-content/uploads/2015/09/Dark-Wallpapers.jpg",
    3: "https://images.pexels.com/photos/693857/pexels-photo-693857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    4: "https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    5: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    6: "https://images.pexels.com/photos/209695/pexels-photo-209695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    7: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  const cells = [
    { id: 1, content: "Step 1: Create an Account" },
    { id: 2, content: "HOW IT WORKS" },
    { id: 3, content: "Step 2: Add Product Details" },
    { id: 4, content: "Step 3: Set Product Price" },
    { id: 5, content: "Step 4: Manage Inventory" },
    { id: 6, content: "Step 5: Publish and Sell" },
    { id: 7, content: "Step 6: Promotes Fair Trade" },
  ];

  return (
    <div className="w-full h-[70vh] bg-[#f7f3e9] mx-auto flex flex-col justify-center items-center py-8 gap-8">
      <div
        className="svg"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath d="m485.291 129.408-224-128a10.645 10.645 0 0 0-10.581 0l-224 128a10.665 10.665 0 0 0-5.376 9.259v234.667c0 3.819 2.048 7.36 5.376 9.259l224 128c1.643.939 3.456 1.408 5.291 1.408s3.648-.469 5.291-1.408l224-128a10.665 10.665 0 0 0 5.376-9.259V138.667a10.668 10.668 0 0 0-5.377-9.259z" fill="url(&quot;#SvgjsLinearGradient4219&quot;)"/%3E%3Cdefs%3E%3ClinearGradient gradientTransform="rotate(270 0.5 0.5)" id="SvgjsLinearGradient4219"%3E%3Cstop stop-opacity="1" stop-color="rgba(234, 204, 248)" offset="0"%3E%3C/stop%3E%3Cstop stop-opacity="1" stop-color="rgba(84, 241, 183)" offset="0.4764996337890625"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="gallery flex justify-center items-center flex-wrap gap-8">
          {Object.values(images).map((img, index) => {
            return (
              <div
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="h-full w-full flex justify-center items-center bg-[#7a9f35] "
              >
                <h3
                  className={`text-center text-white font-bold ${
                    index === 1 ? "text-2xl" : "text-md"
                  }`}
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {cells[index].content}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
