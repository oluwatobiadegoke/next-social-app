import { v4 as uuidv4 } from "uuid";

import { connectToDatabase } from "../../helpers/database";

export default async function (req, res) {
  // ====To post a comment about a post==== //

  if (req.method === "POST") {
    const { postId, userId, comment } = req.body;

    if (!postId || !userId || !comment) {
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
    const existingUsername = existingUser.name;

    if (!existingUser) {
      res.status(401).json({ response: 0, message: "Not authorized" });
    }

    const commentId = uuidv4();

    try {
      const db = client.db();
      const comment = await db.collection("comments").insertOne({
        postId,
        posterId: userId,
        poster: existingUsername,
        commentId,
        comment,
        likes: 0,
      });
      client.close();
      res
        .status(200)
        .json({ response: "1", message: "Comment created successfully" });
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ response: "0", message: "Error creating comment" });
      return;
    }
  }

  // ====To like a single comment==== //
  if (req.method === "PUT") {
    const { userId, commentId } = req.body;

    if (!userId || !commentId) {
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
      res.status(402).json({ response: 0, message: "Not authorized" });
    }

    try {
      const db = client.db();
      const likesIncrease = await db.collection("comments").updateOne(
        { commentId: commentId },
        {
          $inc: { likes: 1 },
        }
      );
      client.close();
      res
        .status(200)
        .json({ response: "1", message: "Comment liked successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({ response: "0", message: "Error liking comment" });
      return;
    }
  }

  // ====To delete a single comment==== //
  if (req.method === "DELETE") {
    const { userId, commentId } = req.body;

    if (!userId || !commentId) {
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
      res.status(402).json({ response: 0, message: "Not authorized" });
    }

    try {
      const db = client.db();
      const deleteComment = await db.collection("comments").deleteOne(
        { commentId: commentId },
        {
          justOne: true,
        }
      );
      client.close();
      res
        .status(200)
        .json({ response: "1", message: "Comment deleted successfully" });
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ response: "0", message: "Error deleting comment" });
      return;
    }
  }
}
