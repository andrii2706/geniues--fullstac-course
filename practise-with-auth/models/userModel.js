const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  userId: {
    type: Number,
    require: true,
  },
  role: {
    type: String,
    default: "User",
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
