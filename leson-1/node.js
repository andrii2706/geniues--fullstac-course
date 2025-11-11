const http = require("http");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/home":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Home page\n");
          break;
        case "/about":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("About Page\n");
          break;
        default:
          notFound(res);
          break;
      }
      break;
    case "POST":
      switch (req.url) {
        case "/api/home":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Home page\n");
          break;
        case "/api/user":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Create user request \n");
          break;
        default:
          notFound(res);
          break;
      }
      break;
    default:
      notFound(res);
      break;
  }
});

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found\n");
}
server.listen(3000, "localhost", () => {
  console.log(`Server listening http://localhost:3000`);
});
