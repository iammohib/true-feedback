import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verificationCode: {
    type: String,
    required: [true, "Verification Code is required"],
  },
  verificationCodeExpiry: {
    type: Date,
    required: [true, "Verification code is expired"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: false,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
