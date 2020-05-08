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
const express_1 = require("express");
const barcode_model_1 = require("../models/barcode/barcode.model");
const barcodeService_1 = require("../services/barcodeService");
class BarcodeController {
    constructor() {
        this.basePath = '/barcode';
        this.requireAuth = true;
        this.router = express_1.Router();
        this.router.get('', this.getProduct);
        this.router.get('/not-completed', this.getNotCompletedBarcodes);
        this.router.post('/request-for-new', this.createRequestForNewBarcode);
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const barcode = Number(req.query.barcode);
            if (!barcode) {
                return res.status(422).send('Incorrect Barcode!');
            }
            const products = yield barcode_model_1.barcodeModel.find({ UPCEAN: barcode });
            return res.send({ products, barcode });
        });
    }
    createRequestForNewBarcode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { errors, data } = yield barcodeService_1.BarcodeService.validateForSave(req.body);
            if (errors) {
                return res.status(422).send(errors);
            }
            yield data.save();
            return res.send('Saved!');
        });
    }
    getNotCompletedBarcodes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const barcodesWithNotCompletedStatus = yield barcode_model_1.barcodeModel.find({
                Completed: false,
            });
            const barcodeForResponse = barcodeService_1.BarcodeService.pickBarcodesInfo(barcodesWithNotCompletedStatus);
            return res.send({ barcodes: barcodeForResponse });
        });
    }
}
exports.BarcodeController = BarcodeController;
//# sourceMappingURL=BarcodeController.js.map