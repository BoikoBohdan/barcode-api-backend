"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = require("./server");
const controllers_1 = require("./controllers");
dotenv_1.default.config();
const server = new server_1.Server({
    controllers: controllers_1.controllers,
    middlewares: [
        body_parser_1.default.urlencoded({
            extended: true,
        }),
        body_parser_1.default.json(),
    ],
});
server.app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({
        message: "Server Error!",
    });
});
server.listen();
//# sourceMappingURL=index.js.map