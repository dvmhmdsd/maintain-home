import { sgMail, templates } from "../../config/mailer";
import { IUser } from "../../CONSTANTS/interfaces/user.interface";
import User from "../../data-access-layer/user/user.model";
import { handleError } from "../error/error-handler.helper";

const sendEmail = async (
  userEmail: string,
  emailData: any,
  templateId: string
) => {
  const msg = {
    to: userEmail,
    from: "support@orchidiaast.com",
    templateId,
    dynamic_template_data: emailData,
  };

  sgMail.send(msg, false, (error, result) => {
    if (error) {
      handleError({ statusCode: 500, message: error.message });
    }
  });
};

const getAllAdmins = async () => {
  let users: any = await User.find({});
  return users;
};

const sendEmailToClient = async (
  clientEmail: string,
  emailData: any,
  isEmailForUpdate?: boolean
) => {
  let emailTemplate = isEmailForUpdate
    ? templates.client_order_updated
    : templates.client_order_created;
  sendEmail(clientEmail, emailData, emailTemplate);
};

const sendEmailsToAllAdmins = async (emailData: any, emailType: string) => {
  let admins = await getAllAdmins();
  admins.forEach((admin: IUser) => {
    let emailTemplate =
      emailType === "order" ? templates.admin_order : templates.complaint;
    sendEmail(admin.email, emailData, emailTemplate);
  });
};

export { sendEmailsToAllAdmins, sendEmailToClient };
