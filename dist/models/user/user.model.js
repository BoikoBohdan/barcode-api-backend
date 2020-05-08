"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
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
});
UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt_1.default.hashSync(this.password, 8);
        next();
    }
});
UserSchema.methods.comparePassword = function (pwd) {
    return bcrypt_1.default.compareSync(pwd, this.password);
};
const UserModel = mongoose_1.model("User", UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map