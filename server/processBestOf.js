import fs from "fs";
import sqlite3 from "sqlite3";
import { parse } from "json2csv";
import { preprocessWords, findBestCombination } from "./helper.js";

const buildSQLQuery = (options) => {
  return "SELECT * FROM bracelets b";
};

// Example letter counts
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

const increments = [1, 2, 3];

increments.forEach((count) => {
  // Convert letter counts to increments of 5
  Object.keys(letterCounts).forEach((letter) => {
    letterCounts[letter] = count;
  });

  // Function to fetch data from the SQLite database
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

  const processLetterCounts = async (letterCount) => {
    try {
      const wordList = await fetchWords(); // Await the promise result

      // Preprocess and find best combination
      const validWords = preprocessWords(wordList, letterCounts);
      const bestOf = findBestCombination(validWords, letterCounts);
      console.log(bestOf);

      let csvData = [];

      // Append firstItems
      bestOf.firstItems.forEach((itemArray) => {
        itemArray.forEach((word) => {
          csvData.push({
            word: word,
            letterCount: letterCount,
            type: "mostLetters",
          });
        });
      });

      // Append mostBraceletOptions
      bestOf.mostBraceletOptions.forEach((optionArray) => {
        optionArray.forEach((word) => {
          csvData.push({
            word: word,
            letterCount: letterCount,
            type: "maxBracelets",
          });
        });
      });

      const csv = parse(csvData, { header: false }); // Exclude headers

      // Append CSV data to file (without overwriting)
      fs.appendFileSync("output.csv", csv);
      console.log("CSV file has been saved.");
    } catch (err) {
      console.error("Error processing letter counts:", err.message);
    }
  };

  processLetterCounts(count);
});
