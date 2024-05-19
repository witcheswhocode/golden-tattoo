import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database(
  "/Users/liz/Documents/GitHub/taylor-lyrics/public/data/TS_liz.db"
);

app.get("/words", (req, res) => {
  db.all("select * from word", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/getLyrics/:id", (req, res, next) => {
  var id = req.params.id;

  var sql =
    "select l.lyricid as lyricid,l.lyric as lyric,l.subtext as subtext,l.lyrichtml as lyrichtml,w.categories";
  sql =
    sql +
    ",a.album as album,a.albumshort as albumshort,a.alb as alb,s.song as song ";
  sql = sql + "from lyrics l join album a on a.albumid = l.albumid ";
  sql = sql + "join word w on w.wordid = l.wordid ";
  sql = sql + "join song s on s.songid = l.songid ";
  sql = sql + "where l.wordid = " + id + " order by a.albumid desc";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});
app.get("/getWriters", (req, res, next) => {
  const id = req.params.id;

  const sql =
    "SELECT * FROM song s JOIN album a ON s.albumid = a.albumid ORDER BY albumid DESC, songid";
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/getAllCombinations", (data, res, next) => {
  var sql = "select * from bracelets";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const wordList = rows;
    const letterCounts = data.query;
    const validWords = preprocessWords(wordList, letterCounts);
    const [maxCombinations, combinationsList, finalLetterCounts] =
      findLongestCombinations(validWords, letterCounts);

    const [ mostLettersUsed, mostBraceletOptions ] = findBestCombination(
      validWords,
      letterCounts
    );

    res.json({
      message: "success",
      data: {
        combinationList: combinationsList,
        mostLettersUsed: mostLettersUsed,
        mostBraceletOptions: mostBraceletOptions,
      },
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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

function canConstruct(word, letterDict) {
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

function preprocessWords(wordList, letterDict) {
  const validWords = [];
  for (const word of wordList) {
    if (canConstruct(word["word"], letterDict)) {
      validWords.push(word["word"]);
      //console.log(word['word']);
    }
  }
  return validWords;
}

function findLongestCombinations(words, letterDict) {
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

export default function findBestCombination(words, letterCounts) {
  let bestSolution = [];
  let bestCount = 0;
  let allSolutions = [];
  let mostOptions = "";
  let mostUsedLetters = "";
  let currentWord = "";

  function backtrack(index, solution = [], letterCounts, words) {
    //console.log(letterCounter, words)
    if (index === words.length) {
      const count = countLettersUsed(solution);
      if (count > bestCount) {
        bestCount = count;
        bestSolution = solution.slice(); // Make a copy of the solution
      }
      return;
    }

    const word = words[index];
    if (canFormWord(word, letterCounts)) {
      // Update letter counts
      const newLetterCounts = updateLetterCounts(word, { ...letterCounts });
      const newSolution = [...solution, word];

      if (newSolution.length > 1) {
        allSolutions.push(newSolution);
      }
      // Recursive call
      backtrack(index + 1, newSolution, newLetterCounts, words);
    }

    // Recursive call without using the current word
    backtrack(index + 1, solution, letterCounts, words);
  }

  // Initialize the function with index 0
  backtrack(0, [], letterCounts, words);

  return findTheBests(allSolutions);
  //return allSolutions.sort((a, b) => b.length - a.length);
  function findTheBests(allSolutions) {
    // find most letters used in combinations
    // Calculate the total number of characters in each array
    const arrayTotals = allSolutions.map((array) => array.join("").length);

    // Sort the array of arrays based on the totals and lengths
    allSolutions.sort((a, b) => {
      const totalA = a.join("").length;
      const totalB = b.join("").length;

      // If totals are equal, sort by the number of elements (length of the array)
      if (totalA === totalB) {
        return a.length - b.length;
      }

      // Otherwise, sort by the totals in descending order
      return totalB - totalA;
    });

    // Retrieve the first item (and multiple if there is a tie)
    const firstItems = [allSolutions[0]];
    const totalCharacters = allSolutions[0].join("").length;

    for (let i = 1; i < allSolutions.length; i++) {
      if (arrayTotals[i] === totalCharacters) {
        firstItems.push(allSolutions[i]);
      } else {
        break; // Stop when encountering the first non-tie
      }
    }

    let mostBracelets = [];

    // Find the maximum number of items in any solution
    const maxItems = Math.max(
      ...allSolutions.map((solution) => solution.length)
    );

    // Retrieve the solutions with the maximum number of items
    const maxItemsSolutions = allSolutions.filter(
      (solution) => solution.length === maxItems
    );

    return firstItems, maxItemsSolutions;
  }

  function canFormWord(word, letterCounts) {
    const wordLetters = word.replace(/\s/g, "").toLowerCase(); // Remove spaces and convert to lowercase
    const countsCopy = { ...letterCounts }; // Make a copy of the letter counts

    for (let char of wordLetters) {
      if (!countsCopy[char] || countsCopy[char] === "0") {
        return false; // If a required letter is not available or its count is zero, return false
      }
      countsCopy[char] = String(Number(countsCopy[char]) - 1); // Decrease the count of the letter
    }

    return true;
  }

  function updateLetterCounts(word, letterCounts) {
    const countsCopy = { ...letterCounts }; // Make a copy of the letter counts

    for (let char of word.replace(/\s/g, "").toLowerCase()) {
      if (countsCopy[char] && countsCopy[char] !== "0") {
        countsCopy[char] = String(Number(countsCopy[char]) - 1); // Decrease the count of the letter
      }
    }

    return countsCopy;
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

    return bestSolution;
  }
}
