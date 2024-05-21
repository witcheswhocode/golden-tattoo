import React, { useState, useEffect } from "react";

interface LetterCountProps {
  availableLetters: { [key: string]: number };
  letterTotal: number;
  lettersLeft: number;
}

const LetterCount: React.FC<LetterCountProps> = ({ availableLetters, letterTotal, lettersLeft }) => {
  return (
    <div className="p-4">
      <div>Letter count:</div>
      <div className="flex">
        {availableLetters &&
          Object.entries(availableLetters).map(([id, quantity]) => (
            <div className="w-8">
              <div
                className="flex justify-center items-center"
                key={`${id}-letter`}
              >
                {id.toUpperCase()}
              </div>
              <div
                className="flex justify-center items-center"
                key={`${id}-quantity`}
              >
                {quantity}
              </div>
            </div>
          ))}
      </div>

      <div>
        Used letters: {letterTotal - lettersLeft} --- Total letters:{" "}
        {letterTotal}
      </div>
    </div>
  );
};

export default LetterCount;
