import React from "react";

const ShimmeringStars: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="bg-gray-200 rounded-full w-16 h-16 animate-pulse"
        id="stars-group-1"
      ></div>
      <div
        className="bg-gray-200 rounded-full w-16 h-16 animate-pulse"
        id="stars-group-2"
      ></div>
      <div
        className="bg-gray-200 rounded-full w-16 h-16 animate-pulse"
        id="stars-group-3"
      ></div>
      <div
        className="bg-gray-200 rounded-full w-16 h-16 animate-pulse"
        id="stars-group-4"
      ></div>
      <div
        className="bg-gray-200 rounded-full w-16 h-16 animate-pulse"
        id="stars-group-5"
      ></div>
      <div
        className="bg-gray-200 rounded-full w-16 h-16 animate-pulse"
        id="stars-group-6"
      ></div>
    </div>
  );
};

export default ShimmeringStars;
