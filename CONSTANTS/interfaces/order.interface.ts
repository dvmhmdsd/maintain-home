import { OrderStatuses } from "../enums/order-statuses.enum";

export interface IOrder {
  _id?: any;
  name: string;
  email: string;
  phone: string;
  gps: string;
  device: string;
  model: string;
  damage: string;
  time: string;
  orderNumber: string;
  paymentType: string;
  status?: OrderStatuses.CLOSED | OrderStatuses.COMPLETED | OrderStatuses.PENDING;
}