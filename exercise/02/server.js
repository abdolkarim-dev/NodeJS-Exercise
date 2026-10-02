const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/users") {
    fs.readFile("data.json", (err, db) => {
      if (err) {
        throw err;
      }
      const getData = JSON.parse(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(getData.users));
      res.end();
    });
  } else if (req.method === "GET" && req.url === "/api/books") {
    fs.readFile("data.json", (err, db) => {
      if (err) {
        throw err;
      }
      const getData = JSON.parse(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(getData.books));
      res.end();
    });
  } else if (req.method === "POST" && req.url === "/api/admin/makeadmin") {
    fs.readFile("data.json", (err, db) => {
      if (err) {
        throw err;
      }
      const getData = JSON.parse(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      const newId = getData.users.length
        ? Math.max(...getData.users.map((u) => u.id)) + 1
        : 1;
      const adminNewData = {
        id: newId,
        name: "ali",
        username: "alipur5553",
        crime: 0,
        role: "ADMIN",
      };
      getData.users.push(adminNewData);
      const json = JSON.stringify(getData, null, 2);
      fs.writeFile("data.json", json, (err) => {
        if (err) {
          throw err;
        }
      });
      res.end();
      console.log(getData);
    });
  } else if (req.method === "POST" && req.url === "/api/admin/addbook") {
    fs.readFile("data.json", (err, db) => {
      if (err) {
        throw err;
      }
      const getData = JSON.parse(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      const newId = getData.books.length
        ? Math.max(...getData.books.map((u) => u.id)) + 1
        : 1;
      const bookNewData = {
        id: newId,
        name: "sdsaw",
        free: 0,
        price: 3333333323,
      };
      getData.books.push(bookNewData);
      const json = JSON.stringify(getData, null, 2);
      fs.writeFile("data.json", json, (err) => {
        if (err) {
          throw err;
        }
      });
      res.end();
      console.log(getData);
    });
  } else if (req.method === "DELETE" && req.url === "/api/admin/removebook/5") {
    fs.readFile("data.json", (err, db) => {
      if (err) {
        throw err;
      }
      const getData = JSON.parse(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      getData.books = getData.books.filter((item) => item.id != 5);
      const json = JSON.stringify(getData, null, 2);
      fs.writeFile("data.json", json, (err) => {
        if (err) {
          throw err;
        }
      });
      res.end();
      console.log(getData);
    });
  } else if (req.method === "PATCH" && req.url === "/api/admin/editbook/4") {
    fs.readFile("data.json", (err, db) => {
      if (err) {
        throw err;
      }
      const getData = JSON.parse(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      getData.books.forEach((item) => {
        if (item.id === 4) {
          item.name = "ASDSAD4444";
        }
      });
      const json = JSON.stringify(getData, null, 2);
      fs.writeFile("data.json", json, (err) => {
        if (err) {
          throw err;
        }
      });
      res.end();
      console.log(getData);
    });
  }
});

server.listen(4000, () => {
  console.log("start port 4000 in my server");
});
