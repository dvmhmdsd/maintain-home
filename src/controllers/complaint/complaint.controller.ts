import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import ComplaintService from "../../business-logic-layer/complaint/complaint.service";
import { validateComplaintInput } from "../../helpers/validation/complaint-input.validator";
import { IController } from "./../../../CONSTANTS/interfaces/controller.interface";

class ComplaintController implements IController {
  public server = express.Router();
  private complaintService = new ComplaintService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get("/list", verifyToken, this.complaintService.listRecords);
    this.server.post(
      "/new",
      validateComplaintInput(),
      this.complaintService.createRecord
    );
    this.server.delete("/:id", verifyToken, this.complaintService.deleteRecord);
  }
}

const complaintController = new ComplaintController();
export default complaintController.server;
