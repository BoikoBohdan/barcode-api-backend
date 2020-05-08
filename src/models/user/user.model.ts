import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "./user.iterface";

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minlength: [4, "First Name too short"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minlength: [4, "Last Name too short"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email exist in the system. Choose another!"],
    minlength: [4, "Email too short"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password too short"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

UserSchema.pre<IUser>("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
  }
});

UserSchema.methods.comparePassword = function (pwd: string): boolean {
  return bcrypt.compareSync(pwd, this.password);
};

const UserModel = model<IUser, IUserModel>("User", UserSchema);

export { UserModel };
