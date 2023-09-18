import CustomError from "@/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { userLogout } from "@/services/authService";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    userLogout();
    return NextResponse.json({ message: "logged out successfully " });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
};
