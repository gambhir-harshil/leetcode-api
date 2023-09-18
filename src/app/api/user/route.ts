import { dbConnect } from "@/lib/clients/db";
import { NextResponse } from "next/server";
import type CustomError from "@/types/errors";
import { getUserById } from "@/services/userService";
import { errorResponseHandler } from "@/lib/helpers";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const user = await getUserById("xxx");

    return NextResponse.json({ user });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
