const apiUrl = process.env.REACT_APP_API_URL;

console.log(process.env.NODE_ENV, process.env.env, process.env.REACT_APP_API_URL);

function preprocessWords(wordList, letterDict) {
  const validWords = [];

  for (const word of wordList) {
    if (canConstruct(word["word"], letterDict)) {
      validWords.push(word["word"]);
    }
  }
  return validWords;
}

// Function to find the longest combinations that can be constructed
function findLongestCombinations(words, letterDict) {
  let maxCombinations = 0;
  const letterCounts = { ...letterDict };
  const combinationsList = [];

  for (const word of words) {
    if (canConstruct(word, letterDict)) {
      maxCombinations++;
      combinationsList.push(word);
      for (const letter of word) {
        letterCounts[letter]--;
      }
    }
  }
  return [maxCombinations, combinationsList, letterCounts];
}

// Function to count letters in a word using Map
function letterCounter(word) {
  const data = new Map();
  for (let letter of word) {
    data.set(letter, (data.get(letter) || 0) + 1);
  }
  return data;
}

// Function to clean word from unnecessary characters
function cleanWord(word) {
  return word.replace(/\s|,|'/g, "");
}

// Function to check if a word can be constructed with given letter counts
function canConstruct(word, letterDict) {
  const wordCount = letterCounter(cleanWord(word.toLowerCase()));
  for (let [letter, count] of wordCount) {
    if (count > letterDict[letter]) {
      return false;
    }
  }
  return true;
}

// Function to find the best combinations based on letter counts
function findBestCombination(words, letterCounts) {
  let bestSolution = [];
  let bestCount = 0;
  let allSolutions = [];
  const MAX_SOLUTIONS = 20;

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
    const wordLetters = cleanWord(word).toLowerCase();
    const countsCopy = { ...letterCounts };

    for (let char of wordLetters) {
      if (!countsCopy[char] || countsCopy[char] === 0) {
        return false;
      }
      countsCopy[char]--;
    }

    return true;
  }

  function updateLetterCounts(word, letterCounts) {
    const countsCopy = { ...letterCounts };

    for (let char of cleanWord(word).toLowerCase()) {
      if (countsCopy[char] && countsCopy[char] !== 0) {
        countsCopy[char]--;
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

function findMaxLetterUsage(letterCounts, words) {
  // Function to count letters in a word
  function countLetters(word) {
    let counts = {};
    for (let letter of word) {
      if (letter.match(/[a-zA-Z]/)) {
        // Only consider alphabetic characters
        letter = letter.toLowerCase();
        counts[letter] = (counts[letter] || 0) + 1;
      }
    }
    return counts;
  }

  // Sort words by their length in descending order
  words.sort(
    (a, b) =>
      b.replace(/[^a-zA-Z]/g, "").length - a.replace(/[^a-zA-Z]/g, "").length
  );

  let result = [];
  let remainingLetters = { ...letterCounts };

  for (let obj of words) {
    let word = obj;
    let letterFrequency = countLetters(word);
    let canBeFormed = true;

    // Check if word can be formed with remaining letters
    for (let letter in letterFrequency) {
      if (letterFrequency[letter] > (remainingLetters[letter] || 0)) {
        canBeFormed = false;
        break;
      }
    }

    // If the word can be formed, update the remaining letter counts and add to the result
    if (canBeFormed) {
      for (let letter in letterFrequency) {
        remainingLetters[letter] -= letterFrequency[letter];
      }
      result.push(word);
    }
  }

  return result;
}

function findMaxLetterUsageAscending(letterCounts, words) {
  // Function to count letters in a word
  function countLetters(word) {
    let counts = {};
    for (let letter of word) {
      if (letter.match(/[a-zA-Z]/)) {
        // Only consider alphabetic characters
        letter = letter.toLowerCase();
        counts[letter] = (counts[letter] || 0) + 1;
      }
    }
    return counts;
  }

  // Sort words by their length in ascending order
  words.sort(
    (a, b) =>
      a.replace(/[^a-zA-Z]/g, "").length - b.replace(/[^a-zA-Z]/g, "").length
  );

  let result = [];
  let remainingLetters = { ...letterCounts };

  for (let obj of words) {
    let word = obj;
    let letterFrequency = countLetters(word);
    let canBeFormed = true;

    // Check if word can be formed with remaining letters
    for (let letter in letterFrequency) {
      if (letterFrequency[letter] > (remainingLetters[letter] || 0)) {
        canBeFormed = false;
        break;
      }
    }

    // If the word can be formed, update the remaining letter counts and add to the result
    if (canBeFormed) {
      for (let letter in letterFrequency) {
        remainingLetters[letter] -= letterFrequency[letter];
      }
      result.push(word);
    }
  }

  return result;
}

function findMaxLetterUsageWithStartingWord(letterCounts, words) {
  function countLetters(word) {
    let counts = {};
    for (let letter of word) {
      if (letter.match(/[a-zA-Z]/)) {
        letter = letter.toLowerCase();
        counts[letter] = (counts[letter] || 0) + 1;
      }
    }
    return counts;
  }

  function canFormWord(word, remainingLetters) {
    let letterFrequency = countLetters(word);
    for (let letter in letterFrequency) {
      if (letterFrequency[letter] > (remainingLetters[letter] || 0)) {
        return false;
      }
    }
    return true;
  }

  function updateRemainingLetters(word, remainingLetters) {
    let letterFrequency = countLetters(word);
    for (let letter in letterFrequency) {
      remainingLetters[letter] -= letterFrequency[letter];
    }
  }

  function findMaxUsageFromStart(startIndex) {
    let result = [];
    let remainingLetters = { ...letterCounts };

    // Start with the given starting word
    let startingWord = words[startIndex];
    if (canFormWord(startingWord, remainingLetters)) {
      updateRemainingLetters(startingWord, remainingLetters);
      result.push(startingWord);

      // Continue with the rest of the words in descending order of length
      let sortedWords = words
        .slice(0, startIndex)
        .concat(words.slice(startIndex + 1))
        .sort(
          (a, b) =>
            b.replace(/[^a-zA-Z]/g, "").length -
            a.replace(/[^a-zA-Z]/g, "").length
        );

      for (let obj of sortedWords) {
        let word = obj;
        if (canFormWord(word, remainingLetters)) {
          updateRemainingLetters(word, remainingLetters);
          result.push(word);
        }
      }
    }

    return result;
  }

  let optimalList = [];
  let maxUsedLetters = 0;

  for (let i = 0; i < words.length; i++) {
    let currentList = findMaxUsageFromStart(i);
    let usedLettersCount = currentList
      .join("")
      .replace(/[^a-zA-Z]/g, "").length;

    if (usedLettersCount > maxUsedLetters) {
      maxUsedLetters = usedLettersCount;
      optimalList = currentList;
    }
  }

  return optimalList;
}

const getNumOfLettersTotal = (bracelets) => {
  let count = 0;
  bracelets.forEach((bracelet) => {
    count = count + bracelet.length;
  });
  return count;
};

function getOptimizedLists(letterCounts, wordList) {
  const ret = findMaxLetterUsage(letterCounts, wordList);
  const ret2 = findMaxLetterUsageAscending(letterCounts, wordList);
  const ret3 = findMaxLetterUsageWithStartingWord(letterCounts, wordList);
  return {
    desc: { words: ret, count: getNumOfLettersTotal(ret) },
    asc: { words: ret2, count: getNumOfLettersTotal(ret2) },
    any: { words: ret3, count: getNumOfLettersTotal(ret3) },
  };
}

module.exports = {
  preprocessWords,
  findLongestCombinations,
  getOptimizedLists,
  apiUrl,
};
