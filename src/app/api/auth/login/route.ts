import { getErrorRes } from "@/lib/helpers";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/userSchema";
import { dbConnect } from "@/utils/db";
import { compare } from "bcrypt";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const { conn, User } = await dbConnect();
    await conn;
    const query = User.where({ email: data.email });
    const user = await query.findOne();

    if (!(await compare(data.password, user.password))) {
      return getErrorRes(401, "Invalid email or password");
    }
  } catch (err) {
    throw err;
  }
};
