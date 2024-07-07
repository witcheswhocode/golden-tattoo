const sqlite3 = require("sqlite3");
const { preprocessWords, findLongestCombinations, getOptimizedLists } = pkg;

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

// Process each increment asynchronously
const processIncrements = async () => {
  for (const count of increments) {
    const wordList = await fetchWords();

    Object.keys(letterCounts).forEach((letter) => {
      letterCounts[letter] = count;
    });

    //await processLetterCounts(count, letterCounts, wordList);
    const ret = getOptimizedLists(letterCounts, wordList);
  }
};

processIncrements()
  .then(() => {
    console.log("All increments processed successfully.");
  })
  .catch((err) => {
    console.error("Error processing increments:", err.message);
  });
