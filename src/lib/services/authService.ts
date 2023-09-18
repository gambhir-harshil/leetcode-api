import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import CustomError from "@/lib/types/errors";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";
import { IUser, UserRO } from "@/lib/types/users";
import { LoginPayload, RegisterPayload } from "@/lib/types/auth";
import { findAdminByEmail } from "./adminService";
import { GenericObject } from "@/lib/types/model";
import { AdminRO, IAdmin } from "@/lib/types/admins";
import { createUser, findUserByEmail } from "./userService";
import { getEnvVar } from "@/lib/helpers";

type findType = {
  user: (email: string) => any;
  admin: (email: string) => any;
};

const JWT_EXPIRES_IN = getEnvVar("JWT_EXPIRES_IN");
const JWT_SECRET_KEY = getEnvVar("JWT_SECRET_KEY");
const JOSE_PROTECTED_HEADER_ALG = "HS256";

const _createAccessToken = (
  payload: { sub: string },
  options: { exp: string }
) => {
  return new SignJWT(payload)
    .setIssuedAt()
    .setProtectedHeader({ alg: JOSE_PROTECTED_HEADER_ALG })
    .setExpirationTime(options.exp)
    .setSubject(payload.sub)
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
};

export const verifyAccessToken = async (token: string) => {
  try {
    return await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));
  } catch (error) {
    throw new InvalidAccessTokenError(error as Error);
  }
};

const _setHttpOnlyCookie = (accessToken: string) => {
  cookies().set({
    name: "session",
    value: accessToken,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    maxAge: parseInt(JWT_EXPIRES_IN) * 60,
  });
};

const _deleteHttpOnlyCookie = (name: string) => {
  cookies().delete(name);
};

const _session = async (user: IUser | IAdmin, isAdmin: boolean) => {
  _deleteHttpOnlyCookie("session");

  const accessToken = await _createAccessToken(
    { sub: `${user.id}-isAdmin?-${isAdmin}` },
    {
      exp: `${JWT_EXPIRES_IN}m`,
    }
  );

  _setHttpOnlyCookie(accessToken);

  return {
    user: isAdmin ? new AdminRO(user as IAdmin) : new UserRO(user as IUser),
  };
};

export const login = async (
  resource: keyof findType,
  payload: GenericObject
) => {
  payload = new LoginPayload(payload);

  const find: findType = {
    user: (email: string) => findUserByEmail(email),
    admin: (email: string) => findAdminByEmail(email),
  };

  const model = await find[resource](payload.email);

  if (!bcrypt.compareSync(payload.password, model.password)) {
    throw new WrongPasswordError();
  }

  return await _session(
    model as unknown as IUser | IAdmin,
    resource == "admin"
  );
};

export const register = async (payload: GenericObject) => {
  payload = new RegisterPayload(payload);

  const user = await createUser(payload as RegisterPayload);

  return await _session(user, false);
};

export const userLogout = () => _deleteHttpOnlyCookie("session");

export class InvalidAccessTokenError extends CustomError {
  constructor(error: Error) {
    super("Access token is not valid", HTTP_STATUS_CODE.UNAUTHORISED, error);
  }
}

export class WrongPasswordError extends CustomError {
  constructor() {
    super(`Wrong password`, HTTP_STATUS_CODE.BAD_REQUEST);
  }
}
