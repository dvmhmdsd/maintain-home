import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import DeviceService from "../../business-logic-layer/order/device.service";

const server = express.Router();
const deviceService = new DeviceService();

server.get("/list", verifyToken, deviceService.listRecords);
server.post("/new", verifyToken, deviceService.createRecord);
server.put("/:id", verifyToken, deviceService.updateRecord);
server.delete("/:id", verifyToken, deviceService.deleteRecord);

export default server;
