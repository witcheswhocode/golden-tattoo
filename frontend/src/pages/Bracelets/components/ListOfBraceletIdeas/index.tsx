import React, { useState, useEffect } from "react";
import { useTheme } from "src/components/ThemeContext";

interface Bracelet {
  name: string;
}

interface ListOfBraceletIdeasProps {
  braceletQuantities: { [key: string]: { value: number; active: boolean } };
  handleDecrement: (id: string) => void;
  handleIncrement: (id: string) => void;
}

const ListOfBraceletIdeas: React.FC<ListOfBraceletIdeasProps> = ({
  braceletQuantities,
  handleDecrement,
  handleIncrement,
}) => {
  const { theme } = useTheme();
  return (
    <div className={`p-4`}>
      {Object.keys(braceletQuantities).map((key) => (
        <div
          key={key}
          className={`flex items-center justify-between bg-white p-2 rounded-md mb-4 ${
            braceletQuantities[key].active ? "" : "opacity-25"
          }`}
        >
          <span className={`text-sm md:text-md text-${theme}-braceletItemText`}>{key}</span>
          <div className="flex items-center text-sm">
            <button
              onClick={() => handleDecrement(key)}
              disabled={braceletQuantities[key].value === 0}
              className={`text-sm bg-${theme}-minus text-white p-2 rounded-l ${
                braceletQuantities[key].active &&
                braceletQuantities[key].value !== 0
                  ? ""
                  : "cursor-not-allowed"
              }`}
            >
              -
            </button>
            <span className={`px-4 w-10 text-${theme}-braceletItemText`}>{braceletQuantities[key].value}</span>
            <button
              onClick={() => handleIncrement(key)}
              disabled={!braceletQuantities[key].active}
              className={`text-sm bg-${theme}-plus text-white p-2 rounded-r ${
                braceletQuantities[key].active ? "" : "cursor-not-allowed"
              }`}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfBraceletIdeas;
