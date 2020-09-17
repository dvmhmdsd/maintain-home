import { Request, Response } from "express";
import CoreService from "../core.service";
import Complaint from "../../data-access-layer/complaint/complaint.model";
import { IComplaint } from "../../CONSTANTS/interfaces/Complaint.interface";
import { sendEmailsToAllAdmins } from "../../helpers/email/email.helper";

export default class ComplaintService extends CoreService<IComplaint> {
  constructor() {
    super();
    this.initialize(Complaint, "Complaint");
    this.createRecord = this.createRecord.bind(this);
  }

  async createRecord(req: Request, res: Response, next: any) {
    try {
      const newRecord: IComplaint = await this._db.create({
        ...req.body,
      });
      res.json(newRecord);
      const { orderNumber, body } = newRecord;
      sendEmailsToAllAdmins(
        {
          orderNumber,
          body,
        },
        "complaint"
      );
    } catch (error) {
      next(error);
    }
  }
}
