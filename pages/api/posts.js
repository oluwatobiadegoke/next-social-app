import { connectToDatabase } from "../../helpers/database";

export default async function (req, res) {
  if (req.method !== "GET") {
    res.status(422).json({ response: "0", message: "Method not supported" });
  }

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ response: "0", message: "Error connecting to database" });
  }

  try {
    const db = client.db("xpress");
    const posts = await db.collection("posts").find({}).toArray();
    client.close();
    res.status(200).json({
      response: "1",
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ response: "0", message: "Error while fetching post" });
    return;
  }
}
