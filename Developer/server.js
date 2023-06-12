const express = require("express");
const mysql = require("mysql2");
const PORT = 3001;

const app = express();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "classlist_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

app.get("", (req, res) => {
  res.json({ name: "" });
});
app.listen(PORT, () => {
  console.log("Express connected");
});
