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
      let fullRate = await this._db.find({ rate: 5 });
      let subFullRate = await this._db.find({ rate: 4 });
      let threeRate = await this._db.find({ rate: 3 });
      res.json({
        records,
        counts: {
          5: fullRate.length,
          4: subFullRate.length,
          3: threeRate.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
