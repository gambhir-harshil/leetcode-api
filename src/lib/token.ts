import { SignJWT, jwtVerify } from "jose";
import { getEnvVar } from "./helpers";

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(getEnvVar("JWT_SECRET_KEY"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setIssuedAt()
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setSubject(payload.sub)
      .sign(secret);
  } catch (err) {
    throw err;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T;
  } catch (err) {
    console.error(err);
    throw new Error("Your token has expired");
  }
};
