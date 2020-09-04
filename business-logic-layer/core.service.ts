import { Request, Response } from "express";
import { ErrorHandler } from "../helpers/error/error-handler.helper";

export default class CoreService {
  db: any;
  name: string;

  constructor() {
    this.initialize = this.initialize.bind(this);
    this.listRecords = this.listRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  initialize(Model: any, name: string) {
    this.db = Model;
    this.name = name;
  }

  async listRecords(req: Request, res: Response, next: any) {
    try {
      let records = await this.db.find({});
      res.json(records);
      next();
    } catch (error) {
      next(error);
    }
  }

  async createRecord(req: Request, res: Response, next: any) {
    try {
      let newRecord = await this.db.create({
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
      let updatedRecord = await this.db.findByIdAndUpdate(
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
      let bookToBeDeleted = await this.db.findByIdAndRemove(id);

      if (!bookToBeDeleted) {
        throw new ErrorHandler(404, "The Item you want to delete is not found");
      }
      res.json({
        msg: `${this.name} has been deleted successfully!`,
      });
      next();
    } catch (error) {
      next(error);
    }
  }
}
