import React, { useState, useRef, useEffect } from "react";
import BraceletIdeas from "./components/BraceletIdeas";
import AlphabetInputs from "./components/AlphabetInputs";
import Sparkles from "src/components/Sparkles";
import { useTheme } from "src/components/ThemeContext";
import { getOptimizedLists } from "../../helpers";

type LetterCount = { [letter: string]: number };

const Bracelets = () => {
  const { theme } = useTheme();
  const [combinationPossibilities, setCombinationPossibilities] = useState<
    string[] | null
  >(null);

  const [
    mostBraceletCombinationPossibilities,
    setMostBraceletCombinationPossibilities,
  ] = useState<string[][] | null>(null);

  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});

  const resultsRef = useRef<HTMLDivElement>(null);

  const [showSparkles, setShowSparkles] = useState<boolean>(false);

  useEffect(() => {
    if (inputValues && combinationPossibilities) {
      const optList: any = getOptimizedLists(
        inputValues,
        combinationPossibilities
      );
      setMostBraceletCombinationPossibilities(optList);
    }
  }, [combinationPossibilities]);

  return (
    <div className={`w-full md:w-2/3 lg:w-1/2 z-10 text-${theme}-text`}>
      {/*<MetaTags
        title="bracelets - golden tattoo"
        description="Input your bead counts into the Taylor Swift friendship bracelet generator."
        image="/assets/lover-meta-img.png"
  />*/}
      <AlphabetInputs
        handleCombinationPossibilities={setCombinationPossibilities}
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
            mostBraceletOptions={mostBraceletCombinationPossibilities}
            letters={inputValues}
          />
        </div>
      )}

      <p className="flex flex-col justify-center items-center mt-4 w-80% text-sm">
        Bracelet ideas compiled from multiple resources.{" "}
        <a
          href="/about"
          className={`internal underline text-${theme}-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
        >
          See credits on the about page.
        </a>
      </p>
    </div>
  );
};

export default Bracelets;
