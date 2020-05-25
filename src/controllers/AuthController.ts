import { Router, Request, Response } from 'express';
import { UserModel } from '../models/user/user.model';
import { UserService } from '../services/userServices';

class AuthController {
  public basePath = '/auth';

  private router = Router();

  constructor() {
    this.router.post('/sign-up', this.createNewUser);
    this.router.post('/login', this.loginUser);
  }

  private async createNewUser(req: Request, res: Response) {
    const user = new UserModel({
      ...req.body,
    });
    const errors = await UserService.validateUserToCreate(user);
    if (errors) {
      return res.status(422).send(errors);
    }
    const newUser = await user.save();
    const token = UserService.generateToken(newUser);

    res.send({ token });
  }

  private async loginUser(req: Request, res: Response) {
    const errors = UserService.validateUserForLogin(req.body);
    if (errors) {
      return res.status(422).send(errors);
    }
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(422).send({ errors: ['No user with provided email!'] });
    }
    const isCorrectPassword = user.comparePassword(req.body.password);
    if (!isCorrectPassword) {
      return res.status(422).send({ errors: ['Incorrect password!'] });
    }
    const token = UserService.generateToken(user);
    return res.send({ token });
  }
}

export { AuthController };
