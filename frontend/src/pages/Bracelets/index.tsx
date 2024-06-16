import React, { useState, useRef } from "react";
import BraceletIdeas from "./components/BraceletIdeas";
import AlphabetInputs from "./components/AlphabetInputs";
import Sparkles from "src/components/Sparkles";
import { useTheme } from "src/components/ThemeContext";
import MetaTags from "src/components/MetaTags";

type LetterCount = { [letter: string]: number };

const Bracelets = () => {
  const { theme } = useTheme();
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
    <div className={`w-full md:w-2/3 lg:w-1/2 z-10 text-${theme}-text`}>
      <MetaTags
        title="bracelets - golden tattoo"
        description="Input your bead counts into the Taylor Swift friendship bracelet generator."
        image="/assets/midnights-meta-img.png"
      />
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
