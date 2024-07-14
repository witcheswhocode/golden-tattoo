import React from "react";

const Red = () => {
  return (
    <div className="relative w-16 h-16 flex justify-center items-center">
      <svg
        viewBox="0 0 512 512"
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Background white fill */}
          <path
            d="M314.56,48S291.78,56,256,56s-58.56-8-58.56-8a31.94,31.94,0,0,0-10.57,1.8L32,104l16.63,88,48.88,5.52A24,24,0,0,1,118.8,222.1L112,464H400l-6.8-241.9a24,24,0,0,1,21.29-24.58L463.37,192,480,104,325.13,49.8A31.94,31.94,0,0,0,314.56,48Z"
            fill="#FFFFFF"
            stroke="none"
          />
          <path
            d="M333.31,52.66a80,80,0,0,1-154.62,0"
            fill="#FFFFFF"
            stroke="none"
          />
          {/* Foreground black stroke */}
          <path
            d="M314.56,48S291.78,56,256,56s-58.56-8-58.56-8a31.94,31.94,0,0,0-10.57,1.8L32,104l16.63,88,48.88,5.52A24,24,0,0,1,118.8,222.1L112,464H400l-6.8-241.9a24,24,0,0,1,21.29-24.58L463.37,192,480,104,325.13,49.8A31.94,31.94,0,0,0,314.56,48Z"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
          <path
            d="M333.31,52.66a80,80,0,0,1-154.62,0"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </g>
      </svg>
      <p className="absolute text-red">EW</p>
    </div>
  );
};

export default Red;
