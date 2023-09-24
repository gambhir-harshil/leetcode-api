import { dbConnect } from "@/lib/clients/db";
import { NextResponse } from "next/server";
import type CustomError from "@/lib/types/errors";
import { getUserById } from "@/lib/services/userService";
import { errorResponseHandler } from "@/lib/helpers";

// this should a protected route
// passport to be passed from middlware
export async function GET(req: Request) {
  try {
    await dbConnect();
    // const user = await getUserById("xxx");

    return NextResponse.json({});
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
