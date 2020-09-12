import { Request, Response } from "express";
import Order from "../data-access-layer/order/order.model";
import Complaint from "../data-access-layer/complaint/complaint.model";

export class LookupsService {
  async getHomeLookups(req: Request, res: Response, next: any) {
    try {
      let ordersCount = await Order.countDocuments({}),
        complaintsCount = await Complaint.countDocuments({});

      res.json({ orders: ordersCount, complaints: complaintsCount });
    } catch (error) {
      next(error);
    }
  }
}
