import { Response } from "express";
import { IUser } from "../../../CONSTANTS/interfaces/user.interface";
import { ErrorHandler } from "../error/error-handler.helper";
import { UserTypes } from "../../../CONSTANTS/enums/user-types.enum";

/**
 *
 * @param req Get the current user from it
 * @param res
 * @param next
 */
const authorizeSuperAdmin = (req: any, res: Response, next: any) => {
  if (!req.user || req.user.type !== UserTypes.SUPER_ADMIN) {
    throw new ErrorHandler(
      403,
      "You are not authorized to perform this action !"
    );
  }

  next();
};

export default authorizeSuperAdmin;
