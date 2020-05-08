import { Router, Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { UserModel } from '../models/user/user.model';

class UserController {
  public basePath = '/user';
  public requireAuth = true;
  private router = Router();

  constructor() {
    this.router.get('/all', this.getAllUser);
    this.router.get('/me', this.getCurrentUser);
  }

  private async getCurrentUser(req: Request, res: Response) {
    const userId = req['userId'];
    const user = await UserModel.findOne({ _id: userId });
    const userForResponse = UserService.pickUserInfo(user);
    return res.send(userForResponse);
  }

  private async getAllUser(req: Request, res: Response) {
    const users = await UserService.getUsersInfoWithOmit({});
    return res.send({ users });
  }
}

export { UserController };
