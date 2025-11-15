const express = require("express");
const bodyParser = require("body-parser");
const sqlLite3 = require("sqlite3");
const db = new sqlLite3.Database("tasks.db");
const app = express();

app.use(bodyParser.json());

const port = 3000;
let data = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
];

const checkList = (foundId, res) => {
  if (!foundId) {
    return res.status(404).json({ message: "Post not found" });
  }
};

const iternalServerError = (err, res) => {
  if (err) {
    return res.status(500).json({ err: err.message });
  }
};

app.get("/", (req, res) => {
  res.send("Hello Andrii");
});

app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    iternalServerError(err, res);
    return res.status(200).json(rows);
  });
});

app.get("/posts/:id", (req, res) => {
  const dataId = parseInt(req.params.id);
  const foundId = data.find((posts) => posts.id === dataId);
  db.get("SELECT * FROM  posts WHERE id = ?", dataId, (err, row) => {
    iternalServerError(err, res);
    checkList(foundId, res);
    return res.status(200).json(row);
  });
});

app.post("/posts", (req, res) => {
  const newPost = req.body;
  db.run(
    "INSERT INTO posts (id, userId, title, body) VALUES (?, ?, ? ,?)",
    [newPost.id, newPost.userId, newPost.title, newPost.body],
    (err) => {
      console.log(err);
      if (err) {
        // not a good practise
        // return res.statusCode(500).json({ error: err.message });
        return res.status(500).json({ err: "Internal Server error" });
      }
      return res.status(201).json({ id: this.lastID });
    }
  );
});

app.put("/posts/:id", (req, res) => {
  const { title } = req.body;
  const dataId = parseInt(req.params.id);
  db.run("UPDATE posts SET title = ? WHERE id = ?", [title, dataId], (err) => {
    iternalServerError(err, res);
    return res.status(200).json(foundId);
  });
});

app.delete("/posts/:id", (req, res) => {
  const dataId = parseInt(req.params.id);
  db.run("DELETE FROM posts WHERE  id  = ?", dataId, (err) => {
    iternalServerError(err, res);
    return res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
