import React, { useState, useEffect } from "react";

interface LetterCountProps {
  availableLetters: { [key: string]: number };
  letterTotal: number;
  lettersLeft: number;
}

const LetterCount: React.FC<LetterCountProps> = ({
  availableLetters,
  letterTotal,
  lettersLeft,
}) => {
  return (
    <div className="p-1 mb-3 border border-black md:w-3/4 m-auto">
      <div className="w-full flex p-1 justify-between border border-black"><p className="text-sm">LETTERS LEFT</p><p className="text-sm">({lettersLeft}/{letterTotal})</p></div>
      <div className="flex w-full border border-black">
        {availableLetters &&
          Object.entries(availableLetters)
            .slice(0, 13)
            .map(([id, quantity], index) => (
              <div className="w-8 md:w-full">
                <div
                  className="flex justify-center items-center text-sm border border-black"
                  key={`${id}-letter`}
                >
                  {id.toUpperCase()}
                </div>
                <div
                  className="flex justify-center items-center text-sm border border-black"
                  key={`${id}-quantity`}
                >
                  {quantity}
                </div>
              </div>
            ))}
      </div>
      <div className="w-full flex border border-black">
        {availableLetters &&
          Object.entries(availableLetters)
            .slice(13, 26)
            .map(([id, quantity], index) => (
              <div className="w-8 md:w-full">
                <div
                  className="flex justify-center items-center text-sm border border-black"
                  key={`${id}-letter`}
                >
                  {id.toUpperCase()}
                </div>
                <div
                  className="flex justify-center items-center text-sm border border-black"
                  key={`${id}-quantity`}
                >
                  {quantity}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LetterCount;
