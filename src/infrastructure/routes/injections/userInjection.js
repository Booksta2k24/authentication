"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userController_1 = require("../../../controller/userController");
const userUseCase_1 = require("../../../usecase/usecase/userUseCase");
const userModel_1 = __importDefault(require("../../database/model/userModel"));
const userRepository_1 = require("../../database/repository/userRepository");
const bcrypt_1 = __importDefault(require("../../services/bcrypt"));
const jwt_1 = __importDefault(require("../../services/jwt"));
const userRepository = new userRepository_1.UserRepository(userModel_1.default);
const bcrypt = new bcrypt_1.default();
const jwt = new jwt_1.default();
const userUsecase = new userUseCase_1.UserUseCase(userRepository, bcrypt, jwt);
const userController = new userController_1.UserController(userUsecase);
exports.userController = userController;
