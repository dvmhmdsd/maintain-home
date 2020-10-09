import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import OrderService from "../../business-logic-layer/order/order.service";
import { validateOrderInput } from "../../helpers/validation/order-input.validator";

const server = express.Router();
const orderService = new OrderService();

server.get("/list", verifyToken, orderService.listRecords);
server.get("/:id", verifyToken, orderService.getById);
server.post("/new", validateOrderInput(), orderService.createRecord);
server.put("/:id", verifyToken, orderService.updateRecord);
server.delete("/:id", verifyToken, orderService.deleteRecord);

export default server;
