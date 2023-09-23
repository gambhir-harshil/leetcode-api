import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import CustomError from "@/lib/types/errors";
import { errorResponseHandler } from "@/lib/helpers";

// this should a protected route
// passport to be passed from middlware
export async function GET() {
  try {
    const db = await dbConnect();
    return NextResponse.json({ msg: "Mongodb connected successfully" });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
