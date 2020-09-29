import dotenv from 'dotenv';
import sgMail from "@sendgrid/mail";

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = {
  client_order_created: "d-5ff67f1523674ad492da0f7c044e627c",
  client_order_updated: "d-92d6449bd4f740e8bc9560b65dc90e61",
  admin_order: "d-1ca8d83609a848e7bc819ac8c33e8ea0",
  complaint: "d-34083fa9067a4598839a8ec0938d413d",
};

export { sgMail, templates };
