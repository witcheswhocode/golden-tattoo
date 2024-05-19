export default function findBestCombination(words, letterCounts) {
  let bestSolution = [];
  let bestCount = 0;

  function backtrack(solution, letterCounts) {
    if (words.length === 0) {
      return;
    }

    for (let word of words) {
      if (canFormWord(word, letterCounts)) {
        // Update letter counts
        const newLetterCounts = updateLetterCounts(word, { ...letterCounts });
        const newSolution = [...solution, word];

        // Recursive call
        backtrack(newSolution, newLetterCounts);

        // Check if current solution is better
        const count = countLettersUsed(newSolution);
        if (count > bestCount) {
          bestCount = count;
          bestSolution = newSolution;
        }
      }
    }
  }

  function updateLetterCounts(word, letterCounts) {
    // Update the letter counts after using the word
    const updatedCounts = { ...letterCounts }; // Make a copy of the original counts
    
    // Iterate over each character in the word
    for (let char of word.toLowerCase()) {
        // Update the count for the current character
        updatedCounts[char] = (updatedCounts[char] || 0) - 1;
    }
    
    return updatedCounts;
}


  function countLettersUsed(solution) {
    // Initialize an empty object to store the counts of each letter
    const letterCounts = {};

    // Iterate over each word in the solution
    for (let word of solution) {
      // Iterate over each character in the word
      for (let char of word) {
        // Increment the count for each letter in the letterCounts object
        letterCounts[char] = (letterCounts[char] || 0) + 1;
      }
    }

    // Calculate the total count of letters used
    let totalCount = 0;
    for (let count of Object.values(letterCounts)) {
      totalCount += count;
    }

    return totalCount;
  }

  return bestSolution;
}
