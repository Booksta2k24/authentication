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
exports.UserRepository = void 0;
const createUser_1 = require("./user/createUser");
const findUser_1 = require("./user/findUser");
class UserRepository {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createUser_1.createUser)(newUser, this.usersModel);
        });
    }
    findUser(email) {
        return (0, findUser_1.findUser)(email, this.usersModel);
    }
}
exports.UserRepository = UserRepository;
