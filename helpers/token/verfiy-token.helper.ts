import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// import User from "../models/User.model";

/**
 * @param req Get the 'x-access-token' header through it
 * @param res Send different statuses and messages to the client
 * @param next Continue the request process after token verification success
 */
const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });

  jwt.verify(token as string, process.env.JWT_PASSWORD, (err, decoded) => {
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

export default verifyToken;
