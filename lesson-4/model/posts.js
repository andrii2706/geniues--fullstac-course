const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    require: [true, "User id is required"],
  },
  title: {
    type: "string",
    require: [true, "Post title is required"],
  },
  body: {
    type: "string",
    require: [true, "Body of post is required"],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
