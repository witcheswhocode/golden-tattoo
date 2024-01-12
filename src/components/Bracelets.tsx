import React, { useState } from "react";
import BraceletIdeas from "./BraceletIdeas";
import AlphabetInputs from "./AlphabetInputs";

type LetterCount = { [letter: string]: number };

const Bracelets = () => {
  const [combinationPossibilities, setCombinationPossibilities] = useState<
    string[] | null
  >(null);

  const bracelets = [
    { id: 1, name: "Carrot" },
    { id: 2, name: "Broccoli" },
    { id: 3, name: "Tomato" },
    // Add more bracelet objects as needed
  ];

  function decrementLetterCounts(
    word: string,
    letterCounts: LetterCount
  ): LetterCount {
    // Create a copy of the original letterCounts to avoid modifying it directly
    const updatedLetterCounts = { ...letterCounts };

    // Loop through each letter in the word
    for (const letter of word) {
      // Check if the letter exists in the dictionary
      if (updatedLetterCounts[letter] !== undefined) {
        // Decrement the count for the letter
        updatedLetterCounts[letter]--;

        // If the count reaches 0, remove the letter from the dictionary
        if (updatedLetterCounts[letter] === 0) {
          delete updatedLetterCounts[letter];
        }
      }
    }

    return updatedLetterCounts;
  }

  // Example usage:
  const initialLetterCounts: LetterCount = {
    A: 2,
    B: 3,
    C: 1,
  };

  const updatedCounts = decrementLetterCounts("ABC", initialLetterCounts);

  console.log(updatedCounts);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">bracelet Tally</h1>
      
      <AlphabetInputs handleCombinationPossibilities={setCombinationPossibilities} />
      {combinationPossibilities && <BraceletIdeas bracelets={combinationPossibilities} />}
    </div>
  );
};

export default Bracelets;
