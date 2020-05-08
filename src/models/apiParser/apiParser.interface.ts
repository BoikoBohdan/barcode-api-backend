import { Document } from 'mongoose';

enum Method {
  post = 'POST',
  get = 'GET',
}

interface IHeader {
  value: string;
  name: string;
}

interface IApiParser extends Document {
  url: string;
  method: Method;
  defaultParams: object;
  pageStart: number;
  pageEnd: number;
  pageNameParam: string;
  resource: string;
  user: number;
  isSpecificPostStructure: any;
  pathToProducts: string[];
  headers: [IHeader];
  productSearchRule: {
    barcodePath: string[];
    linkForMoreInfoPath: string[];
    namePath: string[];
    manufacturerNamePath: string[];
    imagePath: string[];
  };
}

export { IApiParser, IHeader };
