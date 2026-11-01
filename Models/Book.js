const db = require("../db.json");

const find = () => {
  return new Promise((resolve, reject) => {
    resolve(db.books)
  });
};


module.exports = {
    find,
}