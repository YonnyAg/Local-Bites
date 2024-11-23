import React from 'react';

const Banner = ({ name, image }) => {
  const placeholderImage = 'http://localhost:8000';
  return (
    <div className="relative w-full h-80 mb-8 overflow-hidden border border-black shadow-lg rounded-md">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-white">{name}</h1>
      </div>
    </div>
  );
};

export default Banner;
