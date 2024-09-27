"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const createUser_1 = require("./user/createUser");
const loginUser_1 = require("./user/loginUser");
class UserUseCase {
    constructor(userRepository, bcrypt, jwt) {
        this.userRepository = userRepository,
            this.bcrypt = bcrypt,
            this.jwt = jwt;
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstName, lastName, email, password, }) {
            return (0, createUser_1.createUser)(this.userRepository, this.bcrypt, firstName, lastName, email, password);
        });
    }
    loginUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            return (0, loginUser_1.loginUser)(this.userRepository, this.bcrypt, this.jwt, email, password);
        });
    }
}
exports.UserUseCase = UserUseCase;
