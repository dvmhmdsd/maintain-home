import { Response } from "express";
class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (
  err: { statusCode: number; message: string },
  res: Response
) => {
  const { statusCode, message } = err;
  console.log(err);
  res.status(statusCode).json({
    msg: message,
  });
};

export default {
  ErrorHandler,
  handleError,
};
