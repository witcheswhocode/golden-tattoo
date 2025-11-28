import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { createPool } from "generic-pool";
import pkg from "../frontend/src/helpers.js";
const { preprocessWords, findLongestCombinations, getOptimizedLists } = pkg;

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

const allowedOrigins = [
  "https://golden.tattoo",
  "https://golden-tattoo-staging-6a9c78f27539.herokuapp.com",
  "http://localhost:3000",
];

console.log("API URL FROM ", process.env.NODE_ENV, process.env.env);

const port = process.env.PORT || 3001; // Use 3001 as fallback

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

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
  ${Number(id) ? `l.wordid = ${Number(id)}` : `LOWER(w.word) = LOWER("${id}")`}
ORDER BY 
  CASE WHEN a.albumid > 99 THEN 1 ELSE 0 END, 
  a.albumid DESC
  `;
  
  pool
    .acquire()
    .then((db) => {
      db.all(sql, (err, rows) => {
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
