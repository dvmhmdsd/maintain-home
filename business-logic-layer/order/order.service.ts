import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CoreService from "../core.service";
import { IOrder } from "../../CONSTANTS/interfaces/order.interface";
import Order from "../../data-access-layer/order/order.model";
import {
  sendEmailToClient,
  sendEmailsToAllAdmins,
} from "../../helpers/email/email.helper";

export default class OrderService extends CoreService<IOrder> {
  constructor() {
    super();
    this.initialize(Order, "Order");
    this.listRecords = this.listRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.getById = this.getById.bind(this);
  }

  async listRecords(req: Request, res: Response, next: any) {
    try {
      const records: IOrder[] = await this._db.find({}).sort({ createdAt: -1 });
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: any) {
    let { id } = req.params;
    try {
      const order: IOrder = await this._db.findById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async createRecord(req: Request, res: Response, next: any) {
    let {
      name,
      email,
      phone,
      gps,
      location,
      device,
      model,
      damage,
      time,
      paymentType,
    } = req.body;
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
        location,
        device,
        model,
        damage,
        time,
        orderNumber,
        paymentType,
      });

      let newOrder: IOrder = await this._db.create(order);
      res.json(newOrder);

      sendEmailToClient(email, {
        name,
        orderNumber,
      });
      sendEmailsToAllAdmins({
        name,
        orderNumber,
        orderLink: `${this.getCompleteUrl(req)}/orders/${newOrder._id}`,
      }, "order");
    } catch (error) {
      next(error);
    }
  }

  private getCompleteUrl(req: Request) {
    return req.protocol + "://" + req.get("host");
  }

  /**
   * Returns string like this: "orch201" as "20" is the current year and "1" is the order number
   */
  private async createOrderNumber() {
    let lastAddedOrder: IOrder = await this._db
        .findOne({})
        .sort({ createdAt: -1 }),
      currentYear = new Date().getFullYear().toString().substr(2);

    if (!lastAddedOrder) {
      return `orch${currentYear}1`;
    }

    let lastAddedOrderNumber = +lastAddedOrder.orderNumber.substr(-1);
    return `orch${currentYear}${lastAddedOrderNumber + 1}`;
  }
}
