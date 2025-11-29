const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");
const ImageModel = require("./models/userModel");

const app = express();
connectDb();
app.use(bodyParser.json());

app.use("./uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadSingl = multer({ storage, limits: { fileSize: 1000000 } }).single(
  "demo_image"
);

const uploadMulti = multer({ storage, limits: { fileSize: 1000000 } });

app.post("/imagesingl", (req, res) => {
  uploadSingl(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Bad Request" });
    }
    res.status(200).send("Succefull upload");
  });
});

app.post("/imagemulti", uploadMulti.array("demo_image", 4), (req, res) => {
  try {
    res.send(req.files);
  } catch (error) {
    console.error(error);
    res.send(400);
  }
});

app.post("/user", async (req, res) => {
  try {
    const doc = await ImageModel.create(req.body);
    return res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.send(400);
  }
});

app.put("/user/:id", uploadSingl, async (req, res) => {
  try {
    console.log(req.file.filename);
    const doc = await ImageModel.findByIdAndUpdate(req.params.id, {
      photo: req.file.filename,
    });
    return res.status(200).json(doc);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Server works");
});
