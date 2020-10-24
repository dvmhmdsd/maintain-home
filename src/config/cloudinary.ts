import multer from "multer";
// @ts-ignore
import cloudinaryStorage from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "demo",
});

const parser = multer({ storage });

export { parser };
