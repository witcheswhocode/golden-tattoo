import React from "react";
import Stars from "./components/Stars";

const ShimmeringStars: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Stars />
    </div>
  );
};

export default ShimmeringStars;
