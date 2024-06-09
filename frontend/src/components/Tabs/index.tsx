import React, { useState } from "react";
import { useTheme } from "../ThemeContext";

interface TabsProps {
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const { theme } = useTheme();
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
                    ? `font-semibold border-2 border-${theme}-tabBorder bg-${theme}-tabActive text-${theme}-tabTextActive`
                    : `border-2 border-${theme}-tabBorder bg-${theme}-tabInactive text-${theme}-tabTextInactive`
                } px-4 py-2 w-full rounded-t-lg`}
                onClick={() => setActiveTab(index)}
              >
                {child.props.label}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className={`bg-${theme}-panel p-4 rounded-b-lg`}>
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
