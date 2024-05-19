import React, { useState } from "react";

interface TabsProps {
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full">
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <button
                key={index}
                className={`${
                  index === activeTab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } px-4 py-2 mr-2 rounded-t-lg`}
                onClick={() => setActiveTab(index)}
              >
                {child.props.label}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className="bg-gray-100 p-4 rounded-b-lg">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;