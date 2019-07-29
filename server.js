var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
  //database: 'remindersdb'
});

connection.connect(err => {
  if (err) throw err;
});

// connection.query("DROP DATABASE IF EXISTS remindersdb", (err, rows, fields) => {
//   if (err) throw err;
// });

connection.query(
  "CREATE DATABASE IF NOT EXISTS remindersdb",
  (err, rows, fields) => {
    if (err) throw err;
  }
);

connection.query("USE remindersdb", (err, rows, fields) => {
  if (err) throw err;
});

// const sqldrop = "DROP TABLE IF EXISTS reminders";
// connection.query(sqldrop, function(err, result) {
//   if (err) throw err;
// });

const createReminders = `CREATE TABLE IF NOT EXISTS reminders
(
  id VARCHAR(50) NOT NULL,
  createdAt BIGINT NOT NULL,
  reminderExpiration BIGINT NOT NULL,
  text VARCHAR(255) NOT NULL
  )`;
connection.query(createReminders, (err, result) => {
  if (err) throw err;
});

// connection.query("SHOW TABLES", function(err, rows, fields) {
//   if (err) throw err;
//   console.log(rows);
// });

// connection.query("DESCRIBE reminders", function(err, rows, fields) {
//   if (err) throw err;
//   console.log(rows);
// });

// const sqlinsert = `INSERT INTO reminders
// (id, text, createdAt, reminderExpiration)
// VALUES
// ('76e4f98a-59aa-47bd-aef0-ab89a4124043', 'reminder 1', 1569950674, 1569950674),
// ('z973d567-eeee-aaaa-8468-ef27d3138fae', 'reminder 22', 1569850674, 1569850674)`;

// connection.query(sqlinsert, function(err, result) {
//   if (err) throw err;
// });

asyncQuery = (query, args) => {
  return new Promise((resolve, reject) => {
    connection.query(query, function(err, result, fields) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

app.get("/reminders", (req, res, next) => {
  asyncQuery("SELECT * FROM reminders").then(rows => {
    res.send(rows);
  });
});

app.post("/reminders", (req, res) => {
  const { id, createdAt, reminderExpiration, text } = req.body;

  asyncQuery(
    `INSERT INTO reminders (id, createdAt, reminderExpiration, text)
    VALUES("${id}", "${createdAt}", "${reminderExpiration}", "${text}")`
  );

  res.end();
});

app.put("/reminders", (req, res) => {
  const { id, createdAt, reminderExpiration, text } = req.body;

  asyncQuery(`DELETE FROM reminders WHERE id LIKE "%${id}%"`).then(() => {
    asyncQuery(
      `INSERT INTO reminders (id, createdAt, reminderExpiration, text)
        VALUES("${id}", "${createdAt}", "${reminderExpiration}", "${text}")`
    );
  });

  res.end();
});

app.delete("/reminders", (req, res) => {
  const { id } = req.body;

  asyncQuery(`DELETE FROM reminders WHERE id LIKE '%${id}%'`);

  res.end();
});

const port = process.env.PORT || 5000;

app.listen(port);

// connection.end();
