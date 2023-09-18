import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import { register } from "@/services/authService";
import { errorResponseHandler } from "@/lib/helpers";
import CustomError from "@/types/errors";

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
    console.log("register error but still redirects why?");
    return errorResponseHandler(error as CustomError);
  }
}
