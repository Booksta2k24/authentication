"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../infrastructure/types/enums");
class ErrorResponse extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    static badRequest(msg) {
        return new ErrorResponse(enums_1.StatusCodes.BAD_REQUEST, msg);
    }
    static unauthorized(msg) {
        return new ErrorResponse(enums_1.StatusCodes.UNAUTHORIZED, msg);
    }
    static forbidden(msg) {
        return new ErrorResponse(enums_1.StatusCodes.FORBIDDEN, msg);
    }
    static notFound(msg = "Not found") {
        return new ErrorResponse(enums_1.StatusCodes.NOT_FOUND, msg);
    }
    static internalError(msg) {
        return new ErrorResponse(enums_1.StatusCodes.INTERNAL_SERVER_ERROR, msg);
    }
}
exports.default = ErrorResponse;
