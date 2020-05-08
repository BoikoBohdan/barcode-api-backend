import { Document, Model } from 'mongoose';
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  comparePassword(pwd: string): boolean;
}

interface IUserModel extends Model<IUser> {}
interface IUserLogin {
  email: IUser['email'];
  password: IUser['password'];
}

export { IUser, IUserLogin, IUserModel };
