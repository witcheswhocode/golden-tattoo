const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('/Users/liz/Documents/GitHub/taylor-lyrics/public/data/TS_liz.db');

app.get('/users', (req: any, res: any) => {
  db.all('select * from word', (err: any, rows: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
