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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user/user.model");
const userServices_1 = require("../services/userServices");
class AuthController {
    constructor() {
        this.basePath = "/auth";
        this.router = express_1.Router();
        this.router.post("/sign-up", this.createNewUser);
        this.router.post("/login", this.loginUser);
    }
    createNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.UserModel(Object.assign({}, req.body));
            const errors = yield userServices_1.UserService.validateUserToCreate(user);
            if (errors) {
                return res.status(422).send(errors);
            }
            yield user.save();
            res.send(`User with email: ${req.body.email} was saved!`);
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = userServices_1.UserService.validateUserForLogin(req.body);
            if (errors) {
                return res.status(422).send(errors);
            }
            const user = yield user_model_1.UserModel.findOne({
                email: req.body.email,
            });
            if (!user) {
                return res.status(422).send({ errors: ["No user with provided email!"] });
            }
            const isCorrectPassword = user.comparePassword(req.body.password);
            if (!isCorrectPassword) {
                return res.status(422).send({ errors: ["Incorrect password!"] });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 86400,
            });
            return res.send({ token });
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map