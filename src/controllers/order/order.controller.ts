import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import OrderService from "../../business-logic-layer/order/order.service";
import { validateOrderInput } from "../../helpers/validation/order-input.validator";

class OrderController {
  public server = express.Router();
  private orderService = new OrderService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get("/list", verifyToken, this.orderService.listRecords);
    this.server.get("/:id", verifyToken, this.orderService.getById);
    this.server.post(
      "/new",
      validateOrderInput(),
      this.orderService.createRecord
    );
    this.server.put("/:id", verifyToken, this.orderService.updateRecord);
    this.server.delete("/:id", verifyToken, this.orderService.deleteRecord);
  }
}

const orderController = new OrderController();
export default orderController.server;
