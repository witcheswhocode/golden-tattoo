import React, { useState } from "react";

interface Bracelet {
  name: string;
}

interface BraceletIdeasProps {
  bracelets: string[];
  letters: any;
}

const BraceletIdeas: React.FC<BraceletIdeasProps> = ({
  bracelets,
  letters,
}) => {
  const [braceletQuantities, setBraceletQuantities] = useState<{
    [key: string]: number;
  }>(
    bracelets.reduce((acc: any, bracelet) => {
      acc[bracelet] = 0;
      return acc;
    }, {})
  );
  const [braceletSelection, setBraceletSelection] = useState<{
    [key: string]: number;
  }>();
  const [availableLetters, setAvailableLetters] = useState<{
    [key: string]: number;
  }>(letters);

  const handleIncrement = (id: string) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));

    setBraceletSelection((prevSelection) => ({
      ...(prevSelection || {}), // Use an empty object as a default if prevQuantities is null
      [id]: prevSelection && prevSelection[id] ? prevSelection[id] + 1 : 1,
    }));

    for (const c of id.replace(/[^A-Z0-9]/ig, "")) {
      setAvailableLetters((prevAvailableLetters) => ({
        ...(prevAvailableLetters || {}), // Use an empty object as a default if prevQuantities is null
        [c]:
          prevAvailableLetters && prevAvailableLetters[c]
            ? prevAvailableLetters[c] - 1
            : 0,
      }));
    }
  };

  const handleDecrement = (id: string) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0,
    }));

    setBraceletSelection((prevSelection) => ({
      ...(prevSelection || {}), // Use an empty object as a default if prevQuantities is null
      [id]: prevSelection && prevSelection[id] ? prevSelection[id] - 1 : 0,
    }));

    for (const c of id.replace(/[^A-Z0-9]/ig, "")) {
      setAvailableLetters((prevAvailableLetters) => ({
        ...(prevAvailableLetters || {}), // Use an empty object as a default if prevQuantities is null
        [c]:
          prevAvailableLetters && prevAvailableLetters[c]
            ? prevAvailableLetters[c] + 1
            : 1,
      }));
    }
  };

  return (
    <div className="p-4">
      {availableLetters && Object.entries(availableLetters).map(([id, quantity]) => (
        <div>{id} - {quantity}</div>
      ))}
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
                className="bg-red-500 text-white p-2 rounded-l"
              >
                -
              </button>
              <span className="px-4">{braceletSelection[id]}</span>
              <button
                onClick={() => handleIncrement(id)}
                className="bg-green-500 text-white p-2 rounded-r"
              >
                +
              </button>
            </div>
          </div>
        ))}
      {!braceletSelection && <>Bracelet selections will go here.</>}
      <div className="bg-black h-0.5 m-5"></div>
      {bracelets.map((bracelet) => (
        <div key={bracelet} className="flex items-center justify-between mb-4">
          <span className="text-lg">{bracelet}</span>
          <div className="flex items-center">
            <button
              onClick={() => handleDecrement(bracelet)}
              className="bg-red-500 text-white p-2 rounded-l"
            >
              -
            </button>
            <span className="px-4">{braceletQuantities[bracelet]}</span>
            <button
              onClick={() => handleIncrement(bracelet)}
              className="bg-green-500 text-white p-2 rounded-r"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BraceletIdeas;
