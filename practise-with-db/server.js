const http = require("http");
const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const db = new sqlite3.Database("users.db");

const app = express();

const errorHandler = (err, res) => {
  if (err) {
    return res.status(500).json({ message: err.message });
  }
};

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json("Hello empty sender");
});

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    errorHandler(err, res);
    rows = rows.map((row) => ({
      ...row,
      address: JSON.parse(row.address),
    }));
    return res.status(200).json(rows);
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.body;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    errorHandler(err, res);
    return res.status(200).json({ ...row, address: JSON.parse(row.address) });
  });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  db.run(
    "INSERT INTO users (id, username, email, address) VALUES (?, ?, ? ,?)",
    [
      newUser.id,
      newUser.username,
      newUser.email,
      JSON.stringify(newUser.address),
    ],
    (err) => {
      errorHandler(err, res);
      return res.status(201).json(newUser);
    }
  );
});

app.put("/users/:id", (req, res) => {
  const { username } = req.body;
  const id = parseInt(req.params.id);
  const user = req.body;
  db.run(
    "UPDATE users SET username = ? WHERE id = ? ",
    [username, id],
    (err) => {
      errorHandler(err, res);
      return res.status(200).json(user);
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  req.body;
  db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
    errorHandler(err, res);
    return res.status(204).send();
  });
});

app.listen(3000, () => {
  console.log("Server Starts");
});
