import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('/Users/liz/Documents/GitHub/taylor-lyrics/public/data/TS_liz.db');

app.get('/words', (req, res) => {
  db.all('select * from word', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/getLyrics/:id", (req, res, next) => {
  var id = req.params.id;
  
  var sql = "select l.lyricid as lyricid,l.lyric as lyric,l.subtext as subtext,l.lyrichtml as lyrichtml,w.categories";
  sql = sql + ",a.album as album,a.albumshort as albumshort,a.alb as alb,s.song as song ";
  sql = sql + "from lyrics l join album a on a.albumid = l.albumid ";
  sql = sql + "join word w on w.wordid = l.wordid ";
  sql = sql + "join song s on s.songid = l.songid ";
  sql = sql + "where l.wordid = "+id+" order by a.albumid desc";
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});
app.get("/getWriters", (req, res, next) => {
  const id = req.params.id;

  const sql = "SELECT * FROM song s JOIN album a ON s.albumid = a.albumid ORDER BY albumid DESC, songid";
  const params = [];

  db.all(sql, params, (err, rows) => {
      if (err) {
          res.status(400).json({ "error": err.message });
          return;
      }
      res.json({
          "message": "success",
          "data": rows
      });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
