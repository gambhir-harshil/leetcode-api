import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

export const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default models?.User || model<IUser>("User", UserSchema);

export class UserRO {
  email: string;
  username: string;

  constructor(source: IUser) {
    this.email = source.email;
    this.username = source.username;
  }
}
