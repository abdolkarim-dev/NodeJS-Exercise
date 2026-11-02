const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbConnection = new MongoClient(url);
const dbName = "library";

const main = async () => {
  await dbConnection.connect();
  console.log("Connection To DBConnection Successfuly");

  const db = dbConnection.db(dbName);
  return "Done"
};
