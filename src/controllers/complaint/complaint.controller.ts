import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import ComplaintService from "../../business-logic-layer/complaint/complaint.service";
import { validateComplaintInput } from "../../helpers/validation/complaint-input.validator";

const server = express.Router();

const complaintService = new ComplaintService();

server.get("/list", verifyToken, complaintService.listRecords);
server.post("/new", validateComplaintInput(), complaintService.createRecord);
server.delete("/:id", verifyToken, complaintService.deleteRecord);

export default server;
