import React, { useState, useEffect } from "react";
import LetterCount from "../LetterCount";
import BraceletSelection from "../BraceletSelection";

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
  return (
    <div className="p-4">
      {Object.keys(braceletQuantities).map((key) => (
        <div
          key={key}
          className={`flex items-center justify-between mb-4 ${
            braceletQuantities[key].active ? "" : "opacity-25"
          }`}
        >
          <span className="text-lg">{key}</span>
          <div className="flex items-center">
            <button
              onClick={() => handleDecrement(key)}
              disabled={braceletQuantities[key].value === 0}
              className={`bg-red-500 text-white p-2 rounded-l ${
                braceletQuantities[key].active &&
                braceletQuantities[key].value !== 0
                  ? ""
                  : "cursor-not-allowed"
              }`}
            >
              -
            </button>
            <span className="px-4 w-10">{braceletQuantities[key].value}</span>
            <button
              onClick={() => handleIncrement(key)}
              disabled={!braceletQuantities[key].active}
              className={`bg-green-500 text-white p-2 rounded-r ${
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
