import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CoreService from "../core.service";
import User from "../../data-access-layer/user/user.model";
import { IUser } from "../../CONSTANTS/interfaces/user.interface";
import {
  ErrorHandler,
} from "../../helpers/error/error-handler.helper";

export default class UserService extends CoreService<IUser> {
  constructor() {
    super();
    this.initialize(User, "User");
    this.login = this.login.bind(this);
    this.listRecords = this.listRecords.bind(this);
    this.getUserProfileData = this.getUserProfileData.bind(this);
    this.updateProfileImage = this.updateProfileImage.bind(this);
  }

  async listRecords(req: Request, res: Response, next: any) {
    try {
      const records = await this._db.find({}, "name type email image");
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  async getUserProfileData(req: Request, res: Response, next: any) {
    const { id } = req.params;
    try {
      const user: IUser = await this._db.findById(
        id,
        "name email image type"
      );
      if (!user) {
        throw new ErrorHandler(404, "User is not found");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async createRecord(req: Request, res: Response, next: any) {
    const { email, name, password, image, type } = req.body;
    await this.checkUserExistence(email, res, next);
    try {
      const hash = await this.createHash(password);
      const user = new User({
        email,
        name,
        password: hash,
        image,
        type,
      });
      let newUser: IUser = await this._db.create(user);
      res.json({
        _id: newUser._id,
        name: newUser.name,
        type: newUser.type,
        image: newUser.image,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRecord(req: Request, res: Response, next: any) {
    const { id } = req.params;

    try {
      const updatedRecord = await this._db.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );

      if (!updatedRecord) {
        throw new ErrorHandler(404, "The Item you want to update is not found");
      }
      let { email, name, type, _id, image } = updatedRecord;
      res.json({ email, name, type, _id, image });
    } catch (error) {
      next(error);
    }
  }

  private async checkUserExistence(email: string, res: Response, next: any) {
    try {
      const users = await this._db.find({ email });
      console.log(users);
      if (users && users.length > 0) {
        throw new ErrorHandler(400, "The email is already used.");
      }
    } catch (error) {
      next(error);
    }
  }

  private async createHash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async isPasswordsMatches(hash: string, password: string) {
    let result = await bcrypt.compare(password, hash);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  private createToken(user: IUser) {
    return jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, {
      expiresIn: 5184000, // 1 day
    });
  }

  async login(req: Request, res: Response, next: any) {
    const { email, password } = req.body;

    try {
      const user: IUser = await this._db.findOne(
        { email },
        "_id name email image type password"
      );

      if (!user) {
        throw new ErrorHandler(401, "The email is incorrect !");
      }

      let result = await this.isPasswordsMatches(user.password, password);
      if (!result) {
        throw new ErrorHandler(401, "Password is incorrect");
      }

      const token = this.createToken(user);
      let userObj: IUser = {
        _id: user._id,
        name: user.name,
        type: user.type,
        image: user.image,
        email: user.email,
      };
      res.json({
        token,
        user: userObj,
      });
    } catch (error) {
      next(error);
    }
  }

  logout(req: any, res: Response) {
    req.user = null;
    res.json({ success: true });
  }

  async updateProfileImage(req: any, res: Response, next: any) {
    const { id } = req.params;
    let usrImage = req.file.secure_url;

    try {
      let { email, name, type, _id, image } = await this._db.findByIdAndUpdate(
        id,
        { $set: { usrImage } },
        { new: true }
      );

      res.json({ email, name, type, _id, image });
    } catch (error) {
      next(error);
    }
  }
}
