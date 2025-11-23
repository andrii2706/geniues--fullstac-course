const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");
//DB model
const User = require("./models/userModel");
const Posts = require("./models/postModel");

//handlers
const errorHandler = require("./error/error-handler");

//middleware

const checkAuth = require("./middleware/checkAuth");
const checkRole = require("./middleware/checkRole");

const app = express();
//Db connect
connectDB();

app.use(bodyParser.json());

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
    const { password, ...userData } = user._doc;
    return res.status(200).json(userData);
  } catch (error) {
    errorHandler(error, res);
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password: pass } = req.body;

    const user = await User.findOne({ email });

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Credentianals is not valid" });
    }
    userInfo = user;
    const { password, ...userData } = user._doc;
    return res.status(200).json(userData);
  } catch (error) {
    errorHandler(error, res);
    console.error(error);
  }
});

app.post("/posts", checkAuth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const base64Creadentials = req.headers.authorization.split(" ")[1];

    const credentials = Buffer.from(base64Creadentials, "base64").toString(
      "ascii"
    );

    const [email] = credentials.split(":");

    const { userId } = await User.findOne({ email });

    const posts = await Posts.create({ userId, title, body });
    return res.status(201).json(posts);
  } catch (error) {
    errorHandler(error, res);
    console.error(error);
  }
});

app.get("/posts/:userId", checkAuth, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const posts = await Posts.find({ userId });
    return res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, res);
    console.error(error);
  }
});

app.get("/posts", checkAuth, checkRole, async (req, res) => {
  try {
    const posts = await Posts.find();
    return res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, res);
    console.error(error);
  }
});

app.get("/users", checkAuth, checkRole, async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
    console.error(error);
  }
});

app.listen(3000);
