import { UserController } from './UserController';
import { NotFoundController } from './notFound';
import { AuthController } from './AuthController';
import { BarcodeController } from './BarcodeController';
import { ScraperController } from './ScraperController';
import { ApiParserController } from './ApiParserController';

export const controllers = [
  new AuthController(),
  new ApiParserController(),
  new ScraperController(),
  new BarcodeController(),
  new UserController(),
  new NotFoundController(),
];
