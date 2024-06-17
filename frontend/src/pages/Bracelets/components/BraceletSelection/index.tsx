import React from "react";
import { useTheme } from "src/components/ThemeContext";

interface BraceletSelectionProps {
  braceletSelection: { [key: string]: number | undefined };
  braceletQuantities: { [key: string]: { value: number; active: boolean } };
  handleDecrement: (id: string) => void;
  handleIncrement: (id: string) => void;
}

const BraceletSelection: React.FC<BraceletSelectionProps> = ({
  braceletSelection,
  braceletQuantities,
  handleDecrement,
  handleIncrement,
}) => {
  const { theme } = useTheme();
  return (
    <div className="p-4 h-1/3 overflow-scroll">
      {braceletSelection &&
        Object.entries(braceletSelection).map(([id, quantity]) => (
          <div
            key={`${id}-${quantity}`}
            className="flex items-center justify-between p-2 mb-4 rounded-md bg-white"
          >
            <span
              className={`text-sm md:text-md text-${theme}-braceletItemTextSelected`}
            >
              {id}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(id)}
                disabled={braceletQuantities[id].value === 0}
                className={`bg-${theme}-minus text-white p-2 rounded-l ${
                  braceletQuantities[id].value >= 0
                    ? ""
                    : "opacity-25 cursor-not-allowed"
                }`}
              >
                -
              </button>
              <span
                className={`px-4 w-10 text-${theme}-braceletItemTextSelected`}
              >
                {braceletSelection[id]}
              </span>
              <button
                onClick={() => handleIncrement(id)}
                disabled={!braceletQuantities[id].active}
                className={`text-sm bg-${theme}-plus text-white p-2 rounded-r ${
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
