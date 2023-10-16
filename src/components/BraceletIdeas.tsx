import React, { useState } from 'react';

interface Bracelet {
  id: number;
  name: string;
}

interface BraceletIdeasProps {
  bracelets: Bracelet[];
}

const BraceletIdeas: React.FC<BraceletIdeasProps> = ({ bracelets }) => {
  const [braceletQuantities, setBraceletQuantities] = useState<{ [key: number]: number }>(
    bracelets.reduce((acc: any, bracelet) => {
      acc[bracelet.id] = 0;
      return acc;
    }, {})
  );

  const handleIncrement = (id: number) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0,
    }));
  };

  return (
    <div className="p-4">
      {bracelets.map((bracelet) => (
        <div key={bracelet.id} className="flex items-center justify-between mb-4">
          <span className="text-lg">{bracelet.name}</span>
          <div className="flex items-center">
            <button
              onClick={() => handleDecrement(bracelet.id)}
              className="bg-red-500 text-white p-2 rounded-l"
            >
              -
            </button>
            <span className="px-4">{braceletQuantities[bracelet.id]}</span>
            <button
              onClick={() => handleIncrement(bracelet.id)}
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
