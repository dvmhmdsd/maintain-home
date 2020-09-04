"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import User from "../models/User.model";
/**
 * @param req Get the 'x-access-token' header through it
 * @param res Send different statuses and messages to the client
 * @param next Continue the request process after token verification success
 */
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).json({ auth: false, message: "No token provided." });
    jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        if (err)
            return res
                .status(500)
                .json({ auth: false, message: "Failed to authenticate token." });
        // To use the user data in other places
        // User.findById(decoded.id).then((user) => {
        //   req.user = user;
        // });
        next();
    });
};
exports.default = verifyToken;
//# sourceMappingURL=verfiy-token.helper.js.map