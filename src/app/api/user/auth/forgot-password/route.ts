import CustomError from "@/lib/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    return NextResponse.json({});
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
