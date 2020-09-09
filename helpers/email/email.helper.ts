import { IOrder } from './../../CONSTANTS/interfaces/order.interface';
import { IUser } from "../../CONSTANTS/interfaces/user.interface";
import User from "../../data-access-layer/user/user.model";

const sendEmail = async (userName: string, emailData: any) => {};

const getAllAdmins = async () => {
  let users: any = await User.find({});
  return users;
};

const sendEmailToClient = async (clientName: string, emailData: any) => {
  sendEmail(clientName, emailData);
};

const sendEmailsToAllAdmins = async (emailData: any) => {
  let admins = await getAllAdmins();
  admins.forEach((admin: IUser) => {
    sendEmail(admin.name, emailData);
  });
};

export { sendEmailsToAllAdmins, sendEmailToClient };
