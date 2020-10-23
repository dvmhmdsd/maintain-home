import express, { Request, Response } from "express";
import Order from "../data-access-layer/order/order.model";
import Complaint from "../data-access-layer/complaint/complaint.model";

export class LookupsService {
  async getHomeLookups(
    req: Request,
    res: Response,
    next: express.NextFunction
  ) {
    try {
      const ordersCount = await Order.countDocuments({});
      const complaintsCount = await Complaint.countDocuments({});

      res.json({ orders: ordersCount, complaints: complaintsCount });
    } catch (error) {
      next(error);
    }
  }
}
