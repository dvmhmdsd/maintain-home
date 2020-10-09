import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CoreService from "../core.service";
import { IOrder } from "../../../CONSTANTS/interfaces/order.interface";
import Order from "../../data-access-layer/order/order.model";
import {
  sendEmailToClient,
  sendEmailsToAllAdmins,
} from "../../helpers/email/email.helper";
import { ErrorHandler } from "../../helpers/error/error-handler.helper";
import Device from "../../data-access-layer/order/device.model";

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
      const records: IOrder[] = await this._db
        .find({}, "orderNumber name status createdAt _id phone")
        .sort({ createdAt: -1 });
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: any) {
    const { id } = req.params;
    try {
      const order: IOrder = await this._db.findById(id).populate("device");
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async createRecord(req: Request, res: Response, next: any) {
    const {
      name,
      email,
      phone,
      whatsapp,
      gps,
      location,
      device,
      model,
      damage,
      time,
      paymentType,
      customDevice,
    } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const orderNumber = await this.createOrderNumber();
      const order: any = new Order({
        name,
        email,
        phone,
        whatsapp,
        gps,
        location,
        customDevice,
        model,
        damage,
        time,
        orderNumber,
        paymentType,
      });

      if (device) {
        order.device = device;
      }

      const newOrder: IOrder = await order.save();
      res.json(newOrder);

      const orderDevice: any = await Device.findById(newOrder.device);

      sendEmailToClient(email, {
        name,
        email,
        phone,
        whatsapp,
        location,
        device: orderDevice.arabicName,
        damage,
        orderNumber,
      });
      sendEmailsToAllAdmins(
        {
          name,
          orderNumber,
          orderLink: `${this.getCompleteUrl(req)}/orders/${newOrder._id}`,
        },
        "order"
      );
    } catch (error) {
      next(error);
    }
  }

  async updateRecord(req: Request, res: Response, next: any) {
    const { id } = req.params;

    try {
      const updatedRecord: IOrder = await this._db.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );

      if (!updatedRecord) {
        throw new ErrorHandler(404, "The Item you want to update is not found");
      }
      res.json(updatedRecord);
      const { name, email, orderNumber } = updatedRecord;
      sendEmailToClient(
        email,
        {
          name,
          orderNumber,
          feedbackLink: this.getCompleteUrl(req) + "/feedback",
        },
        true
      );
    } catch (error) {
      next(error);
    }
  }

  private getCompleteUrl(req: Request) {
    return "https://" + req.get("host");
  }

  /**
   * Returns string like this: "ORC201" as "20" is the current year and "1" is the order number
   */
  private async createOrderNumber() {
    const lastAddedOrder: IOrder = await this._db
      .findOne({})
      .sort({ createdAt: -1 });
    const currentYear = new Date().getFullYear().toString().substr(2);

    if (!lastAddedOrder) {
      return `ORC${currentYear}1`;
    }

    const lastAddedOrderNumber = +lastAddedOrder.orderNumber.substr(-1);
    return `ORC${currentYear}${lastAddedOrderNumber + 1}`;
  }
}
