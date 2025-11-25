const mongoose = require("mongoose");

const userSchema = mongoose.Schema({});

const ImageSchema = mongoose.model("ImageSchema", userSchema);
module.exports = ImageSchema;
