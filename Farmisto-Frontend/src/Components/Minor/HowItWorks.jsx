import React from 'react';

const HowItWorks = ({ images }) => {
  return (
    <div className="grid gap-[10px] m-[calc(150px+10px)]">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className="w-[150px] aspect-[1.15] object-cover clip-polygon transition-transform transform hover:scale-110 hover:filter-none filter grayscale-[80%] cursor-pointer"
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%)',
            transform: 'translate(var(--_x,0),var(--_y,0)) scale(var(--_t,1))',
          }}
        />
      ))}
    </div>
  );
};

export default HowItWorks;
