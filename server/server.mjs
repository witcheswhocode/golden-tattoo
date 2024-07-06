import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { createPool } from "generic-pool";
import {
  preprocessWords,
  findBestCombination,
  findLongestCombinations,
} from "./helper.js";

// Create a connection pool for SQLite
const factory = {
  create: () => new sqlite3.Database("./server/TS_liz_new.db"),
  destroy: (db) => db.close(),
};

const pool = createPool(factory, { max: 10, min: 2 });

function clearRequestTimeout(timeoutId) {
  clearTimeout(timeoutId);
}

const timeoutMiddleware = (req, res, next) => {
  const timeoutDuration = 10000; // 10 seconds timeout for example
  const timeout = setTimeout(() => {
    res.status(408).json({
      error: "Request timed out",
      data: {
        mostLettersUsed: [["Temporarily disabled, sorry! "]],
        mostBraceletOptions: [["Temporarily disabled, sorry! "]],
      },
    });
  }, timeoutDuration);

  // Attach the timeout handler to the response object
  res.on("finish", () => clearTimeout(timeout));
  next();
};

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://golden.tattoo/"
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

app.use(timeoutMiddleware); // Apply the timeout middleware globally or per route

// Track the current request's cancellation status
let currentRequest = { cancel: false };

// Middleware to reset cancellation flag for each new request
app.use((req, res, next) => {
  currentRequest.cancel = true; // Cancel any ongoing request
  currentRequest = { cancel: false }; // Create a new request context
  next();
});

// Serve the built frontend files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Custom middleware to set Content-Type for specific file types
function setContentType(req, res, next) {
  const contentTypeMap = {
    ".png": "image/png",
    // Add more file types as needed
  };

  // Get the file extension
  const extname = path.extname(req.url);

  // Set Content-Type header if it's a known file type
  if (contentTypeMap[extname]) {
    res.type(contentTypeMap[extname]);
  }

  next();
}

// Middleware to set Content-Type based on file extension
app.use("/assets", setContentType);

// Serve static files from the 'frontend/build/assets' directory
app.use(
  "/assets",
  express.static(path.join(__dirname, "../frontend/build/assets"))
);

app.get("/getBestBraceletCombos", async (req, res) => {
  try {
    console.log("Received query parameters:", req.query);

    const options = req.query["options"]; // Adjust this according to your actual request format

    // Function to fetch data from the database
    const fetchWords = () => {
      return new Promise((resolve, reject) => {
        pool
          .acquire()
          .then((db) => {
            const sql = buildSQLQuery(options); // Use options directly
            console.log(sql);
            const params = [];
            db.all(sql, params, (err, rows) => {
              pool.release(db); // Release the connection back to the pool
              if (err) {
                reject(err);
                return;
              }
              resolve(rows);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    // Check for cancellation and fetch data
    if (currentRequest.cancel) {
      throw new Error("Request canceled");
    }

    const wordList = await fetchWords(); // Await the promise result
    console.log(wordList);

    const letterCounts = req.query; // Adjust this according to your actual request format

    // Sum up all letter counts
    const totalWorkload = Object.values(letterCounts).reduce(
      (acc, count) => acc + Number(count),
      0
    );

    // Check if the total workload exceeds the threshold
    if (totalWorkload > 100) {
      return res.status(400).json({
        error: "workload too large",
        data: {
          mostLettersUsed: [["Temporarily disabled, sorry! "]],
          mostBraceletOptions: [["Temporarily disabled, sorry! "]],
        },
      });
    }

    // Preprocess and find best combination
    const validWords = preprocessWords(wordList, letterCounts);
    const bestOf = findBestCombination(validWords, letterCounts);

    // Check for cancellation again before responding
    if (currentRequest.cancel) {
      throw new Error("Request canceled");
    }

    res.json({
      message: "success",
      data: {
        mostLettersUsed: bestOf.firstItems,
        mostBraceletOptions: bestOf.mostBraceletOptions,
      },
    });
  } catch (err) {
    console.error("Error processing request:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/words", (req, res) => {
  pool
    .acquire()
    .then((db) => {
      db.all("select * from word order by wordid", (err, rows) => {
        pool.release(db); // Release the connection back to the pool
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/getLyrics/:id", (req, res, next) => {
  const id = req.params.id;

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
  l.wordid = ?
ORDER BY 
  CASE WHEN a.albumid > 99 THEN 1 ELSE 0 END, 
  a.albumid DESC
  `;

  const params = [id];

  pool
    .acquire()
    .then((db) => {
      db.all(sql, params, (err, rows) => {
        pool.release(db); // Release the connection back to the pool
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/getWriters", (req, res, next) => {
  const sql = `
    SELECT * 
    FROM song s 
    JOIN album a ON s.albumid = a.albumid 
    ORDER BY albumid DESC, songid
  `;
  const params = [];

  pool
    .acquire()
    .then((db) => {
      db.all(sql, params, (err, rows) => {
        pool.release(db); // Release the connection back to the pool
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

function buildSQLQuery(options) {
  let whereConditions = [];

  // Construct the SELECT statement
  const selectClause = `SELECT *`;

  // Construct the FROM clause (assuming the table name is 'bracelets')
  const fromClause = "FROM bracelets b";

  if (!options) {
    var sqlQuery = "SELECT * FROM bracelets b";
  } else {
    // Check if options include 'explicit' or 'acronym'
    if (options.includes("kids")) {
      whereConditions.push("b.kids = 'TRUE'");
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

app.get("/getBraceletIdeas", (data, res, next) => {
  const sql = buildSQLQuery(data.query["options"]);
  delete data.query["options"];

  const params = [];

  pool
    .acquire()
    .then((db) => {
      db.all(sql, params, (err, rows) => {
        pool.release(db); // Release the connection back to the pool
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        const wordList = rows;
        const letterCounts = data.query;
        const validWords = preprocessWords(wordList, letterCounts);
        const [maxCombinations, combinationsList, finalLetterCounts] =
          findLongestCombinations(validWords, letterCounts);

        res.json({
          message: "success",
          data: {
            combinationList: combinationsList,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// html for any other routes to enable SPA behavior
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Gracefully handle process termination
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server terminated");
    pool.drain().then(() => pool.clear());
  });
});
