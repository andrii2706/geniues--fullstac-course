const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "Fullname is required"],
  },
  photo: {
    type: String,
    default: null,
  },
});

const ImageUser = mongoose.model("ImageUser", userSchema);

module.exports = ImageUser;
