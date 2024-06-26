import express from "express";
import { IController } from "../../../CONSTANTS/interfaces/controller.interface";
import { parser } from "../../config/cloudinary";
import verifyToken from "../../helpers/token/verify-token.helper";
import { SettingsService } from "./../../business-logic-layer/settings/settings.service";

class SettingsController implements IController {
  public server = express.Router();
  private settingsService = new SettingsService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get("/images", this.settingsService.getImages);
    this.server.get("/video", this.settingsService.getVideo);
    this.server.post(
      "/images",
      verifyToken,
      parser.single("image"),
      this.settingsService.addImage
    );
    this.server.post("/video", verifyToken, this.settingsService.uploadVideo);
    this.server.delete(
      "/images/demo/:publicId",
      this.settingsService.deleteImage
    );
  }
}

const settingsController = new SettingsController();
export default settingsController.server;
