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
exports.UserController = void 0;
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userUseCase.createUser(req.body);
                if (newUser) {
                    res.status(newUser.status).json({
                        success: newUser.success,
                        message: newUser.message,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userUseCase.loginUser(req.body);
                if (user) {
                    res.cookie("userAccessToken", user.token.userAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 900000
                    });
                    res.cookie("userRefreshToken", user.token.userRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000
                    });
                }
                res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message,
                    userAccessToken: user.token.userAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
