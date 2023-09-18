import { Document, Schema, model, models } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
}

export const AdminSchema = new Schema<IAdmin>(
  {
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

export default models?.Admin || model<IAdmin>("Admin", AdminSchema);

export class AdminRO {
  email: string;

  constructor(source: IAdmin) {
    this.email = source.email;
  }
}
