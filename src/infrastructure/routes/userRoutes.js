"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userInjection_1 = require("./injections/userInjection");
const express_validator_1 = require("express-validator");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const constants_1 = require("../../utils/constants");
const router = express_1.default.Router();
router.post('/signup', [
    (0, express_validator_1.body)('firstName')
        .notEmpty().withMessage(constants_1.FNAME_REQ)
        .isAlpha().withMessage(constants_1.FNAME_CONTAINS),
    (0, express_validator_1.body)('lastName')
        .notEmpty().withMessage(constants_1.LNAME_REQ)
        .isAlpha().withMessage(constants_1.LNAME_CONTAINS),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage(constants_1.INVALID_MSG)
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .matches(process.env.PD_KEY)
        .withMessage(constants_1.PD_MSG),
    validationMiddleware_1.handleValidationErrors
], (req, res, next) => {
    userInjection_1.userController.createUser(req, res, next);
});
router.post('/login', [
    (0, express_validator_1.body)('email')
        .isEmail().withMessage(constants_1.INVALID_MSG).normalizeEmail(),
    (0, express_validator_1.body)('password').matches(process.env.PD_KEY)
        .withMessage(constants_1.PD_MSG),
    validationMiddleware_1.handleValidationErrors
], (req, res, next) => {
    userInjection_1.userController.loginUser(req, res, next);
});
exports.default = router;
