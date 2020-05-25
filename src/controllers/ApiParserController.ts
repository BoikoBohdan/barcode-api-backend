import { Router, Request, Response } from 'express';
import { UserModel } from '../models/user/user.model';
import { ApiParserModel } from '../models/apiParser/apiParser.model';
import { ApiParserService } from '../services/apiParserService';

class ApiParserController {
  public basePath = '/apiParser';
  public requireAuth = true;
  private router = Router();

  constructor() {
    this.router.post('/new-request', this.createNewApiParserRequest);
    this.router.post('/approve', this.approveApiParser);
  }

  private async createNewApiParserRequest(req: Request, res: Response) {
    const userId = req['userId'];
    const apiParser = new ApiParserModel({ ...req.body, user: userId });
    const validation = await ApiParserService.validateApiParserRequestToCreate(
      apiParser
    );
    if (validation) {
      return res.status(422).send(validation);
    }
    await apiParser.save();
    return res.send('Saved');
  }

  private async approveApiParser(req: Request, res: Response) {
    const userId = req['userId'];
    console.log(userId, 'userId');

    const user = await UserModel.findOne({ _id: userId });
    if (!user.isAdmin) {
      return res.status(403).send('Permission denied!');
    }
    if (!req.body.id) {
      return res.status(422).send('Please provide Scrapper ID!');
    }
    const apiParserInfo = await ApiParserModel.findOne({ _id: req.body.id });
    if (!apiParserInfo) {
      return res.status(404).send('Scraper not found!');
    }
    const parsedApiResponse = await ApiParserService.parseApi(apiParserInfo);
    return res.send(parsedApiResponse);
  }
}

export { ApiParserController };
