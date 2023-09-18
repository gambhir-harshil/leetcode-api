import { NextResponse } from "next/server";
import CustomError from "@/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { dbConnect } from "@/lib/clients/db";

export async function GET(req: Request) {
  try {
    await dbConnect();
    return NextResponse.json({});
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
