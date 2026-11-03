const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = "mongodb://localhost:27017";
const dbConnection = new MongoClient(process.env.dbConnecltionUrl);
const dbName = process.env.dbName;

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

  //   const booksColection = db.collection("books");
  //   booksColection.insertOne({
  //     id: 1,
  //     name: "Abdolkarim",
  //     free: 1,
  //     price: 8787987,
  //   });

  // const rentsCollection = db.collection("rents");
  // const result = await rentsCollection.insertMany([
  //   { userID: 1, bookID: 1 },
  //   {
  //     userID: "fc9b7cd0-173c-4f5f-9bc8-ec9c062d7379",
  //     bookID: 2,
  //   },
  // ]);

  const bookCallection = db.collection('books')
  const result = await bookCallection.find({}).toArray()
  console.log(result);

  return "Done";
};

main().catch(console.error);
