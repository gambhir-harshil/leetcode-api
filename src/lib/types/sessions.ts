import { Document, Schema, model, models } from "mongoose";

export interface ISession extends Document {
  access_token: string;
}

export const SessionSchema = new Schema<ISession>({
  access_token: String,
});

export default models?.Session || model<ISession>("Session", SessionSchema);

export class SessionRO {
  access_token: string;

  constructor(source: any) {
    this.access_token = source.access_token;
  }
}
