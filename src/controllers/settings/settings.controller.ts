import express from "express";
import { SettingsService } from "./../../business-logic-layer/settings/settings.service";
import verifyToken from "../../helpers/token/verify-token.helper";
import { parser } from "../../config/cloudinary";

const server = express.Router();
const settingsService = new SettingsService();

server.get("/images", settingsService.getImages);
server.get("/video", settingsService.getVideo);
server.post(
  "/images",
  verifyToken,
  parser.single("image"),
  settingsService.addImage
);
server.post("/video", verifyToken, settingsService.uploadVideo);
server.delete("/images/application/:publicId", settingsService.deleteImage);

export default server;
