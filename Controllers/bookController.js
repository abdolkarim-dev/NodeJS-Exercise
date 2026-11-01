const url = require("url");

const BookModel = require("../Models/Book");

const getAll = async (req, res) => {
  const books = await BookModel.find();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(books));
  res.end();
};

module.exports = {
  getAll,
};
