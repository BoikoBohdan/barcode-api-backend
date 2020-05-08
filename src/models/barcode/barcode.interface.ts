import { Document, Model } from 'mongoose';

interface IBarcode extends Document {
  Name: String;
  UPCEAN: Number;
  Products: Number[];
}

export { IBarcode };
