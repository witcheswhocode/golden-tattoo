import fs from "fs";
import sqlite3 from "sqlite3";
import { parse } from "json2csv";
import { preprocessWords, findBestCombination, findMaxLetterUsage, findMaxLetterUsageAscending, findMaxLetterUsageWithStartingWord, getNumOfLettersTotal } from "./helper.js";

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

const increments = [1, 2];

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
