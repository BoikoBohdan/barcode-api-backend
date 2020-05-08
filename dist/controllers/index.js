"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./UserController");
const notFound_1 = require("./notFound");
const AuthController_1 = require("./AuthController");
const BarcodeController_1 = require("./BarcodeController");
const ScraperController_1 = require("./ScraperController");
exports.controllers = [
    new AuthController_1.AuthController(),
    new ScraperController_1.ScraperController(),
    new BarcodeController_1.BarcodeController(),
    new UserController_1.UserController(),
    new notFound_1.NotFoundController(),
];
//# sourceMappingURL=index.js.map