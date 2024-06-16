import React from "react";

interface BloodMoonProps {
  theme: string;
}

const BloodMoon: React.FC<BloodMoonProps> = ({ theme }) => {
  return (
    <div
      className={`absolute flex justify-center items-center w-full ${
        theme === "midnights" ? "" : "hidden"
      }`}
    >
      {/* Moon image */}
      <div className="absolute mb-6 h-24 w-24 shadow-custom-light rounded-full z-10 bg-center bg-cover midnights-moon animate-animating-bloodmoon-properties">
        {/* Background with gradient */}
        <div className="absolute inset-0 rounded-full bloodmoon-gradient animate-bloodmoon-animation"></div>
      </div>
    </div>
  );
};

export default BloodMoon;
