import React, { useState, useEffect } from "react";

interface BraceletSelectionProps {
  braceletSelection: { [key: string]: number | undefined; };
  braceletQuantities: {[key: string]: { value: number; active: boolean }};
  handleDecrement: (id: string) => void;
  handleIncrement: (id: string) => void;
}

const BraceletSelection: React.FC<BraceletSelectionProps> = ({
  braceletSelection,
  braceletQuantities,
  handleDecrement,
  handleIncrement,
}) => {
  return (
    <div className="p-4">
      {braceletSelection &&
        Object.entries(braceletSelection).map(([id, quantity]) => (
          <div
            key={`${id}-${quantity}`}
            className="flex items-center justify-between mb-4"
          >
            <span className="text-lg">{id}</span>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(id)}
                disabled={braceletQuantities[id].value === 0}
                className={`bg-red-500 text-white p-2 rounded-l ${
                  braceletQuantities[id].value >= 0
                    ? ""
                    : "opacity-25 cursor-not-allowed"
                }`}
              >
                -
              </button>
              <span className="px-4">{braceletSelection[id]}</span>
              <button
                onClick={() => handleIncrement(id)}
                disabled={!braceletQuantities[id].active}
                className={`bg-green-500 text-white p-2 rounded-r ${
                  braceletQuantities[id].active
                    ? ""
                    : "opacity-25 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      {!braceletSelection && <>Bracelet selections will go here.</>}
    </div>
  );
};

export default BraceletSelection;
