import React, { useState, useRef } from "react";
import BraceletIdeas from "./components/BraceletIdeas";
import AlphabetInputs from "./components/AlphabetInputs";
import Sparkles from "src/components/Sparkles";

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

  const resultsRef = useRef<HTMLDivElement>(null);

  const [showSparkles, setShowSparkles] = useState<boolean>(false);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center">
        Bracelet Idea Generator
      </h1>

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
        resultsRef={resultsRef}
        setShowSparkles={setShowSparkles}
      />
      {combinationPossibilities && (
        <div ref={resultsRef}>
          {showSparkles && <Sparkles />}
          <BraceletIdeas
            bracelets={combinationPossibilities}
            mostLettersUsed={mostLetterCombinationPossibilities}
            mostBraceletOptions={mostBraceletCombinationPossibilities}
            letters={inputValues}
          />
        </div>
      )}
    </div>
  );
};

export default Bracelets;
