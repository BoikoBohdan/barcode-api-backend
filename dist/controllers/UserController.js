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
const express_1 = require("express");
const userServices_1 = require("../services/userServices");
const user_model_1 = require("../models/user/user.model");
class UserController {
    constructor() {
        this.basePath = '/user';
        this.requireAuth = true;
        this.router = express_1.Router();
        this.router.get('/all', this.getAllUser);
        this.router.get('/me', this.getCurrentUser);
    }
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req['userId'];
            const user = yield user_model_1.UserModel.findOne({ _id: userId });
            const userForResponse = userServices_1.UserService.pickUserInfo(user);
            return res.send(userForResponse);
        });
    }
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userServices_1.UserService.getUsersInfoWithOmit({});
            return res.send({ users });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map