"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class NotFoundController {
    constructor() {
        this.basePath = "/";
        this.router = express_1.Router();
        this.router.use("/", this.notFoundHandler);
    }
    notFoundHandler(req, res) {
        res.status(404).send({
            message: "Unable to find the requested resource!",
        });
    }
}
exports.NotFoundController = NotFoundController;
//# sourceMappingURL=notFound.js.map