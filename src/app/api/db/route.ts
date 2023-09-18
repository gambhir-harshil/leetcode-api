import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import CustomError from "@/types/errors";
import { errorResponseHandler } from "@/lib/helpers";

export async function GET() {
  try {
    const db = await dbConnect();
    return NextResponse.json({ msg: "Mongodb connected successfully" });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
