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
const scraper_model_1 = require("../models/scraper/scraper.model");
class ScraperController {
    constructor() {
        this.basePath = '/scraper';
        this.authRequire = true;
        this.router = express_1.Router();
        this.router.post('/new', this.createNewScrapperRequest);
    }
    createNewScrapperRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const scraper = yield new scraper_model_1.ScraperModel(req.body).validate();
            console.log(scraper);
            return res.send('Saved');
        });
    }
}
exports.ScraperController = ScraperController;
//# sourceMappingURL=ScraperController.js.map