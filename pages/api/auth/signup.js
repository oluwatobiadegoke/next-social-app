import { v4 as uuidv4 } from "uuid";

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

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    client.close();
    res.status(422).json({ response: "0", message: "User already exists" });
    return;
  }

  const userId = uuidv4();

  try {
    const db = client.db();
    const hashedPassword = await hashPassword(password);
    const user = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      userId,
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
