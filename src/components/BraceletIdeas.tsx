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
    [key: string]: { value: number; active: boolean };
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

  const letterTotal = Object.keys(letters).reduce((total, letter) => {
    return total + letters[letter];
  }, 0);
  const [lettersLeft, setLettersLeft] = useState<number>(letterTotal);

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

    console.log('setting avail letters')
    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };

  const handleDecrement = (id: string) => {
    if (braceletQuantities[id].value === 0) {
      return;
    }

    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: { value: prevQuantities[id].value - 1, active: true }, // Assuming you want to decrement the value
    }));

    setBraceletSelection((prevSelection) => {
      const updatedSelection = {
        ...(prevSelection || {}),
        [id]: prevSelection && prevSelection[id] ? prevSelection[id] - 1 : 0,
      };

      // Remove entry if value is 0
      if (updatedSelection[id] === 0) {
        delete updatedSelection[id];
        console.log("delete");
      }

      return updatedSelection;
    });

    const updatedLetters = id
      .replace(/[^A-Z0-9]/gi, "")
      .split("")
      .reduce((acc: any, c) => {
        if (availableLetters.hasOwnProperty(c.toLowerCase())) {
          acc[c.toLowerCase()] =
            ((acc[c.toLowerCase()]
              ? acc[c.toLowerCase()]
              : availableLetters[c.toLowerCase()]) || 0) + 1;
        }
        return acc;
      }, {});

      console.log('setting avail letters dec')
    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };

  useEffect(() => {
    console.log(availableLetters);
    setBraceletQuantities((prevBraceletQuantities) => {
      let prev = { ...prevBraceletQuantities };
      Object.keys(prev).forEach((key) => {
        let temp = key.replace(" ", "").length;
        Object.keys(availableLetters).forEach((letter) => {
          const num = (key.toLowerCase().match(letter) || []).length; // number of times the letter shows up in the word
          const countLetters = availableLetters[letter]; // number of available letter
          if (num !== 0 && countLetters === 0) { // word had the letter, letter count does not have any
            prev[key].active = false;
            //console.log(letter)
          } else if (num > countLetters) { // word has more letters than the letter count
            prev[key].active = false;
            //console.log(letter);
          } else if (num > 0 && countLetters >= num) { // word has more than one of the letters, the letter count has more than the word needs
            //console.log('here3', key, letter, num, countLetters)
            temp = temp - num;
            console.log(key, temp, num)
            if (temp === 0) {
              console.log(key, temp)
              prev[key].active = true;
            }
          }
        });
      });
      console.log(prev)
      return prev;
    });

    let newTotalLetter = 0;
    Object.keys(availableLetters).forEach((letter) => {
      newTotalLetter = newTotalLetter + availableLetters[letter];
    });
    setLettersLeft(newTotalLetter);
  }, [availableLetters]);

  return (
    <div className="p-4">
      <div className="flex">
        {availableLetters &&
          Object.entries(availableLetters).map(([id, quantity]) => (
            <div className="flex" key={`${id}-letter`}>
              {id} - {quantity}&nbsp;
            </div>
          ))}
        <div>
          Used letters: {letterTotal - lettersLeft} --- Total letters:{" "}
          {letterTotal}
        </div>
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
              disabled={braceletQuantities[bracelet].value === 0}
              className={`bg-red-500 text-white p-2 rounded-l ${
                braceletQuantities[bracelet].active &&
                braceletQuantities[bracelet].value !== 0
                  ? ""
                  : "cursor-not-allowed"
              }`}
            >
              -
            </button>
            <span className="px-4">{braceletQuantities[bracelet].value}</span>
            <button
              onClick={() => handleIncrement(bracelet)}
              disabled={!braceletQuantities[bracelet].active}
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
