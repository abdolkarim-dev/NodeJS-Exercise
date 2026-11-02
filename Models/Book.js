const db = require("../db.json");
const fs = require("fs");
const url = require('url')
const find = () => {
  return new Promise((resolve, reject) => {
    resolve(db.books);
  });
};

const remove = (bookID) => {
  return new Promise((resolve, reject) => {
    const newBooks = db.books.filter((book) => book.id !== Number(bookID));
    if (Number(newBooks.length) === db.books.length) {
      reject({ message: "We have not this book" });
    } else {
      fs.writeFile(
        `${process.cwd()}/db.json`,
        JSON.stringify({ ...db, books: newBooks }),
        (err) => {
          if (err) {
            reject(err);
          }
          resolve({ message: "Book Removed Successfully" });
        },
      );
    }
  });
};

const addBookModel = (req, res) => {
  return new Promise((resolve, reject) => {
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
          reject(err);
        }
        resolve({ message: "Add new Book is successfuly" });
      });
    });
  });
};

const updateBookModel = (req, res) => {
  return new Promise((resolve, reject) => {
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
          reject(err);
        }
        resolve({ message: "Book Updated Successfully" });
      });
    });
  });
};

module.exports = {
  find,
  remove,
  addBookModel,
  updateBookModel,
};
