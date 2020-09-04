import { Request, Response } from "express";
import mongoose from "mongoose";
import { ErrorHandler } from "../helpers/error/error-handler.helper";

export default class CoreService {
  protected _db: any;
  protected _name: string;

  constructor() {
    this.initialize = this.initialize.bind(this);
    this.listRecords = this.listRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  initialize(Model: mongoose.Model<mongoose.Document>, name: string) {
    this._db = Model;
    this._name = name;
  }

  async listRecords(req: Request, res: Response, next: any) {
    try {
      const records = await this._db.find({});
      res.json(records);
      next();
    } catch (error) {
      next(error);
    }
  }

  async createRecord(req: Request, res: Response, next: any) {
    try {
      const newRecord = await this._db.create({
        ...req.body,
      });
      res.json(newRecord);
      next();
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
      res.json(updatedRecord);
      next();
    } catch (error) {
      next(error);
    }
  }

  async deleteRecord(req: Request, res: Response, next: any) {
    const { id } = req.params;

    try {
      const bookToBeDeleted = await this._db.findByIdAndRemove(id);

      if (!bookToBeDeleted) {
        throw new ErrorHandler(404, "The Item you want to delete is not found");
      }
      res.json({
        msg: `${this._name} has been deleted successfully!`,
      });
      next();
    } catch (error) {
      next(error);
    }
  }
}
