import mongoose from 'mongoose';
import { IBarcode } from './barcode.interface';

const barcodeSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  products: [],
});

const barcodeModel = mongoose.model<IBarcode>('Barcode', barcodeSchema);

export { barcodeModel };
