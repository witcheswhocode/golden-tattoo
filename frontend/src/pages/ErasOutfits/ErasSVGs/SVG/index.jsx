const SVG = ({ children }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      className="w-16 h-16"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default SVG;
