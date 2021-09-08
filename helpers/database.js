import { MongoClient } from "mongodb";

const mongoConnect = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cj6bm.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
  return await MongoClient.connect(mongoConnect);
};

export default connectToDatabase;
