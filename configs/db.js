const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnectionUrl);
const dbName = process.env.dbName;

const main = async () => {
  await dbConnection.connect();

  console.log("Connection To DB Successful");

  const db = dbConnection.db(dbName);
  const usersCollection = db.collection("users");

  const result = await usersCollection.insertOne({
    name: "karim1",
    username: "bazdar007",
    crime: 1,
    email: "test@gmail.com",
    role: "Admin",
    tags: ["nodejs", "reactjs", "vuejs"],
  });

  console.log("Inserted ID:", result.insertedId);
};

main()
  .catch(console.error)
  .finally(() => dbConnection.close());