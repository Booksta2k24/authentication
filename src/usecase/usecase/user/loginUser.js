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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const enums_1 = require("../../../infrastructure/types/enums");
const loginUser = (userRepository, bcrypt, jwt, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findUser(email);
        console.log('===user=== ', user);
        if (user && user._id) {
            if (user.isBlock) {
                throw errorResponse_1.default.badRequest('You are corrently blocked');
            }
            const match = yield bcrypt.compare(password, user.password);
            if (match) {
                const { accessToken, refreshToken } = yield jwt.createJWT(user._id, user.email, "user", user.firstName);
                const responseData = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profileImage: user.profileImage,
                };
                return {
                    status: enums_1.StatusCodes.OK,
                    success: true,
                    data: responseData,
                    token: {
                        userAccessToken: accessToken,
                        userRefreshToken: refreshToken
                    },
                    message: `Login successful, welcome ${user.firstName}`
                };
            }
            throw errorResponse_1.default.badRequest('wrong password or email');
        }
        throw errorResponse_1.default.badRequest('wrong password or email');
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
