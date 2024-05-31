import React, { useState } from "react";
import BraceletIdeas from "./components/BraceletIdeas";
import AlphabetInputs from "./components/AlphabetInputs";

type LetterCount = { [letter: string]: number };

const Bracelets = () => {
  const [combinationPossibilities, setCombinationPossibilities] = useState<
    string[] | null
  >(null);
  const [
    mostLetterCombinationPossibilities,
    setMostLetterCombinationPossibilities,
  ] = useState<string[][] | null>(null);

  const [
    mostBraceletCombinationPossibilities,
    setMostBraceletCombinationPossibilities,
  ] = useState<string[][] | null>(null);
  
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center">Bracelet Idea Generator</h1>

      <AlphabetInputs
        handleCombinationPossibilities={setCombinationPossibilities}
        handleMostLetterCombinationPossibilities={
          setMostLetterCombinationPossibilities
        }
        handleMostBraceletCombinationPossibilities={
          setMostBraceletCombinationPossibilities
        }
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
      {combinationPossibilities && (
        <BraceletIdeas
          bracelets={combinationPossibilities}
          mostLettersUsed={mostLetterCombinationPossibilities}
          mostBraceletOptions={mostBraceletCombinationPossibilities}
          letters={inputValues}
        />
      )}
    </div>
  );
};

export default Bracelets;
