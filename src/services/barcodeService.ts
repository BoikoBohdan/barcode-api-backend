import { pick, map } from 'ramda';
import { IBarcode } from '../models/barcode/barcode.interface';
import { barcodeModel } from '../models/barcode/barcode.model';
import { ErrorHandler } from '../utils/errorHandler';

class BarcodeService {
  constructor() {}

  static pickBarcodeInfo(barcode: IBarcode) {
    return pick(['Name', 'UPCEAN', 'CategoryID', 'CategoryName'])(barcode);
  }

  static pickBarcodesInfo(barcodes: IBarcode[]) {
    return map(this.pickBarcodeInfo)(barcodes);
  }

  static async validateForSave(data) {
    const barcode: IBarcode = new barcodeModel({ ...data, Completed: false });
    const validationErrors = barcode.validateSync();
    if (validationErrors) {
      const normalizedErrors = ErrorHandler.transformMongooseErrors(
        validationErrors
      );
      return { errors: normalizedErrors };
    }
    return { data: barcode };
  }
}

export { BarcodeService };
