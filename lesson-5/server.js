const express = require("express");
const bodyParser = require("body-parser");
const conectDB = require("./config/db");
const bcrypt = require("bcrypt");

const User = require("./models/userModel");
const checkAuth = require("./middleware/checkAuth");
const checkRole = require("./middleware/checkRole");

const app = express();

conectDB();

app.use(bodyParser.json());
//for all end points
// app.use(checkAuth);

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password: pass, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      role,
    });
    const { password, ...userData } = await user._doc;
    return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid password or email",
      });
    }
    const { password, ...userData } = user._doc;

    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/posts", checkAuth, checkRole, async (req, res) => {
  return res.status(200).send("all posts");
});

app.listen(3000, () => {
  "Server starts and work";
});
