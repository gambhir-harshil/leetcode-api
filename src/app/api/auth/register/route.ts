import { NextRequest, NextResponse } from "next/server";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/userSchema";
import { hash } from "bcrypt";
import { dbConnect } from "@/utils/db";
import { ZodError } from "zod";
import { getErrorRes } from "@/lib/helpers";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

    const hashedPw = await hash(data.password, 12);
    const { conn, User } = await dbConnect();
    const newUser = new User({
      username: data.username,
      email: data.email,
      password: hashedPw,
    });
    await conn;
    const user = await newUser.save();
    console.log(user);
    return NextResponse.json(
      { msg: "success", data: { user: { ...user, password: undefined } } },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof ZodError) {
      return getErrorRes(400, "Validations failed", err);
    }
    if (err.code === "P2002") {
      return getErrorRes(409, "user with that email already exists");
    }
    return getErrorRes(500, err.message);
  }
}
