import React from "react";

const Lover = ({ id, house, heart, roof }) => {
  const gradientId = `gradient-lover-${id}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className="w-16 h-16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          {house.map((element, index) => (
            <stop
              key={index}
              offset={`${(index / (house.length - 1)) * 100}%`}
              style={{ stopColor: element }}
            />
          ))}
        </linearGradient>
      </defs>
      <g>
        <path
          d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"
          fill={roof}
        />
        <path
          d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"
          fill={`url(#${gradientId})`}
        />
        <path
          id="heart-path"
          d="M8 8.482 C9.664 6.809 13.825 9.736 8 13.5 2.175 9.736 6.336 6.809 8 8.482"
          fill={heart}
        />
      </g>
    </svg>
  );
};

export default Lover;
