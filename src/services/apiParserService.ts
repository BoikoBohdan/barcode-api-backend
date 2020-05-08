import axios from 'axios';
import * as R from 'ramda';
import { ErrorHandler } from '../utils/errorHandler';
import { ScraperModel } from '../models/scraper/scraper.model';
import { IApiParser, IHeader } from '../models/apiParser/apiParser.interface';
import { ProductModel } from '../models/product/product.model';
import { IProduct } from '../models/product/product.interface';

class ApiParserService {
  static async validateApiParserRequestToCreate(apiParser: IApiParser) {
    const validationErrors = apiParser.validateSync();
    if (validationErrors) {
      const normalizedErrors = ErrorHandler.transformMongooseErrors(
        validationErrors
      );
      return { errors: normalizedErrors };
    }
    const userInDB = await ScraperModel.find({ uri: apiParser.url });
    if (userInDB.length) {
      return { errors: ['Request with provided uri exist in the system!'] };
    }
    return null;
  }

  static parseStringToEan(ean: string) {
    const findEan = ean.match(/(?!0)(\d{13})/);
    return findEan ? findEan[0] : '';
  }

  static async parseSinglePage(
    apiParser: IApiParser,
    page
  ): Promise<IProduct[]> {
    const response = await axios(apiParser.url, {
      params: {
        ...apiParser.defaultParams,
        page,
      },
      headers: apiParser.headers.reduce(
        (acc, item: IHeader) => ({
          ...acc,
          [item.name]: item.value,
        }),
        {}
      ),
    });
    const products = R.pathOr([], apiParser.pathToProducts, response.data);
    return R.map((item) => {
      const barcode = R.compose(
        this.parseStringToEan,
        R.pathOr('', apiParser.productSearchRule.barcodePath)
      )(item);
      const name = R.pathOr('', apiParser.productSearchRule.namePath, item);
      const link = R.pathOr(
        '',
        apiParser.productSearchRule.linkForMoreInfoPath,
        item
      );
      const manufacture = R.pathOr(
        '',
        apiParser.productSearchRule.manufacturerNamePath,
        item
      );
      const img = R.pathOr('', apiParser.productSearchRule.imagePath, item);
      return { barcode, name, link, manufacture, img };
    })(products);
  }

  static async parseApi(apiParser: IApiParser) {
    for (let page = apiParser.pageStart; page < apiParser.pageEnd; page++) {
      const parsedPageData = await this.parseSinglePage(apiParser, page);
      try {
        await ProductModel.collection.insertMany(parsedPageData, {
          ordered: false,
        });
      } catch (e) {
        return { page, error: e };
      }
    }
    return 'Success';
  }
}

export { ApiParserService };
