import { Request, Response } from "express";
import { validationResult } from "express-validator/check";
import CoreService from "../core.service";
import { IOrder } from "../../CONSTANTS/interfaces/order.interface";
import Order from "../../data-access-layer/order/order.model";
import { sendEmailToClient, sendEmailsToAllAdmins } from "../../helpers/email/email.helper";

export default class OrderService extends CoreService<IOrder> {
  constructor() {
    super();
    this.initialize(Order, "Order");
  }

  async createRecord(req: Request, res: Response, next: any) {
    let { name, email, phone, gps, device, model, damage, time } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      let orderNumber = await this.createOrderNumber();

      const order = new Order({
        name,
        email,
        phone,
        gps,
        device,
        model,
        damage,
        time,
        orderNumber,
      });

      let newOrder: IOrder = await this._db.create(order);
      res.json(newOrder);

      sendEmailToClient(name, {
        orderNumber
      });
      sendEmailsToAllAdmins(newOrder)
    } catch (error) {
      next(error);
    }
  }

  /**
   * Returns string like this: "orch201" as "20" is the current year and "1" is the order number
   */
  private async createOrderNumber() {
    let lastAddedOrder: IOrder = await this._db
        .find({})
        .sort({ createdAt: -1 })[0],
      currentYear = new Date().getFullYear().toString().substr(2);
    if (!lastAddedOrder) {
      return `orch${currentYear}1`;
    }

    let lastAddedOrderNumber = +lastAddedOrder.orderNumber.substr(-1);
    return `orch${currentYear}${lastAddedOrderNumber + 1}`;
  }
}
