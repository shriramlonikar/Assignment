import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interfaces
interface IUser extends Document {
  email: string;
  password: string;
  username?: string;

  isValidPassword(password: string): Promise<boolean>;
  generateJWT(): string;
}

interface IUserModel extends mongoose.Model<IUser> {
  hashPassword(password: string): Promise<string>;
}

// Schema
const UserSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: [50, "Email must not be longer than 50 characters"],
  },
  password: {
    type: String,
    select: false,
  },
  username: {
    type: String,
  },
});

UserSchema.statics.hashPassword = async function (password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
};

UserSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = function () {

    if (!process.env.PASSWORD_SALT) {
    throw new Error("PASSWORD_SALT not defined");
    }

    return jwt.sign({ email: this.email, id: this._id }, process.env.PASSWORD_SALT, {
    expiresIn: "24h",
  });
};

const User =  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", UserSchema);
  
export default User;