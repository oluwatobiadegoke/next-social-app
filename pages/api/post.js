import { v4 as uuidv4 } from "uuid";

import { connectToDatabase } from "../../helpers/database";

export default async function helper(req, res) {
  // ====To POST  a single post==== //
  if (req.method === "POST") {
    const { content, poster, userId } = req.body;

    if (!content || !poster || !userId) {
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

    const db = client.db();
    const existingUser = await db.collection("users").findOne({ userId });

    if (!existingUser) {
      res.status(402).json({ response: 0, message: "Not authorized" });
    }

    const postId = uuidv4();

    try {
      const db = client.db();
      const post = await db.collection("posts").insertOne({
        poster,
        posterId: userId,
        postId,
        content,
        likes: 0,
        comments: [],
      });
      client.close();
      res
        .status(200)
        .json({ response: "1", message: "Post created successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({
        response: "0",
        message: "Could not upload post. Please try again.",
      });
      return;
    }
  }

  // ====To GET  a single post==== //

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
      client.close();
      res.status(500).json({
        response: "0",
        message: "Could not load post. Please try again.",
      });
      return;
    }
  }

  // ====To like a single post==== //
  if (req.method === "PUT") {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      res
        .status(422)
        .json({ response: "0", message: "There are missing parameters." });
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

    const db = client.db();
    const existingUser = await db.collection("users").findOne({ userId });

    if (!existingUser) {
      res.status(401).json({ response: 0, message: "Not authorized" });
    }

    try {
      const db = client.db();
      const likesIncrease = await db.collection("posts").updateOne(
        { postId: postId },
        {
          $inc: { likes: 1 },
        }
      );
      client.close();
      res
        .status(200)
        .json({ response: "1", message: "Post liked successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({ response: "0", message: "Error liking post" });
      return;
    }
  }

  // ====To like a delete post==== //
  if (req.method === "DELETE") {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      res
        .status(422)
        .json({ response: "0", message: "There are missing parameters." });
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

    const db = client.db();
    const existingUser = await db.collection("users").findOne({ userId });

    if (!existingUser) {
      res.status(401).json({ response: 0, message: "Not authorized" });
    }

    try {
      const db = client.db();
      const deletePost = await db.collection("posts").deleteOne(
        { postId: postId },
        {
          justOne: true,
        }
      );
      client.close();
      res
        .status(200)
        .json({ response: "1", message: "Post deleted successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({ response: "0", message: "Error deleting post" });
      return;
    }
  }
}
