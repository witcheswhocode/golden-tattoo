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
    <div className={`fixed bottom-0 left-0 w-full bg-gray-200 p-4`}>
      <div
        className={`space-between cursor-pointer ${
          isExpanded ? `border-b-2 border-gray-600` : ""
        }`}
        onClick={toggleExpansion}
      >
        <h2 className="text-lg font-semibold">Selected Bracelets</h2><span className="">{count ? count : 0}</span>
      </div>
      <div
        className={`overflow-hidden transition-max-height ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4">{isExpanded && children}</div>
      </div>
    </div>
  );
};

export default ExpandableDiv;
