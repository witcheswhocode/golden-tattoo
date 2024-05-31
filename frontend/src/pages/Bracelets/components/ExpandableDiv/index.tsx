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
    <div className="z-10 fixed bottom-0 left-0 w-full p-4 bg-white shadow-lg md:w-3/4 md:left-auto">
      <div
        className={`flex justify-between items-center cursor-pointer bg-white`}
        onClick={toggleExpansion}
      >
        <h2 className="text-lg font-semibold bg-white">Selected Bracelets</h2>
        <span>{count !== undefined ? `${count} selected` : `0 selected`}</span>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-screen border-t-2 border-gray-600 mt-4" : "max-h-0"
        } bg-white`}
      >
        {count ? (
          <div className="py-4 bg-white opacity-100">{children}</div>
        ) : (
          <div className="py-4">No bracelets selected.</div>
        )}
      </div>
    </div>
  );
};

export default ExpandableDiv;
