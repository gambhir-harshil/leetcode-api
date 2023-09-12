import { getEnvVar, getErrorRes } from "@/lib/helpers";
import { signJWT } from "@/lib/token";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/userSchema";
import { dbConnect } from "@/utils/db";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const { conn, User } = await dbConnect();
    await conn;
    const user = await User.findOne({ email: data.email }).exec();

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorRes(401, "Invalid email or password");
    }
    const JWT_EXPIRES_IN = getEnvVar("JWT_EXPIRES_IN");
    const token = await signJWT(
      { sub: user.id },
      { exp: `${JWT_EXPIRES_IN}m` }
    );
    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };
    const response = NextResponse.json(
      {
        msg: "success",
        token,
      },
      { status: 200 }
    );
    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);
    return response;
  } catch (err: any) {
    if (err instanceof ZodError) {
      return getErrorRes(400, "Validations failed", err);
    }
    return getErrorRes(500, err.message);
  }
};
