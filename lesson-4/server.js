const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Post } = require("./model/posts");

const connectDb = require("./config2/db");
const app = express();
app.use(bodyParser.json());

// $eq дорівнює,
// $gt більше ніж
// $lt менше ніж
// $gte більше або дорівню
// $lte менше або дорівнює
// $ne не дорівнює
// $in будь яку значення
// $nin не відподвідає жодному значеню
// є ще && || not

connectDb();

const errorHandler = (err, res) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
};

const checkExist = (post, res, err) => {
  if (!post) {
    return res.status(404).json({ message: err ?? "Post not found" });
  }
};

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    checkExist(posts, res, "Post not created");
    return res.status(200).json(posts);
  } catch (err) {
    console.error("Post creating error", err);
    errorHandler(err, res);
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await Post.findById(postId);
    checkExist(post, res, "Post not created");
    return res.status(200).json(post);
  } catch (err) {
    console.error("Post creating error", err);
    errorHandler(err, res);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = req.body;

    const post = await Post.create({
      userId: newPost.userId,
      title: newPost.title,
      body: newPost.body,
    });

    checkExist(post, res, "Post not created");

    return res.status(201).json(post);
  } catch (err) {
    console.error("Post creating error", err);
    errorHandler(err, res);
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { body, title } = req.body;
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(
      postId,
      { title, body },
      { new: true }
    );
    checkExist(post, res);
    return res.status(200).json(post);
  } catch (err) {
    console.error("Post updating error", err);
    errorHandler(err, res);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);
    checkExist(post, res);
    return res.status(204).send();
  } catch (err) {
    errorHandler(err, res);
    console.error("Post was not deleted", err);
  }
});

app.listen(3000, () => {
  "Server starts and work";
});
