const mongoose = require("mongoose");
const secret = require("./secret");

const URI = `mongodb+srv://${secret.DB_USERNAME}:${secret.DB_PASSWORD}@${secret.DB_CLUSTER}/${secret.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const conectDB = async () => {
  try {
    mongoose
      .connect(URI)
      .then(() => {
        console.log("Mongo connect");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error("Mongo failed", error);
  }
};

module.exports = conectDB;
