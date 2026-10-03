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
  } else if (req.method === "POST" && req.url === "/api/books") {
    let book = "";
    const bookID = db.books.length ? db.books.length + 1 : 1;
    req.on("data", (data) => {
      book = book + data.toString();
    });
    req.on("end", () => {
      const newBook = { id: bookID, ...JSON.parse(book), free: 1 };

      db.books.push(newBook);

      fs.writeFile("db.json", JSON.stringify(db), (err) => {
        if (err) {
          throw err;
        }
        res.writeHead(201, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Add new Book is successfuly" }));
        res.end();
      });
    });
  } else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;

    let bookUpdate = "";

    req.on("data", (data) => {
      bookUpdate = bookUpdate + data.toString();
    });

    req.on("end", () => {
      const reqBody = JSON.parse(bookUpdate);

      db.books.forEach((book) => {
        if (book.id === Number(bookID)) {
          book.name = reqBody.name;
          book.price = reqBody.price;
        }
      });

      fs.writeFile("./db.json", JSON.stringify(db), (err) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Book Updated Successfully" }));
        res.end();
      });
    });
  } else if (req.method === "POST" && req.url === "/api/users") {
    let addUser = "";
    req.on("data", (data) => {
      addUser = addUser + data.toString();
    });

    req.on("end", () => {
      const { name, username, email, role } = JSON.parse(addUser);

      const isUserExist = db.users.find(
        (user) => user.email === email || user.username === username,
      );
      if (name === "" || username === "" || role === "") {
        res.writeHead(422, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "User data are not valid" }));
        res.end();
      } else if (isUserExist) {
        res.writeHead(409, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ message: "email or username already is exist" }),
        );
        res.end();
      } else {
        const userID = db.users.length ? db.users.length + 1 : 1;
        const objectUser = {
          id: userID,
          name,
          username,
          role,
          email,
          crime: 0,
        };
        db.users.push(objectUser);
        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
          if (err) {
            throw err;
          }
        });
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "add new user" }));
        res.end();
      }
    });
  } else if (req.method === "PUT" && req.url.startsWith("/api/users")) {
    const paramter = url.parse(req.url, true);
    const getID = paramter.query.id;

    let updateCrime = "";

    req.on("data", (data) => {
      updateCrime = updateCrime + data.toString();
    });

    req.on("end", () => {
      const { crime } = JSON.parse(updateCrime);
      db.users.forEach((user) => {
        if (user.id === Number(getID)) {
          user.crime = crime;
        }
      });
      fs.writeFile("./db.json", JSON.stringify(db), (err) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "update users crime" }));
        res.end();
      });
    });
  }
});

server.listen(4000, () => {
  console.log("Server Rinning On Port 4000");
});
