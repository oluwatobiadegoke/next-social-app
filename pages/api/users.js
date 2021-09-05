import { connectToDatabase } from "../../helpers/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(422).json({ response: "0", message: "Method not supported" });
    return;
  }

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ response: "0", message: "Error connecting to database" });
    return;
  }

  try {
    const db = client.db("xpress");
    const users = await db.collection("users").find({}).toArray();
    client.close();
    res.status(200).json({
      response: "1",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ response: "0", message: "Error while fetching post" });
    return;
  }
}
