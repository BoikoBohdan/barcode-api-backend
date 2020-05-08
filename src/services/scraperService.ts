import cheerio from 'cheerio';
import axios from 'axios';
import { IScraper } from '../models/scraper/scraper.interface';
import { ErrorHandler } from '../utils/errorHandler';
import { ScraperModel } from '../models/scraper/scraper.model';
import { ProductModel } from '../models/product/product.model';

class ScraperService {
  static async validateScraperRequestToCreate(scraper: IScraper) {
    const validationErrors = scraper.validateSync();
    if (validationErrors) {
      const normalizedErrors = ErrorHandler.transformMongooseErrors(
        validationErrors
      );
      return { errors: normalizedErrors };
    }
    const userInDB = await ScraperModel.find({ uri: scraper.url });
    if (userInDB.length) {
      return { errors: ['Request with provided uri exist in the system!'] };
    }
    return null;
  }

  static transformEan(ean: string) {
    if (ean[0] === '0') {
      return ean.substr(1);
    }
    return ean;
  }

  static async parsePage(scraper: IScraper) {
    const response = await axios(scraper.url);
    const $ = cheerio.load(response.data);
    const productsList = $('script[type="text/react-state"]')[0].children[0]
      .data;
    const parsedProduct = JSON.parse(productsList).catalog[0].items;
    const addBarcode = parsedProduct.map((item) => ({
      ...item,
      img: Object.values(item.main_image)[0],
      barcodes: [item.ean],
    }));
    await ProductModel.insertMany(addBarcode);
    return '';
  }
}

export { ScraperService };
