import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import authorizeSuperAdmin from "../../helpers/auth/super-auth.helper";
import UserService from "../../business-logic-layer/user/user.service";
import { parser } from "../../config/cloudinary";

class UserController {
  public server = express.Router();
  private userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get(
      "/list",
      verifyToken,
      authorizeSuperAdmin,
      this.userService.listRecords
    );
    this.server.get("/logout", verifyToken, this.userService.logout);
    this.server.get("/:id", verifyToken, this.userService.getUserProfileData);
    this.server.post(
      "/new",
      verifyToken,
      authorizeSuperAdmin,
      this.userService.createRecord
    );
    this.server.post("/login", this.userService.login);
    this.server.put("/:id", verifyToken, this.userService.updateRecord);
    this.server.put(
      "/:id/changeUserImage",
      verifyToken,
      parser.single("userImage"),
      this.userService.updateProfileImage
    );
    this.server.delete(
      "/:id",
      verifyToken,
      authorizeSuperAdmin,
      this.userService.deleteRecord
    );
  }
}

const userController = new UserController();
export default userController.server;
