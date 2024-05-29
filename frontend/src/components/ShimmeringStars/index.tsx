import React from "react";
import Stars3 from "./components/Stars3";

const ShimmeringStars: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Stars3 />
    </div>
  );
};

export default ShimmeringStars;
