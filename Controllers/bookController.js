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
module.exports = {
  getAll,
  removeOne,
};
