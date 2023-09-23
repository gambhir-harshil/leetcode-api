import { NextResponse } from "next/server";
import CustomError from "@/lib/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { dbConnect } from "@/lib/clients/db";

// this should a protected route
// passport to be passed from middlware
export async function GET(req: Request) {
  try {
    await dbConnect();
    return NextResponse.json({});
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
