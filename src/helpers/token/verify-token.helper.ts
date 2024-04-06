import { Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../data-access-layer/user/user.model";

/**
 * @param req Get the 'x-access-token' header from it
 * @param res Send different statuses and messages to the client
 * @param next Continue the request process after token verification success
 */
const verifyToken = (req: any, res: Response, next: any) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });
  jwt.verify(token as string, process.env.JWT_PASSWORD, (err, decoded: any) => {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: "Failed to authenticate token." });

    // To use the user data in other places
    User.findById(decoded.id).then((user) => {
      req.user = user;
      next();
    });
  });
};

export default verifyToken;
