const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const db = new sqlite3.Database("./hadith_db.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

app.use(cors());

app.get("/getBooks", async (req, res) => {
  let sql = "SELECT * FROM 'books'";
  db.all(sql, (err, result) => {
    if (err) return console.error(err.message);
    res.send(result);
  });
});

app.get("/getChapter", async (req, res) => {
  let sql = "SELECT * FROM 'chapter'";
  db.all(sql, (err, result) => {
    if (err) return console.error(err.message);
    res.send(result);
  });
});

app.get("/getHadith", async (req, res) => {
  let sql = "SELECT * FROM 'hadith'";
  db.all(sql, (err, result) => {
    if (err) return console.error(err.message);
    res.send(result);
  });
});

app.get("/getSection", async (req, res) => {
  let sql = "SELECT * FROM 'section'";
  db.all(sql, (err, result) => {
    if (err) return console.error(err.message);
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Hello SQLite");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
