import { Request, Response } from "express";
import CoreService from "../core.service";
import Feedback from "../../data-access-layer/feedback/feedback.model";
import { IFeedback } from "./../../CONSTANTS/interfaces/feedback.interface";

export default class FeedbackService extends CoreService<IFeedback> {
  constructor() {
    super();
    this.initialize(Feedback, "Feedback");
    this.listRecords = this.listRecords.bind(this);
  }

  async listRecords(req: Request, res: Response, next: any) {
    try {
      const records: IFeedback[] = await this._db.find({ rate: { $gte: 3 } });
      res.json({
        records
      });
    } catch (error) {
      next(error);
    }
  }
}
