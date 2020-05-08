import { Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  barcodes?: string[];
  img?: string;
  weight?: number;
  manufacture?: object;
  extended_info?: {
    tm?: string;
    ingredient_carbohydrates?: string;
    ingredient_energy?: string;
    ingredient_fat?: string;
    ingredient_protein?: string;
  };
}

export { IProduct };
