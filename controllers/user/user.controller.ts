import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import authorizeSuperAdmin from "../../helpers/auth/super-auth.helper";
import UserService from "../../business-logic-layer/user/user.service";
const server = express.Router();

const userService = new UserService();

server.get("/list", verifyToken, userService.listRecords);
server.get("/logout", verifyToken, userService.logout);
server.get("/:id", verifyToken, userService.getUserProfileData);
server.post("/new", verifyToken, authorizeSuperAdmin, userService.createRecord);
server.post("/login", userService.login);
server.put("/:id", verifyToken, userService.updateRecord);
server.delete(
  "/:id",
  verifyToken,
  authorizeSuperAdmin,
  userService.deleteRecord
);

export default server;
