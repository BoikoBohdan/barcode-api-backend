import mongoose from 'mongoose';
import { IScraper } from './scraper.interface';

const RulesSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  photoUrl: String,
  category: String,
  productUrl: String,
});

const ScraperSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  isApi: {
    type: Boolean,
    default: true,
  },
  rule: {
    type: RulesSchema,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const ScraperModel = mongoose.model<IScraper>('Scraper', ScraperSchema);

export { ScraperModel };
