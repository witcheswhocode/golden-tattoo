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
    <div className={`${isExpanded ? 'h-3/4' : ''} z-90 fixed bottom-0 left-0 w-full p-4 bg-${theme}-bottomExpander shadow-lg md:w-3/4 md:left-auto`}>
      <div
        className={`flex justify-between items-center cursor-pointer`}
        onClick={toggleExpansion}
      >
        <h2 className={`text-lg font-semibold text-${theme}-bottomExpanderTextHeader`}>Selected Bracelets</h2>
        <span>{count !== undefined ? `${count} selected` : `0 selected`}</span>
        <div className={`text-${theme}-bottomExpanderTextHeader transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
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
        className={`overflow-y-scroll transition-all duration-300 ${
          isExpanded ? `h-full border-t-2 border-${theme}-bottomExpanderTextHeader mt-4` : "max-h-0"
        }`}
      >
        {count ? (
          <div className="py-4 opacity-100">{children}</div>
        ) : (
          <div className={`py-4 text-${theme}-bottomExpanderTextHeader`}>No bracelets selected.</div>
        )}
      </div>
    </div>
  );
};

export default ExpandableDiv;
