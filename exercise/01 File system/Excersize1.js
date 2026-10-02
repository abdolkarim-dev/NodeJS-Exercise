const fs = require("fs");

// const data = {
//   books: [
//     { id: 1, title: "Test  Book" },
//     { id: 2, title: "Test Book" },
//     { id: 3, title: "Test Book" },
//   ],
// };
// data.books.push({ id: 4, title: "Test Book" });

// fs.writeFile("data.json", `${JSON.stringify(data)}`, (err) => {
//   if (err) {
//     throw err;
//   }
// });

fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  const obj = JSON.parse(data);
  obj.books.push({ id: 5, title: "Test Book" });
  const json = JSON.stringify(obj, null, 2);
  fs.writeFile("data.json", json, (err) => {
    if (err) throw err; 
    console.log("Saved!");
  });
});
 