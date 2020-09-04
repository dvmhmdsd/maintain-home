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

/**
 * @param err The error that will be sent to the client
 * @param res The response object that will send the error to the client
 */
const handleError = (
  err: { statusCode: number; message: string },
  res?: Response
) => {
  const { statusCode = 500, message } = err;
  console.log(err)
  res.status(statusCode).json({
    msg: message,
  });
};

export { ErrorHandler, handleError };
