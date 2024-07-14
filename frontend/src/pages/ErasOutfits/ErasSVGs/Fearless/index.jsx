const Fearless = ({ id, color }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-16 h-16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fill={color}
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </g>
    </svg>
  );
};

export default Fearless;
