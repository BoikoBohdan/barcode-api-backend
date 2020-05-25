import { Router, Request, Response } from 'express';
import { pathOr } from 'ramda';
import { barcodeModel } from '../models/barcode/barcode.model';
import { BarcodeService } from '../services/barcodeService';
import { ProductModel } from '../models/product/product.model';

class BarcodeController {
  public basePath = '/barcode';
  public requireAuth = true;
  private router = Router();

  constructor() {
    this.router.get('', this.getProduct);
    this.router.get('/all', this.getBarcodesList);
    this.router.get('/not-completed', this.getNotCompletedBarcodes);
    this.router.post('/request-for-new', this.createRequestForNewBarcode);
  }

  private async getBarcodesList(req: Request, res: Response) {
    const page = pathOr(1, ['query', 'page'], req);
    const perPage = pathOr(10, ['query', 'perPage'], req);
    const skipNum = page * perPage - perPage;
    console.log(skipNum, page, perPage);
    const barcodesList = await ProductModel.find().skip(skipNum).limit(perPage);
    return res.send({
      content: barcodesList,
      page,
      perPage,
    });
  }

  private async getProduct(req: Request, res: Response) {
    const barcode = Number(req.query.barcode);
    if (!barcode) {
      return res.status(422).send('Incorrect Barcode!');
    }
    const products = await barcodeModel.find({ UPCEAN: barcode });
    return res.send({ products, barcode });
  }

  private async createRequestForNewBarcode(req: Request, res: Response) {
    const { errors, data } = await BarcodeService.validateForSave(req.body);
    if (errors) {
      return res.status(422).send(errors);
    }
    await data.save();
    return res.send('Saved!');
  }

  private async getNotCompletedBarcodes(req: Request, res: Response) {
    const barcodesWithNotCompletedStatus = await barcodeModel.find({
      Completed: false,
    });
    const barcodeForResponse = BarcodeService.pickBarcodesInfo(
      barcodesWithNotCompletedStatus
    );
    return res.send({ barcodes: barcodeForResponse });
  }
}

export { BarcodeController };
