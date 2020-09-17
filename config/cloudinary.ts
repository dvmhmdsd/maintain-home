import multer from "multer";
import dotenv from "dotenv";
// @ts-ignore
const cloudinary = require("cloudinary");
// @ts-ignore
import cloudinaryStorage from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "application",
});

const parser = multer({ storage });

export { parser, cloudinary };
