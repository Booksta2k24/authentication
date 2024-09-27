"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const errorHandler_1 = __importDefault(require("../../usecase/handler/errorHandler"));
const rateLimit_1 = __importDefault(require("./rateLimit"));
exports.app = (0, express_1.default)();
exports.app.use(rateLimit_1.default);
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json({ limit: '50mb' }));
exports.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
exports.app.use('/api/user', userRoutes_1.default);
exports.app.use(errorHandler_1.default);
