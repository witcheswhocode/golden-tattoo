export function preprocessWords(wordList, letterDict) {
  const validWords = [];

  for (const word of wordList) {
    if (canConstruct(word["word"], letterDict)) {
      validWords.push(word["word"]);
    }
  }
  return validWords;
}

function letterCounter(word) {
  let data = new Map();
  for (let letter of word) {
    if (!data[letter]) {
      data[letter] = 1;
    } else {
      data[letter] += 1;
    }
  }
  return data;
}

function cleanWord(word) {
  return word.replaceAll(" ", "").replaceAll(",", "").replaceAll("'", "");
}

export function canConstruct(word, letterDict) {
  const wordCount = letterCounter(cleanWord(word.toLowerCase()));
  for (let [letter, value] in wordCount) {
    if (wordCount[letter] <= letterDict[letter]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
export function findLongestCombinations(words, letterDict) {
  let maxCombinations = 0;
  const letterCounts = { ...letterDict };
  const combinationsList = [];

  for (const word of words) {
    if (canConstruct(word, letterDict)) {
      maxCombinations += 1;
      combinationsList.push(word);
      for (const letter of word) {
        letterCounts[letter] -= 1;
        //if (letterCounts[letter] === 0) {
        //  delete letterCounts[letter];
        //}
      }
    }
  }
  return [maxCombinations, combinationsList, letterCounts];
}

export function findBestCombination(words, letterCounts) {
  let bestSolution = [];
  let bestCount = 0;
  let allSolutions = [];
  const MAX_SOLUTIONS = 20; // Limit the number of solutions to store

  function backtrackIterative() {
    const stack = [
      { index: 0, solution: [], letterCounts: { ...letterCounts } },
    ];

    while (stack.length > 0) {
      const { index, solution, letterCounts } = stack.pop();

      if (index === words.length) {
        const count = countLettersUsed(solution);
        if (count > bestCount) {
          bestCount = count;
          bestSolution = solution.slice();
        }
        continue;
      }

      const word = words[index];
      if (canFormWord(word, letterCounts)) {
        const newLetterCounts = updateLetterCounts(word, { ...letterCounts });
        const newSolution = [...solution, word];

        if (newSolution.length > 1) {
          allSolutions.push(newSolution);
          if (allSolutions.length > MAX_SOLUTIONS) {
            pruneSolutions();
          }
        }

        stack.push({
          index: index + 1,
          solution: newSolution,
          letterCounts: newLetterCounts,
        });
      }

      stack.push({ index: index + 1, solution, letterCounts });
    }
  }

  function pruneSolutions() {
    allSolutions.sort((a, b) => {
      const totalA = a.join("").length;
      const totalB = b.join("").length;
      if (totalA === totalB) {
        return b.length - a.length;
      }
      return totalB - totalA;
    });

    allSolutions = allSolutions.slice(0, MAX_SOLUTIONS);
  }

  backtrackIterative();

  return findTheBests(allSolutions);

  function findTheBests(allSolutions) {
    const arrayTotals = allSolutions.map((array) => array.join("").length);

    allSolutions.sort((a, b) => {
      const totalA = a.join("").length;
      const totalB = b.join("").length;

      if (totalA === totalB) {
        return b.length - a.length;
      }

      return totalB - totalA;
    });

    const firstItems = [];
    firstItems.push(allSolutions[0]);
    const totalCharacters = allSolutions[0].join("").length;
    for (let i = 1; i < allSolutions.length; i++) {
      if (arrayTotals[i] === totalCharacters) {
        firstItems.push(allSolutions[i]);
      } else {
        break;
      }
    }

    const maxItems = Math.max(
      ...allSolutions.map((solution) => solution.length)
    );

    const maxItemsSolutions = allSolutions.filter(
      (solution) => solution.length === maxItems
    );

    return { firstItems: firstItems, mostBraceletOptions: maxItemsSolutions };
  }

  function canFormWord(word, letterCounts) {
    const wordLetters = word.replace(/\s/g, "").toLowerCase();
    const countsCopy = { ...letterCounts };

    for (let char of wordLetters) {
      if (!countsCopy[char] || countsCopy[char] === "0") {
        return false;
      }
      countsCopy[char] = String(Number(countsCopy[char]) - 1);
    }

    return true;
  }

  function updateLetterCounts(word, letterCounts) {
    const countsCopy = { ...letterCounts };

    for (let char of word.replace(/\s/g, "").toLowerCase()) {
      if (countsCopy[char] && countsCopy[char] !== "0") {
        countsCopy[char] = String(Number(countsCopy[char]) - 1);
      }
    }

    return countsCopy;
  }

  function countLettersUsed(solution) {
    const letterCounts = {};

    for (let word of solution) {
      for (let char of word) {
        letterCounts[char] = (letterCounts[char] || 0) + 1;
      }
    }

    let totalCount = 0;
    for (let count of Object.values(letterCounts)) {
      totalCount += count;
    }

    return totalCount;
  }
}
