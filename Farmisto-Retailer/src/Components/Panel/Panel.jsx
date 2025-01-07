import React from 'react';

const Panel = () => {
  return (
    <div className="py-12 px-6">
      <div className="max-w-screen-lg mx-auto text-center">
        <div className="relative flex items-center justify-center gap-6">
          <div className="absolute w-56 h-56 rounded-full overflow-hidden left-2 bottom-[30%] border-4 border-white shadow-lg ">
            <img
              src="https://plus.unsplash.com/premium_photo-1668446124029-9a55e3455b69?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cow"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[60%]">
            <h2 className="text-8xl text-center font-bold leading-tight mb-4">
              Lilly <br />
              <span className="italic font-normal">Daisy</span>
              <br />
              Ruby <br /> Minnie <br /> Ginger
            </h2>
            <p className="text-gray-700 text-lg">
              Meet our beauties, connect with nature, and enjoy the calmness
              that comes from being around these magnificent animals.
            </p>
          </div>
          <div className="absolute w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg right-5 bottom-[60%]">
            <img
              src="https://cdn.pixabay.com/photo/2013/12/28/19/28/cow-234835_1280.jpg"
              alt="Cow"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;



