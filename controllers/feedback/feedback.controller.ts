import express from "express";
import FeedbackService from "../../business-logic-layer/feedback/feedback.service";
import { validateFeedbackInput } from "../../helpers/validation/feedback-input.validator";

const server = express.Router();

const feedbackService = new FeedbackService();

server.get("/list", feedbackService.listRecords);
server.post("/new", validateFeedbackInput(), feedbackService.createRecord);

export default server;
