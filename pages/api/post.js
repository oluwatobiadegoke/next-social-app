import { connectToDatabase } from "../../helpers/database";

export default async function helper(req, res) {
  if (req.method === "POST") {
    const { content, poster, posterId } = req.body;

    if (!content || !poster || !posterId) {
      res
        .status(422)
        .json({ response: "0", message: "There are missing parameters" });
      return;
    }
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        response: "0",
        message: "Connecting to database failed",
      });
      return;
    }

    try {
      const db = client.db();
      const post = await db.collection("posts").insertOne({
        poster,
        posterId,
        content,
        likes: 0,
        comments: [],
      });
      client.close();
    } catch (error) {
      res.status(500).json({
        response: "0",
        message: "Could not upload post. Please try again.",
      });
      return;
    }
    res
      .status(200)
      .json({ response: "1", message: "Post created successfully" });
  }

  if (req.method === "GET") {
    const { _id } = req.body;

    if (!_id) {
      res.status(422).json({ response: "0", message: "Post id missing" });
      return;
    }
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        response: "0",
        message: "Connecting to database failed",
      });
      return;
    }

    try {
      const db = client.db();
      const post = await db.collection("posts").findOne({ _id });
      client.close();
      res.status(200).json({
        response: "1",
        message: "Post fetched successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        response: "0",
        message: "Could not load post. Please try again.",
      });
      return;
    }
  }
}
