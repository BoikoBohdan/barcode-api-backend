"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scrapper_joi_1 = require("./scrapper.joi");
const ScraperSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: true,
    },
    rule: {
        barcode: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        description: String,
        photoUrl: String,
        category: String,
        productUrl: String,
    },
    user: mongoose_1.default.Types.ObjectId,
});
ScraperSchema.methods.validate = function () {
    return scrapper_joi_1.ScraperValidateSchema.validate(this);
};
const ScraperModel = mongoose_1.default.model('Scraper', ScraperSchema);
exports.ScraperModel = ScraperModel;
//# sourceMappingURL=scraper.model.js.map