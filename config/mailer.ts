import dotenv from 'dotenv';
import sgMail from "@sendgrid/mail";

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = {
  client_order_created: "d-2fed8ecb1ef1422781e305dfdf97b50f",
  client_order_updated: "d-6c774a55a65f40c0aae5c2635ff881cc",
  admin_order: "d-37c9355260184f609c074515cbd5efa0",
  complaint: "d-d8c2f380add241f6adff4401953e201a",
};

export { sgMail, templates };
