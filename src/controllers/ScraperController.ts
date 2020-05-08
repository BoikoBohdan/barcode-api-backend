import { Router, Request, Response } from 'express';
import { ScraperModel } from '../models/scraper/scraper.model';
import { ScraperService } from '../services/scraperService';
import { UserModel } from '../models/user/user.model';

class ScraperController {
  public basePath = '/scraper';
  public requireAuth = true;
  private router = Router();
  constructor() {
    this.router.post('/new', this.createNewScrapperRequest);
    this.router.post('/approve', this.approveScraper);
  }

  private async createNewScrapperRequest(req: Request, res: Response) {
    const userId = req['userId'];
    const scraper = new ScraperModel({ ...req.body, user: userId });
    const validation = await ScraperService.validateScraperRequestToCreate(
      scraper
    );
    if (validation) {
      return res.status(422).send(validation);
    }
    await scraper.save();
    return res.send('Saved');
  }

  private async approveScraper(req: Request, res: Response) {
    const userId = req['userId'];
    const user = await UserModel.findOne({ _id: userId });
    if (!user.isAdmin) {
      return res.status(403).send('Permission denied!');
    }
    if (!req.body.id) {
      return res.status(422).send('Please provide Scrapper ID!');
    }
    const scraperInfo = await ScraperModel.findOne({ _id: req.body.id });
    if (!scraperInfo) {
      return res.status(404).send('Scraper not found!');
    }
    const page = await ScraperService.parsePage(scraperInfo);
    return res.send(page);
  }
}

export { ScraperController };
