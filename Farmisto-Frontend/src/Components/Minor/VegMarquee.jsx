import React from "react";
import Marquee from "react-fast-marquee";

const VegMarquee = () => {
    const vegs = [
        { name: "Carrots", img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fycm90c3xlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Broccoli", img: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Corn", img: "https://plus.unsplash.com/premium_photo-1667047165840-803e47970128?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29ybnxlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Zucchini", img: "https://images.pexels.com/photos/3375263/pexels-photo-3375263.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Onion", img: "https://images.pexels.com/photos/7129153/pexels-photo-7129153.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Tomato", img: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Pepper", img: "https://images.pexels.com/photos/221140/pexels-photo-221140.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Cucumber", img: "https://images.pexels.com/photos/1691180/pexels-photo-1691180.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Mushroom", img: "https://images.pexels.com/photos/1249884/pexels-photo-1249884.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Spinach", img: "https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Cilantro", img: "https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg?auto=compress&cs=tinysrgb&w=600" }
      ];
      

  return (
    <div className="h-[40vh] w-full flex items-center justify-center mb-10">
      <Marquee
        pauseOnHover={true}
        gradient={false}
        speed={60}
        direction="right"
        className="h-60 w-full flex items-center justify-center"
      >
        {vegs.map((item, index) => (
          <div
            key={index}
            className="h-52 w-48 mx-2 bg-green-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-110 relative"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.img})`,
              }}
            />

            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white font-bold text-xl">{item.name}</h2>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default VegMarquee;
