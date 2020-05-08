"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
class ErrorHandler {
    static transformMongooseErrors(validationErrors) {
        return ramda_1.compose(ramda_1.map(ramda_1.prop("message")), ramda_1.values, ramda_1.prop("errors"))(validationErrors);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map