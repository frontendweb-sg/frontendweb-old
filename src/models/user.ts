import { Password } from "@/lib/password";
import mongoose, { Schema, Document } from "mongoose";

export const USER_TABLE_NAME = "user";
export enum Role {
  user = "user",
  admin = "admin",
}

export interface IUser {
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  password: string;
  mobile: string;
  photo_url: string;
  firebase_uid: string;
  role: Role;
  active: boolean;
  token?: string;
  tokenEpiration?: string;
  emailVerified?: boolean;
  emailVerificationToken?: string;
}
export interface IUserDoc extends Document<IUser>, IUser {}
const schema = new Schema(
  {
    firstname: { type: String, require: true, trim: true },
    lastname: { type: String, require: true, trim: true },
    username: { type: String, trim: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    mobile: { type: String, require: true, unique: true },
    photo_url: { type: String, default: "" },
    firebase_uid: { type: String },
    role: { type: String, default: Role.user, enum: Role },
    active: { type: Boolean, default: true },
    token: { type: String, default: "" },
    tokenEpiration: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        doc.id = doc.__id;
        ret.id = ret.__id;
        delete doc.__v;
        delete ret.__v;
        delete doc.password;
        delete ret.password;
      },
    },
  }
);

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    const password = Password.hash(this.get("password"));
    if (password) {
      this.set("password", password);
    }
  }
  let role = this.get("role");
  this.set("emailVerified", role === "admin");
  next();
});

export const User =
  mongoose.models[USER_TABLE_NAME] ||
  mongoose.model<IUserDoc>(USER_TABLE_NAME, schema);
