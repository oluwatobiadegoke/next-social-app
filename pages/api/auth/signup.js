import { connectToDatabase } from "../../../helpers/database";
import { hashPassword } from "../../../helpers/auth";

export default async function helper(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  const { name, email, password, cpassword } = req.body;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    !cpassword ||
    password !== cpassword ||
    password.trim().length < 6
  ) {
    res.status(422).json({ message: "Missing parameters" });
    return;
  }

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

  try {
    const db = client.db();
    const hashedPassword = await hashPassword(password);
    const user = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });
    client.close();
  } catch (error) {
    res.status(500).json({
      message: "Inserting details into database failed",
    });
    return;
  }

  res.status(200).json({ message: "Sign up successful" });
}
