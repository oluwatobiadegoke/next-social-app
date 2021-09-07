import { connectToDatabase } from "../../helpers/database";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

import { cloudinaryConfig } from "../../cloudinaryConfig";

cloudinary.config(cloudinaryConfig);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let profilePicture;
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const { name, bio, userId } = fields;
    if (files) {
      const image = await cloudinary.uploader.upload(
        files.profilePicture.path,
        {
          width: 512,
          height: 512,
          crop: "fill",
        }
      );
      profilePicture = image.secure_url;
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
      const users = await db.collection("users").updateOne(
        { userId },
        {
          $set: {
            name,
            bio: bio || "",
            ...(profilePicture && { profilePicture }),
          },
        }
      );
      const user = await db.collection("users").findOne({ userId });
      client.close();
      res.status(200).json({
        response: "1",
        message: "Profile updated",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ response: "0", message: "Error while updating profile." });
      return;
    }
  });
}
