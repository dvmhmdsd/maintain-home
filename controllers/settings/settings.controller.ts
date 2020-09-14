import { SettingsService } from "./../../business-logic-layer/settings/settings.service";
import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import { parser } from "../../config/cloudinary";

const server = express.Router();
const settingsService = new SettingsService();

server.get("/images", settingsService.getImages);
server.get("/video", settingsService.getVideo);
server.post(
  "/images",
  verifyToken,
  parser.array("images"),
  settingsService.uploadAssets
);
server.post(
  "/video",
  verifyToken,
  settingsService.uploadAssets
);

export default server;
