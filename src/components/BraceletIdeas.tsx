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
        acc[c.toLowerCase()] = ((acc[c.toLowerCase()] ? acc[c.toLowerCase()] : availableLetters[c.toLowerCase()]) || 0) - 1;
        return acc;
      }, {});

    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };

  useEffect(() => {
    setBraceletQuantities((prevBraceletQuantities) => {
      const bq = { ...prevBraceletQuantities };
      console.log(prevBraceletQuantities, availableLetters)
      Object.keys(availableLetters).forEach((letter) => {
        Object.keys(bq).forEach((key) => {
          const num = (key.match(letter) || []).length;
          const countLetters = availableLetters[letter];
          bq[key].active = num < countLetters;
          if(!bq[key].active){
            console.log(false, key, letter, num, countLetters)
          }
        });
      });
  
      console.log(bq); // Log the updated bq object
  
      return bq; // Return the updated bq object
    });
  }, [availableLetters]);
  
  
  useEffect(() => {
    console.log(braceletQuantities);
  }, [braceletQuantities]);
  

  const handleDecrement = (id: string) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]:
        prevQuantities[id].value > 0
          ? { value: prevQuantities[id].value - 1, active: true }
          : { value: 0, active: false },
    }));

    setBraceletSelection((prevSelection) => ({
      ...(prevSelection || {}), // Use an empty object as a default if prevQuantities is null
      [id]: prevSelection && prevSelection[id] ? prevSelection[id] - 1 : 0,
    }));

    for (const c of id.replace(/[^A-Z0-9]/gi, "")) {
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
      {availableLetters &&
        Object.entries(availableLetters).map(([id, quantity]) => (
          <div className="flex">
            {id} - {quantity}
          </div>
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
        <div
          key={bracelet}
          className={`flex items-center justify-between mb-4 ${
            braceletQuantities[bracelet].active ? "" : "bg-red"
          }`}
        >
          <span className="text-lg">{bracelet}-{(braceletQuantities[bracelet].active).toString()}</span>
          <div className="flex items-center">
            <button
              onClick={() => handleDecrement(bracelet)}
              className="bg-red-500 text-white p-2 rounded-l"
            >
              -
            </button>
            <span className="px-4">{braceletQuantities[bracelet].value}</span>
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
