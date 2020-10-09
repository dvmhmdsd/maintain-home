import express from "express";
import { IController } from "../../../CONSTANTS/interfaces/controller.interface";
import FeedbackService from "../../business-logic-layer/feedback/feedback.service";
import { validateFeedbackInput } from "../../helpers/validation/feedback-input.validator";

class FeedbackController implements IController {
  public server = express.Router();
  private feedbackService = new FeedbackService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get("/list", this.feedbackService.listRecords);
    this.server.post(
      "/new",
      validateFeedbackInput(),
      this.feedbackService.createRecord
    );
  }
}

const feedbackController = new FeedbackController();
export default feedbackController.server;
