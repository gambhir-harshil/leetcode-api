import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import { register } from "@/lib/services/authService";
import { errorResponseHandler } from "@/lib/helpers";
import CustomError from "@/lib/types/errors";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const payload = await req.json();
    const session = await register(payload);
    return NextResponse.json(
      { session, message: "Registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
