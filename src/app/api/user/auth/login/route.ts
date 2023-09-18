import { dbConnect } from "@/lib/clients/db";
import { NextResponse } from "next/server";
import { login } from "@/lib/services/authService";
import { errorResponseHandler } from "@/lib/helpers";
import CustomError from "@/lib/types/errors";

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const payload = await req.json();
    const session = await login("user", payload);

    return NextResponse.json({ session });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
};
