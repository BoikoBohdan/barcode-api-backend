"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const barcodeSchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
        required: true,
    },
    UPCEAN: {
        type: String,
        required: true,
    },
});
const barcodeModel = mongoose_1.default.model('Barcode', barcodeSchema);
exports.barcodeModel = barcodeModel;
//# sourceMappingURL=barcode.model.js.map