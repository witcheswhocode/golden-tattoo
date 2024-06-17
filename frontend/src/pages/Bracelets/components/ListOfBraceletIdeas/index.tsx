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
    <div className={`p-4 z-10`}>
      {Object.keys(braceletQuantities).map((key) => (
        <div
          key={key}
          className={`flex items-center justify-between bg-white p-2 rounded-md mb-4 z-10 ${
            braceletQuantities[key].active
              ? `text-${theme}-braceletItemText`
              : "text-slate-200"
          }`}
        >
          <span
            className={`text-sm md:text-md ${
              braceletQuantities[key].active
                ? `text-${theme}-braceletItemText`
                : "text-slate-200"
            }`}
          >
            {key}
          </span>
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
            <span
              className={`px-4 w-10 text-${theme}-braceletItemText ${
                braceletQuantities[key].active ? `text-black` : "text-slate-200"
              }`}
            >
              {braceletQuantities[key].value}
            </span>
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
