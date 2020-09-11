import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import authorizeSuperAdmin from "../../helpers/auth/super-auth.helper";
import OrderService from "../../business-logic-layer/order/order.service";
import { validateInput } from '../../helpers/validation/input.validator';

const server = express.Router();
const orderService = new OrderService();

server.get("/list", verifyToken, orderService.listRecords);
server.get("/:id", verifyToken, orderService.getById);
server.post("/new", validateInput("createOrder"), orderService.createRecord);
server.put("/:id", verifyToken, orderService.updateRecord);
server.delete(
  "/:id",
  verifyToken,
  authorizeSuperAdmin,
  orderService.deleteRecord
);

export default server;
