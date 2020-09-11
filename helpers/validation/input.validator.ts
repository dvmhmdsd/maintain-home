import { body } from "express-validator";

export const validateInput = (method: string) => {
  switch (method) {
    case "createOrder": {
      return [
        body("name").exists().trim().escape(),
        body("email").exists().isEmail().trim().escape(),
        body("phone").exists().trim().escape(),
        body("gps.*").exists().trim().escape(),
        body("location").exists().trim().escape(),
        body("device").exists().trim().escape(),
        body("model").exists().trim().escape(),
        body("damage").exists().trim().escape(),
        body("time").exists().trim().escape(),
      ];
    }
  }
};
