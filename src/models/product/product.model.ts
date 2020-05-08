import mongoose from 'mongoose';
import { IProduct } from './product.interface';

const ProductSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
  },
  img: String,
  weight: Number,
  manufacture: Object,
  link: String,
  extended_info: {
    tm: String,
    ingredient_carbohydrates: String,
    ingredient_energy: String,
    ingredient_fat: String,
    ingredient_protein: String,
  },
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export { ProductModel };
