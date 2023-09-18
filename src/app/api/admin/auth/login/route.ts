import { dbConnect } from "@/lib/clients/db";
import type CustomError from "@/lib/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    return NextResponse.json({});
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
