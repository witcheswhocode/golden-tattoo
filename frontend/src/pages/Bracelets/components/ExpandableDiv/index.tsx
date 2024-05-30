import React, { useState } from "react";
import { useTheme } from "src/components/ThemeContext";

interface ExpandableDivProps {
  children: React.ReactNode;
  count: number | undefined;
}

const ExpandableDiv: React.FC<ExpandableDivProps> = ({ children, count }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="z-10 fixed bottom-0 left-0 w-full p-4 bg-white shadow-lg">
      <div
        className={`flex justify-between items-center cursor-pointer bg-white ${
          isExpanded ? "border-b-2 border-gray-600" : ""
        }`}
        onClick={toggleExpansion}
      >
        <h2 className="text-lg font-semibold bg-white">Selected Bracelets</h2>
        <span>{count !== undefined ? count : 0}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-screen" : "max-h-0"
        } bg-white`}
      >
        <div className="p-4 bg-white opacity-100">{children}</div>
      </div>
    </div>
  );
};

export default ExpandableDiv;
