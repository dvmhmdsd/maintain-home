"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
/**
 * @param err The error that will be sent to the client
 * @param res The response object that will send the error to the client
 */
const handleError = (err, res) => {
    const { statusCode, message } = err;
    console.log(err);
    res.status(statusCode).json({
        msg: message,
    });
};
exports.handleError = handleError;
//# sourceMappingURL=error-handler.helper.js.map