import React, { useState } from "react";

interface ExpandableDivProps {
  children: React.ReactNode;
}

const ExpandableDiv: React.FC<ExpandableDivProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 p-4">
      <div
        className={`cursor-pointer ${
          isExpanded ? "border-b-2 border-gray-600" : ""
        }`}
        onClick={toggleExpansion}
      >
        <h2 className="text-lg font-semibold">Title</h2>
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
