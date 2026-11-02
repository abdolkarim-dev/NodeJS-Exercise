const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbConnection = new MongoClient(url);
const dbName = "library";

const main = async () => {
  await dbConnection.connect();
  console.log("Connection To DBConnection Successfuly");

  const db = dbConnection.db(dbName);

  //   const usersCollection = db.collection("users");
  //   usersCollection.insertOne({
  //     name: "karim",
  //     username: "bazdar007",
  //     crime: 1,
  //     email: "test@gmail.com",
  //     role: "Admin",
  //   });

  const booksColection = db.collection("books");
  booksColection.insertOne({
    id: 1,
    name: "Abdolkarim",
    free: 1,
    price: 8787987,
  });
  return "Done";
};

main();
