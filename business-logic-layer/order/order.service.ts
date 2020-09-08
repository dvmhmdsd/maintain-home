import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import CoreService from "../core.service";
import { IOrder } from "../../CONSTANTS/interfaces/order.interface";
import Order from "../../data-access-layer/order/order.model";

export default class OrderService extends CoreService<IOrder> {
  constructor() {
    super();
    this.initialize(Order, "Order");
  }

  async createRecord(req: Request, res: Response, next: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const newRecord: IOrder = await this._db.create({
        ...req.body,
      });
      res.json(newRecord);
    } catch (error) {
      next(error)
    }
  }
}
