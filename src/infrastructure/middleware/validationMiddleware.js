"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const errorResponse_1 = __importDefault(require("../../usecase/handler/errorResponse"));
// Middleware to handle express-validator errors
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const errArr = [];
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        for (let err of errorArray) {
            errArr.push(err === null || err === void 0 ? void 0 : err.msg);
        }
        console.log(errArr);
        throw errorResponse_1.default.badRequest(errArr.join(','));
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
