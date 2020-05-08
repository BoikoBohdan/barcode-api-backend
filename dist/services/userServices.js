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
const user_model_1 = require("../models/user/user.model");
const ramda_1 = require("ramda");
const errorHandler_1 = require("../utils/errorHandler");
class UserService {
    static pickUserInfo(user) {
        return ramda_1.pick(["firstName", "lastName", "email"])(user);
    }
    static pickUsersInfo(users) {
        return ramda_1.map(this.pickUserInfo)(users);
    }
    static getUsersInfoWithOmit(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.UserModel.find(params);
            return this.pickUsersInfo(users);
        });
    }
    static validateUserToCreate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationErrors = user.validateSync();
            if (validationErrors) {
                const normalizedErrors = errorHandler_1.ErrorHandler.transformMongooseErrors(validationErrors);
                return { errors: normalizedErrors };
            }
            const userInDB = yield user_model_1.UserModel.find({ email: user.email });
            if (userInDB.length) {
                return { errors: ["User with provided email exist in the system!"] };
            }
            return null;
        });
    }
    static validateUserForLogin(user) {
        if (!user.email) {
            return { errors: ["Email is required!"] };
        }
        if (!user.password) {
            return { errors: ["Password is required!"] };
        }
        return null;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userServices.js.map