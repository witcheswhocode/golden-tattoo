import fs from "fs";
import sqlite3 from "sqlite3";
import { parse } from "json2csv";
import { preprocessWords, findBestCombination } from "./helper.js";

const buildSQLQuery = (options) => {
  return "SELECT * FROM bracelets b";
};

let letterCounts = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

const increments = [1, 2, 3, 4, 5, 10, 20, 30];

const fetchWords = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./server/TS_liz_new.db");
    const sql = buildSQLQuery({});

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
};

const processLetterCounts = async (count, letterCounts, wordList) => {
  try {
    // Preprocess and find best combination
    const validWords = preprocessWords(wordList, letterCounts);
    const bestOf = findBestCombination(validWords, letterCounts);
    console.log(`Processed letter count: ${count}`);

    let csvData = [];

    // Append firstItems
    bestOf.firstItems.forEach((itemArray, index) => {
      itemArray.forEach((word) => {
        csvData.push({
          word: word,
          group: index,
          letterCount: count,
          type: "mostLetters",
        });
      });
    });

    // Append mostBraceletOptions
    bestOf.mostBraceletOptions.forEach((optionArray, index) => {
      optionArray.forEach((word) => {
        csvData.push({
          word: word,
          group: index,
          letterCount: count,
          type: "maxBracelets",
        });
      });
    });

    const csv = parse(csvData, { header: false }); // Exclude headers

    // Append CSV data to file (without overwriting)
    fs.appendFileSync("output.csv", csv + "\n"); // Add newline for each CSV entry
    console.log(`CSV data for count ${count} has been appended to output.csv.`);
  } catch (err) {
    console.error("Error processing letter counts:", err.message);
  }
};

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
      b.word.replace(/[^a-zA-Z]/g, "").length -
      a.word.replace(/[^a-zA-Z]/g, "").length
  );

  let result = [];
  let remainingLetters = { ...letterCounts };

  for (let obj of words) {
    let word = obj.word;
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
      a.word.replace(/[^a-zA-Z]/g, "").length -
      b.word.replace(/[^a-zA-Z]/g, "").length
  );

  let result = [];
  let remainingLetters = { ...letterCounts };

  for (let obj of words) {
    let word = obj.word;
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
      let startingWord = words[startIndex].word;
      if (canFormWord(startingWord, remainingLetters)) {
        updateRemainingLetters(startingWord, remainingLetters);
        result.push(startingWord);
  
        // Continue with the rest of the words in descending order of length
        let sortedWords = words
          .slice(0, startIndex)
          .concat(words.slice(startIndex + 1))
          .sort((a, b) => b.word.replace(/[^a-zA-Z]/g, '').length - a.word.replace(/[^a-zA-Z]/g, '').length);
  
        for (let obj of sortedWords) {
          let word = obj.word;
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
      let usedLettersCount = currentList.join('').replace(/[^a-zA-Z]/g, '').length;
  
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

// Process each increment asynchronously
const processIncrements = async () => {
  for (const count of increments) {
    const wordList = await fetchWords();

    Object.keys(letterCounts).forEach((letter) => {
      letterCounts[letter] = count;
    });

    //await processLetterCounts(count, letterCounts, wordList);
    const ret = findMaxLetterUsage(letterCounts, wordList);
    console.log(count)
    console.log("desc", ret, getNumOfLettersTotal(ret));

    const ret2 = findMaxLetterUsageAscending(letterCounts, wordList);
    console.log("asc", ret2, getNumOfLettersTotal(ret2));

    const r = findMaxLetterUsageWithStartingWord(letterCounts, wordList)
    console.log("any", r, getNumOfLettersTotal(r))
    console.log(getNumOfLettersTotal(ret),getNumOfLettersTotal(ret2), getNumOfLettersTotal(r))
  }
};

processIncrements()
  .then(() => {
    console.log("All increments processed successfully.");
  })
  .catch((err) => {
    console.error("Error processing increments:", err.message);
  });
