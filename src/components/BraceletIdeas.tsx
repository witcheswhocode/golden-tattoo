import React, { useState, useEffect } from "react";

interface Bracelet {
  name: string;
}

interface BraceletIdeasProps {
  bracelets: string[];
  letters: { [key: string]: number };
}

const BraceletIdeas: React.FC<BraceletIdeasProps> = ({
  bracelets,
  letters,
}) => {
  const [braceletQuantities, setBraceletQuantities] = useState<{
    [key: string]: { value: number; active: Boolean };
  }>(
    bracelets.reduce((acc: any, bracelet) => {
      acc[bracelet] = { value: 0, active: true };
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
      [id]: { value: prevQuantities[id].value + 1, active: true },
    }));

    setBraceletSelection((prevSelection) => ({
      ...(prevSelection || {}), // Use an empty object as a default if prevQuantities is null
      [id]: prevSelection && prevSelection[id] ? prevSelection[id] + 1 : 1,
    }));

    const updatedLetters = id
      .replace(/[^A-Z0-9]/gi, "")
      .split("")
      .reduce((acc: any, c) => {
        acc[c.toLowerCase()] =
          ((acc[c.toLowerCase()]
            ? acc[c.toLowerCase()]
            : availableLetters[c.toLowerCase()]) || 0) - 1;
        return acc;
      }, {});

    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };

  const handleDecrement = (id: string) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: { value: prevQuantities[id].value - 1, active: true }, // Assuming you want to decrement the value
    }));
  
    setBraceletSelection((prevSelection) => ({
      ...(prevSelection || {}),
      [id]: prevSelection && prevSelection[id] ? prevSelection[id] - 1 : 0, // Assuming you want to decrement the value
    }));
  
    const updatedLetters = id
      .replace(/[^A-Z0-9]/gi, "")
      .split("")
      .reduce((acc: any, c) => {
        acc[c.toLowerCase()] =
          ((acc[c.toLowerCase()]
            ? acc[c.toLowerCase()]
            : availableLetters[c.toLowerCase()]) || 0) + 1; // Assuming you want to increment the count
        return acc;
      }, {});
  
    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };
  

  useEffect(() => {
    setBraceletQuantities((prevBraceletQuantities) => {
      let prev = { ...prevBraceletQuantities };
      Object.keys(prev).forEach((key) => {
        Object.keys(availableLetters).forEach((letter) => {
          const num = (key.match(letter) || []).length;
          const countLetters = availableLetters[letter];
          prev[key].active = (countLetters === 0 && num !== 0) ? false : num <= countLetters;
          if (!prev[key].active) {
            console.log(false, key, letter, num, countLetters);
          }
        });
      });
      console.log(prev)
      return prev;
    });
  }, [availableLetters]);

  return (
    <div className="p-4">
      <div className="flex">
        {availableLetters &&
          Object.entries(availableLetters).map(([id, quantity]) => (
            <div className="flex">
              {id} - {quantity}&nbsp;
            </div>
          ))}
      </div>

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
                className={`bg-red-500 text-white p-2 rounded-l ${
                  braceletQuantities[id].value === 0 ? "" : "opacity-25 cursor-not-allowed"
                }`}
              >
                -
              </button>
              <span className="px-4">{braceletSelection[id]}</span>
              <button
                onClick={() => handleIncrement(id)}
                className={`bg-green-500 text-white p-2 rounded-r ${
                  braceletQuantities[id].active ? "" : "opacity-25 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      {!braceletSelection && <>Bracelet selections will go here.</>}
      <div className="bg-black h-0.5 m-5"></div>
      {bracelets.map((bracelet) => (
        <div
          key={bracelet}
          className={`flex items-center justify-between mb-4 ${
            braceletQuantities[bracelet].active ? "" : "opacity-25"
          }`}
        >
          <span className="text-lg">
            {bracelet}-{braceletQuantities[bracelet].active.toString()}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => handleDecrement(bracelet)}
              className={`bg-red-500 text-white p-2 rounded-l ${
                braceletQuantities[bracelet].active && braceletQuantities[bracelet].value !== 0 ? "" : "opacity-25 cursor-not-allowed"
              }`}
            >
              -
            </button>
            <span className="px-4">{braceletQuantities[bracelet].value}</span>
            <button
              onClick={() => handleIncrement(bracelet)}
              className={`bg-green-500 text-white p-2 rounded-r ${
                braceletQuantities[bracelet].active ? "" : "cursor-not-allowed"
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

export default BraceletIdeas;
