import sgMail from "@sendgrid/mail";

const setSendGridKey = (key: string) => {
  sgMail.setApiKey(key);
}

const templates = {
  client_order: "d-2fed8ecb1ef1422781e305dfdf97b50f",
  admin_order: "d-37c9355260184f609c074515cbd5efa0",
  complaint: "d-d8c2f380add241f6adff4401953e201a",
};

export { sgMail, templates, setSendGridKey };
