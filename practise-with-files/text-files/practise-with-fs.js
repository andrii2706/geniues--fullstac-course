// const http = require("http");
// const fs = require("fs");
// const {
//   readFile,
//   appendFile,
//   writeFile,
//   rename,
//   unlink,
// } = require("fs/promises");

// async function newFile() {
//   try {
//     await writeFile("newFile.txt", "Hello Andrii");
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function createInflate(name, data) {
//   try {
//     await appendFile(name, data, { flag: "w" });
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function renameFile(from, to) {
//   try {
//     await rename(from, to);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function unlinkFile(name) {
//   try {
//     await unlink(name);
//   } catch (error) {
//     console.log(error);
//   }
// }
// unlinkFile("newFile.txt");
// renameFile("newFile-1.txt", "text.txt");
// createInflate("newFile-1.txt", "Hello Andrii -1");
// newFile();
// const server = http.createServer(function (req, res) {
//   try {
//     fs.readFile("newFile.txt", (err, data) => {
//       res.writeHead(200, { "Content-type": "text/html" });
//       res.write(data);
//       return res.end();
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });
// server.listen(3000, () => {
//   console.log("Hello from node.js server");
// });
