import React, { useState } from 'react';

interface Vegetable {
  id: number;
  name: string;
}

interface VegetableListProps {
  vegetables: Vegetable[];
}

const VegetableList: React.FC<VegetableListProps> = ({ vegetables }) => {
  const [vegetableQuantities, setVegetableQuantities] = useState<{ [key: number]: number }>(
    vegetables.reduce((acc: any, vegetable) => {
      acc[vegetable.id] = 0;
      return acc;
    }, {})
  );

  const handleIncrement = (id: number) => {
    setVegetableQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setVegetableQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0,
    }));
  };

  return (
    <div className="p-4">
      {vegetables.map((vegetable) => (
        <div key={vegetable.id} className="flex items-center justify-between mb-4">
          <span className="text-lg">{vegetable.name}</span>
          <div className="flex items-center">
            <button
              onClick={() => handleDecrement(vegetable.id)}
              className="bg-red-500 text-white p-2 rounded-l"
            >
              -
            </button>
            <span className="px-4">{vegetableQuantities[vegetable.id]}</span>
            <button
              onClick={() => handleIncrement(vegetable.id)}
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

export default VegetableList;
