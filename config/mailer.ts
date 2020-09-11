import sgMail from "@sendgrid/mail";

sgMail.setApiKey("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");
const templates = {
  client_order: "d-2fed8ecb1ef1422781e305dfdf97b50f",
  admin_order: "d-37c9355260184f609c074515cbd5efa0",
  complaint: "d-d8c2f380add241f6adff4401953e201a"
};

export {
    sgMail,
    templates
}
