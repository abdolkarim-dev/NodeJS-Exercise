const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnectionUrl);
const dbName = process.env.dbName;

const main = async () => {
  await dbConnection.connect();

  console.log("Connection To DB Successful");

  const db = dbConnection.db(dbName);

  const usersCollection = db.collection("users");

  const result = await usersCollection.updateMany(
    {
      updatedAt: { $exists: false },
    },
    { $set: { updatedAt: new Date() } },
  );
  console.log(result);

  // const result = await usersCollection.updateOne(
  //   {
  //     _id: new ObjectId("6aec64ae4037cb0daf56c6da"),
  //   },
  //   { $set: { tags: ["frontend", "backend"] } },
  // );
  // console.log(result);

  // const result = await usersCollection
  //   .find({
  //     tags: { $all:["nodejs"] },
  //   })
  //   .toArray();

  // console.log(result);

  // const result = await usersCollection
  //   .find({
  //     tags: { $exists: true },
  //   })
  //   .toArray();

  // console.log(result);

  // const result = await usersCollection.find
  // ({
  //   tags:"nodejs"
  // }).toArray()
  // console.log(result);
};

main()
  .catch(console.error)
  .finally(() => dbConnection.close());
