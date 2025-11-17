const mongoose = require("mongoose");
const secret = require("./secret");
const URI = `mongodb+srv://${secret.DB_USERNAME}:${secret.DB_PASSWORD}@${secret.DB_CLUSTER}/${secret.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

async function conectDB() {
  try {
    await mongoose
      .connect(URI)
      .then(() => console.log("Mongo connected"))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

module.exports = conectDB;
