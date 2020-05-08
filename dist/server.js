"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const middlewares_1 = require("./middlewares");
class Server {
    constructor({ controllers, middlewares }) {
        this.app = express_1.default();
        this.connectionToServer();
        this.setupMiddlewares(middlewares);
        this.setupController(controllers);
    }
    connectionToServer() {
        mongoose_1.default.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true }, () => {
            console.log('Successfully connected to db!');
        });
    }
    setupMiddlewares(middlewares) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    setupController(controllers) {
        controllers.forEach((controller) => {
            if (controller.requireAuth) {
                this.app.use(controller.basePath, middlewares_1.authMiddleware, controller.router);
            }
            else {
                this.app.use(controller.basePath, controller.router);
            }
        });
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server started at port ', process.env.PORT);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map