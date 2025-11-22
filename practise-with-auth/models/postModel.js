const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  userId: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
