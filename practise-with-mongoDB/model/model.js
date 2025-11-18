const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"] },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  website: { type: String, required: [true, "Website is required"] },
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
