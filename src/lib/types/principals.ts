import { Document, Schema, model, models } from "mongoose";
import { IUser, UserSchema, type UserRO } from "./users";
import { type AdminRO, AdminSchema, IAdmin } from "./admins";
import { ISession, SessionSchema, SessionRO } from "./sessions";

interface IPrincipal extends Document {
  user: IUser | IAdmin;
  session: ISession;
}

const PrincipalSchema = new Schema<IPrincipal>({
  user: UserSchema || AdminSchema,
  session: SessionSchema,
});

export default models?.Principal ||
  model<IPrincipal>("Principal", PrincipalSchema);

export class PrincipalRO {
  user: UserRO | AdminRO;
  session: SessionRO;

  constructor(source: { user: UserRO | AdminRO; session: SessionRO }) {
    this.user = source.user;
    this.session = source.session;
  }
}
