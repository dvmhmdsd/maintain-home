import { body } from "express-validator";

export const validateFeedbackInput = () => {
  return [
    body("name").exists().trim().escape(),
    body("arabicName").exists().trim().escape(),
    body("rate").exists(),
  ];
};
