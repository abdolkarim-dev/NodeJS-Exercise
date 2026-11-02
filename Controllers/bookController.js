const url = require("url");

const BookModel = require("../Models/Book");

const getAll = async (req, res) => {
  const books = await BookModel.find();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(books));
  res.end();
};
const removeOne = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;

  const removeBook = await BookModel.remove(bookID);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(removeBook));
  res.end();
};

const addBookOne = async (req, res) => {
  const addBook = await BookModel.addBookModel(req, res);
  res.writeHead(201, { "content-type": "application/json" });
  res.write(JSON.stringify(addBook));
  res.end();
};
module.exports = {
  getAll,
  removeOne,
  addBookOne,
};
