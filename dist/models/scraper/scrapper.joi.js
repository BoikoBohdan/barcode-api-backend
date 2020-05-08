"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ScraperValidateSchema = joi_1.default.object({
    url: joi_1.default.string().uri().min(5).required(),
    rule: joi_1.default.object({
        barcode: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        description: joi_1.default.string(),
        productUrl: joi_1.default.string(),
        photoUrl: joi_1.default.string(),
        category: joi_1.default.string(),
    }),
});
exports.ScraperValidateSchema = ScraperValidateSchema;
[
    {
        barcode: '123123123',
        product: [
            {
                name: '',
                title: '',
            },
        ],
    },
];
//# sourceMappingURL=scrapper.joi.js.map