import { connectToDatabase } from "../../helpers/database";
import nc from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({ dest: "/tmp" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nc()
  .use(upload.single("profilePicture"))
  .put(async (req, res) => {
    let profilePicture;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: "fill",
      });
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

    const { name, bio, userId } = req.body;

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
      client.close();
      res.status(200).json({
        response: "1",
        message: "Profile updated",
        data: users,
      });
    } catch (error) {
      res
        .status(500)
        .json({ response: "0", message: "Error while updating profile." });
      return;
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
