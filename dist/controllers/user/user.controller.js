"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_token_helper_1 = __importDefault(require("../../helpers/token/verify-token.helper"));
const super_auth_helper_1 = __importDefault(require("../../helpers/auth/super-auth.helper"));
const user_service_1 = __importDefault(require("../../business-logic-layer/user/user.service"));
const server = express_1.default.Router();
const userService = new user_service_1.default();
server.get("/list", verify_token_helper_1.default, userService.listRecords);
server.get("/:id", verify_token_helper_1.default, userService.getUserProfileData);
server.post("/new", userService.createRecord);
server.put("/:id", verify_token_helper_1.default, userService.updateRecord);
server.delete("/:id", verify_token_helper_1.default, super_auth_helper_1.default, userService.deleteRecord);
exports.default = server;
//# sourceMappingURL=user.controller.js.map