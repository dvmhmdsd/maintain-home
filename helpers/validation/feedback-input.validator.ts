import { body } from "express-validator";

export const validateFeedbackInput = () => {
  return [
    body("clientName").exists().trim().escape(),
    body("rate").exists(),
  ];
};
