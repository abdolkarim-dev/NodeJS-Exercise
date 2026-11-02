const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");

const bookController = require("./Controllers/bookController");

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
    bookController.getAll(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
    bookController.removeOne(req, res);
  } else if (req.method === "POST" && req.url === "/api/books") {
    bookController.addBookOne(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
    bookController.updateBookOne(req, res);
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
  } else if (req.method === "PUT" && req.url.startsWith("/api/users/upgrade")) {
    const parsedUrl = url.parse(req.url, true);
    const userID = parsedUrl.query.id;

    db.users.forEach((user) => {
      if (user.id === Number(userID)) {
        user.role = "ADMIN";
      }
    });

    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
      if (err) {
        throw err;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User Upgraded Successfully" }));
      res.end();
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
  } else if (req.method === "POST" && req.url === "/api/users/login") {
    let user = "";

    req.on("data", (data) => {
      user = user + data.toString();
    });

    req.on("end", () => {
      const { username, email } = JSON.parse(user);

      const mainUser = db.users.find(
        (user) => user.username === username && user.email === email,
      );

      if (mainUser) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            username: mainUser.username,
            email: mainUser.email,
          }),
        );
        res.end();
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "User Not Found" }));
        res.end();
      }
    });
  } else if (req.method === "POST" && req.url === "/api/books/rent") {
    let reqBody = "";

    req.on("data", (data) => {
      reqBody = reqBody + data.toString();
    });

    req.on("end", () => {
      let { userID, bookID } = JSON.parse(reqBody);

      const isFreeBook = db.books.some(
        (book) => book.id === Number(bookID) && book.free === 1,
      );

      if (isFreeBook) {
        db.books.forEach((book) => {
          if (book.id === Number(bookID)) {
            book.free = 0;
          }
        });

        const newRent = {
          id: crypto.randomUUID(),
          userID,
          bookID,
        };

        db.rents.push(newRent);

        fs.writeFile("./db.json", JSON.stringify(db), (err) => {
          if (err) {
            throw err;
          }

          res.writeHead(201, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Book Reserved Successfully" }));
          res.end();
        });
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "This book is not free" }));
        res.end();
      }
    });
  }
});

server.listen(4000, () => {
  console.log("Server Rinning On Port 4000");
});
