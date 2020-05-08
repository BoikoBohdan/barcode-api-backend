import { Document } from 'mongoose';

interface IScraper extends Document {
  url: string;
  rule: {
    barcode: string;
    name: string;
    description?: string;
    photoUrl?: string;
    category?: string;
    productUrl?: string;
  };
  user: Number;
}

export { IScraper };
