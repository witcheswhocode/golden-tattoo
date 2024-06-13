import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";

import { fileURLToPath } from "url";

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://golden-tattoo-a7c279f70d6d.herokuapp.com/"
    : "http://localhost:3000";
const port = process.env.PORT || 3001; // Use 3001 as fallback

app.use(cors());
app.use(
  cors({
    origin: apiUrl, // Replace with your frontend URL
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.use(express.json());

const db = new sqlite3.Database("./server/TS_liz_new.db");

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
  console.log("getting", id);
  const sql = `
  SELECT 
  l.lyricid AS lyricid,
  l.lyric AS lyric,
  l.lyricbefore AS lyricbefore,
  l.lyricafter AS lyricafter,
  l.subtext AS subtext,
  l.lyrichtml AS lyrichtml,
  w.categories,
  a.album AS album,
  a.albumshort AS albumshort,
  a.alb AS alb,
  s.song AS song 
FROM 
  lyrics l 
  JOIN album a ON a.albumid = l.albumid 
  JOIN word w ON w.wordid = l.wordid 
  JOIN song s ON s.songid = l.songid 
WHERE 
  l.wordid = ${id}
ORDER BY 
  CASE WHEN a.albumid > 99 THEN 1 ELSE 0 END, 
  a.albumid DESC
`;
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
function buildSQLQuery(options) {
  let whereConditions = [];

  // Construct the SELECT statement
  const selectClause = `SELECT *`;

  // Construct the FROM clause (assuming the table name is 'bracelets')
  const fromClause = "FROM bracelets b";

  if (!options) {
    var sqlQuery =
      "SELECT * FROM bracelets b WHERE b.explicit IS NULL AND b.acronyms IS NULL";
  } else {
    // Check if options include 'explicit' or 'acronym'
    if (options.includes("explicit")) {
      whereConditions.push("(b.explicit IS NULL OR b.explicit = 'TRUE')");
    } else {
      whereConditions.push("(b.explicit IS NULL)");
    }

    if (options.includes("acronyms")) {
      whereConditions.push("(b.acronyms IS NULL OR b.acronyms = 'TRUE')");
    } else {
      whereConditions.push("(b.acronyms IS NULL)");
    }

    // Construct the WHERE clause if there are conditions
    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // Combine all parts to form the final query
    var sqlQuery = `${selectClause} ${fromClause} ${whereClause}`;
  }
  return sqlQuery;
}

app.get("/getAllCombinations", (data, res, next) => {
  var sql = buildSQLQuery(data.query["options"]);
  delete data.query["options"];
  console.log(sql);
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
    //console.log(combinationsList);

    const bestOf = findBestCombination(validWords, letterCounts);
    console.log(bestOf);
    res.json({
      message: "success",
      data: {
        combinationList: combinationsList,
        mostLettersUsed: bestOf.firstItems,
        mostBraceletOptions: bestOf.mostBraceletOptions,
      },
    });
  });
});

// Serve the built frontend files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Serve index.html for any other routes to enable SPA behavior
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
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
