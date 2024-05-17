import React, { useState } from "react";
import BraceletIdeas from "./BraceletIdeas";
import AlphabetInputs from "./AlphabetInputs";

type LetterCount = { [letter: string]: number };

const Bracelets = () => {
  const [combinationPossibilities, setCombinationPossibilities] = useState<
    string[] | null
  >(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">bracelet Tally</h1>

      <AlphabetInputs
        handleCombinationPossibilities={setCombinationPossibilities} inputValues={inputValues} setInputValues={setInputValues}
      />
      {combinationPossibilities && (
        <BraceletIdeas bracelets={combinationPossibilities.slice(0, 3)} letters={inputValues} />
      )}
    </div>
  );
};

export default Bracelets;
