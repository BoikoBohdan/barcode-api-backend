import mongoose from 'mongoose';
import { IApiParser } from './apiParser.interface';

const RulesSchema = new mongoose.Schema({
  barcodePath: {
    type: [String],
    required: true,
  },
  linkForMoreInfoPath: [String],
  namePath: [String],
  manufacturerNamePath: [String],
  imagePath: [String],
});

const ApiParserSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  method: String,
  defaultParams: Object,
  pageStart: Number,
  pageEnd: Number,
  pageNameParam: String,
  resource: String,
  isSpecificPostStructure: Object,
  pathToProducts: [String],
  headers: [Object],
  productSearchRule: RulesSchema,
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const ApiParserModel = mongoose.model<IApiParser>('ApiParser', ApiParserSchema);

export { ApiParserModel };
