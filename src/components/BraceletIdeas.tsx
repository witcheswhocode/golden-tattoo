import React, { useState } from 'react';

interface Bracelet {
  name: string;
}

interface BraceletIdeasProps {
  bracelets: string[];
}

const BraceletIdeas: React.FC<BraceletIdeasProps> = ({ bracelets }) => {
  const [braceletQuantities, setBraceletQuantities] = useState<{ [key: string]: number }>(
    bracelets.reduce((acc: any, bracelet) => {
      acc[bracelet] = 0;
      return acc;
    }, {})
  );

  const handleIncrement = (id: string) => {
    console.log(id)
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0,
    }));
  };

  return (
    <div className="p-4">
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
