// const http = require("http");
// const fs = require("fs");
// const {
//   readFile,
//   appendFile,
//   writeFile,
//   rename,
//   unlink,
// } = require("fs/promises");

// const fileName = "newFile.txt";
// const contentAdd = "Some content";
// async function readFileAsync() {
//   try {
//     const data = await readFile("text.txt");
//     console.log(data.toString());
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function appendFileAsync(name, data) {
//   try {
//     await appendFile(name, data, { flag: "w" });
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function writeFileAsync(name, data) {
//   try {
//     await writeFile(name, data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function renameAsync(from, to) {
//   try {
//     await rename(from, to);
//     console.log(`Deleted from ${from} to ${to}`);
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function unLinkAsync(fileName) {
//   try {
//     await unlink(fileName);
//   } catch (error) {
//     console.error(error);
//   }
// }

// readFileAsync();

// appendFileAsync("newFile.txt", "Hello Andrii");

// writeFileAsync("writeFile.txt", "Hello Andrii");

// fs.open(fileName, "a", (err, file) => {
//   if (err) throw err;

//   fs.write(file, contentAdd, (err) => {
//     if (err) throw err;
//     console.log("Content added to the file");
//     fs.close(file, (err) => {
//       if (err) throw err;
//     });
//   });
// });

// renameAsync("newFile.txt", "test.txt");
// unLinkAsync("text.txt");

//Buffer consept

// http
//   .createServer(function (req, res) {
//     try {
//       fs.readFile("text.txt", (err, data) => {
//         res.writeHead(200, { "Content-type": "text/html" });
//         res.write(data);
//         return res.end();
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   })
//   .listen(8080);

const express = require("express");
const multer = require("multer");
const conectDB = require("./config/db");
const bodyParser = require("body-parser");
const ImageUser = require("./models/userModels");

const app = express();

conectDB();

app.use(bodyParser.json());

app.use("./uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// add single file into server
// const upload = multer({ storage, limits: { fileSize: 1000000 } }).single(
//   "demo_image"
// );
// add multiple files into server
const upload = multer({ storage, limits: { fileSize: 1000000 } });

app.get("/", (req, res) => {
  console.log("Hello");
});

// app.post("/image", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(400).send("Something went wrong");
//     }
//     res.send(req.file);
//   });
// });

app.post("/image", upload.array("demo_image", 4), (req, res) => {
  try {
    res.send(req.files);
  } catch (error) {
    console.error(error);
    res.send(400);
  }
});

app.post("/user", async (req, res) => {
  try {
    const doc = await ImageUser.create(req.body);
    return res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.send(400);
  }
});

app.put("/user/:id", upload.single("demo_image"), async (req, res) => {
  try {
    const doc = await ImageUser.findByIdAndUpdate(req.params.id, {
      photo: req.file.filename,
    });
    return res.status(200).json(doc);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Server Works on port", 3000);
});
