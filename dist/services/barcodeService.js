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
const ramda_1 = require("ramda");
const barcode_model_1 = require("../models/barcode/barcode.model");
const errorHandler_1 = require("../utils/errorHandler");
class BarcodeService {
    constructor() { }
    static pickBarcodeInfo(barcode) {
        return ramda_1.pick(['Name', 'UPCEAN', 'CategoryID', 'CategoryName'])(barcode);
    }
    static pickBarcodesInfo(barcodes) {
        return ramda_1.map(this.pickBarcodeInfo)(barcodes);
    }
    static validateForSave(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const barcode = new barcode_model_1.barcodeModel(Object.assign(Object.assign({}, data), { Completed: false }));
            const validationErrors = barcode.validateSync();
            if (validationErrors) {
                const normalizedErrors = errorHandler_1.ErrorHandler.transformMongooseErrors(validationErrors);
                return { errors: normalizedErrors };
            }
            return { data: barcode };
        });
    }
}
exports.BarcodeService = BarcodeService;
//# sourceMappingURL=barcodeService.js.map