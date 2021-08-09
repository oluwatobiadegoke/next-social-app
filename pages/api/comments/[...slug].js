import { connectToDatabase } from "../../../helpers/database";

export default async function (req, res) {
  if (req.method !== "GET") {
    res.status(422).json({ response: "0", message: "Method not supported" });
  }

  const slug = req.query.slug;
  const postId = slug[0];
  const userId = slug[1];

  if (!userId || !postId) {
    res
      .status(422)
      .json({ response: "0", message: "There are missing parameters" });
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
    const comments = await db
      .collection("comments")
      .find({ postId: postId })
      .toArray();
    client.close();
    res.status(200).json({
      response: "1",
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ response: "0", message: "Error while fetching comments" });
    return;
  }
}
