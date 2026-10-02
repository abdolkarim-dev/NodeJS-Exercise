const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/users") {
    fs.readFile("db.json", (err, db) => {
      if (err) {
        throw err;
      }
      const data = JSON.parse(db);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data.users));
      res.end();
    });
  } else if (req.method === "GET" && req.url === "/api/books") {
    fs.readFile("db.json", (err, db) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(db);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data.books));
      res.end();
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;
    const newBooks = db.books.filter((book) => book.id != bookID);
    if (Number(newBooks.length) === db.books.length) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "We have not this book" }));
    } else {
      fs.writeFile(
        "db.json",
        JSON.stringify({ ...db, books: newBooks }),
        (err) => {
          if (err) {
            throw err;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Book Removed Successfully" }));
          res.end();
        },
      );
    }
  } 
});

server.listen(4000, () => {
  console.log("Server Rinning On Port 4000");
});
