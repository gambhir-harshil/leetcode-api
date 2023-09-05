import { connect, Schema, models, model } from "mongoose";
import { IUser } from "./types";

const { MONGODB_URI } = process.env;

export const dbConnect = async () => {
  const conn = await connect(MONGODB_URI as string).catch((err) =>
    console.log("Error connecting to mongodb", err)
  );
  console.log("Mongodb Connection Established!");

  const UserSchema = new Schema<IUser>(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      }
    },
    { timestamps: true }
  );

  const User = models.User || model<IUser>("User", UserSchema);

  return { conn, User };
};
