const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('/Users/liz/Documents/GitHub/taylor-lyrics/public/data/TS_liz.db');

app.get('/words', (req: any, res: any) => {
  db.all('select * from word', (err: any, rows: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/getLyrics/:id", (req: any, res: any, next: any) => {
  var id = req.params.id;
  
  var sql = "select l.lyricid as lyricid,l.lyric as lyric,l.subtext as subtext,l.lyrichtml as lyrichtml,w.categories";
  sql = sql + ",a.album as album,a.albumshort as albumshort,a.alb as alb,s.song as song ";
  sql = sql + "from lyrics l join album a on a.albumid = l.albumid ";
  sql = sql + "join word w on w.wordid = l.wordid ";
  sql = sql + "join song s on s.songid = l.songid ";
  sql = sql + "where l.wordid = "+id+" order by a.albumid desc";
  var params: any = []
  db.all(sql, params, (err: any, rows: any) => {
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
app.get("/getWriters", (req: any, res: any, next: any) => {
  const id = req.params.id;

  const sql = "SELECT * FROM song s JOIN album a ON s.albumid = a.albumid ORDER BY albumid DESC, songid";
  const params: any[] = [];

  db.all(sql, params, (err: any, rows: any) => {
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

app.get("/getAllCombinations", (data: any, res: any, next: any) => {
  var sql = "select * from bracelets"
  var params: any[] = []
  db.all(sql, params, (err: any, rows: any) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      const wordList = rows;
      //console.log(rows);
      const letterCounts = data.query;
      console.log(letterCounts);
      const validWords = preprocessWords(wordList, letterCounts);
      const [maxCombinations, combinationsList, finalLetterCounts] = findLongestCombinations(validWords, letterCounts);
  
      //console.log("Longest list of words that can be made:");
      //console.log(combinationsList);
      //console.log("Number of combinations:", maxCombinations);
      //console.log("Final Letter Count:", finalLetterCounts);

      res.json({
          "message":"success",
          "data":{'combinationList': combinationsList, 'maxCombinations': maxCombinations}
      })
    });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function letterCounter(word: string): Map<string, number> {
  let data = new Map<string, number>();
  for (let letter of word) {
    if (!data.has(letter)) {
      data.set(letter, 1);
    } else {
      let count = data.get(letter)!;
      data.set(letter, count + 1);
    }
  }
  return data;
}

function cleanWord(word: string): string {
  return word.replaceAll(' ', '').replaceAll(',', '').replaceAll('\'', '');
}

function canConstruct(word: string, letterDict: any | Map<string, number> | { [key: string]: number }): boolean {
  const wordCount = letterCounter(cleanWord(word.toLowerCase()));
  console.log(word, wordCount, letterDict);

  for (const [letter, value] of wordCount.entries()) {
    let dictValue: number;
    
    if (typeof letterDict === 'object' && letterDict !== null) {
      dictValue = (letterDict as { [key: string]: number })[letter] || 0;
    } else if (letterDict instanceof Map) {
      dictValue = letterDict.get(letter) || 0;
    } else {
      throw new Error('Unsupported type for letterDict');
    }

    if (value <= dictValue) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}




function preprocessWords(wordList: { word: string }[], letterDict: Map<string, number>): string[] {
  const validWords: string[] = [];
  for (const wordObj of wordList) {
    const word = wordObj.word;
    if (canConstruct(word, letterDict)) {
      validWords.push(word);
    }
  }
  return validWords;
}

function findLongestCombinations(words: string[], letterDict: Map<string, number> | { [key: string]: number }): [number, string[], Map<string, number>] {
  let maxCombinations = 0;
  const letterCounts = new Map<string, number>(Object.entries(letterDict));
  const combinationsList: string[] = [];

  for (const word of words) {
    if (canConstruct(word, letterDict)) {
      maxCombinations += 1;
      combinationsList.push(word);
      for (const letter of word) {
        let count = letterCounts.get(letter)!;
        letterCounts.set(letter, count - 1);
      }
    }
  }

  return [maxCombinations, combinationsList, letterCounts];
}



function findBestCombination(dictionary: string[], letterCounts: Map<string, number>): string[] {
  let bestCombination: string[] = [];
  let bestScore = 0;

  function calculateScore(words: string[]): number {
    let score = 0;
    for (const word of words) {
      for (const letter of word) {
        if (letterCounts.get(letter)) {
          score += 1;
        }
      }
    }
    return score;
  }

  function exploreCombination(words: string[], currentScore: number, currentIndex: number): void {
    if (currentIndex >= dictionary.length) {
      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestCombination = [...words];
      }
      return;
    }

    exploreCombination(words, currentScore, currentIndex + 1);

    const newWord = dictionary[currentIndex];
    let canUseWord = true;
    const wordCounts: Map<string, number> = new Map();

    for (const letter of newWord) {
      if (!letterCounts.get(letter)) {
        canUseWord = false;
        break;
      }
      wordCounts.set(letter, (wordCounts.get(letter) || 0) + 1);
      if (wordCounts.get(letter)! > letterCounts.get(letter)!) {
        canUseWord = false;
        break;
      }
    }

    if (canUseWord) {
      for (const [letter, count] of wordCounts) {
        let currentCount = letterCounts.get(letter)!;
        letterCounts.set(letter, currentCount - count);
      }
      exploreCombination([...words, newWord], currentScore + 1, currentIndex + 1);
      for (const [letter, count] of wordCounts) {
        let currentCount = letterCounts.get(letter)!;
        letterCounts.set(letter, currentCount + count);
      }
    }
  }

  exploreCombination([], 0, 0);
  return bestCombination;
}
