const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./model/model");
const contectDB = require("./config/db");
const errorHandler = require("./error-handler/error-handler");
const app = express();

app.use(bodyParser.json());
contectDB();
app.get("/users", async (req, res) => {
  try {
    const posts = await User.find();
    errorHandler(null, res, posts);
    return res.status(200).json(posts);
  } catch (err) {
    errorHandler(err, res, null);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await User.findById(postId);
    return res.status(201).json(post);
  } catch (error) {
    errorHandler(error, res, null);
  }
});
app.post("/users", (req, res) => {
  try {
    const newPost = req.body;
    const post = User.create(newPost);
    errorHandler(null, res, post);
    return res.status(201).json(post);
  } catch (error) {
    errorHandler(error, res, null);
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { username } = req.body;
    const post = await User.findByIdAndUpdate(
      postId,
      { username },
      { new: true }
    );
    errorHandler(null, res, post);
    return res.status(200).json(post);
  } catch (error) {
    errorHandler(error, res, null);
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await User.findByIdAndDelete(postId);
    errorHandler(null, res, post);
    return res.status(204).send();
  } catch (error) {
    errorHandler(error, res, null);
  }
});

app.listen(3000, () => {
  console.log("Server start");
});
