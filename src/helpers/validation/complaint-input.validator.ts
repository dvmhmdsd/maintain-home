import { body } from "express-validator";

export const validateComplaintInput = () => {
  return [
    body("orderNumber").exists().trim().escape(),
    body("body").exists().trim().escape(),
  ];
};
