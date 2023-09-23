import { errorResponseHandler } from "@/lib/helpers";
import { dbConnect } from "@/lib/clients/db";
import { type NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/services/userService";
import type CustomError from "@/lib/types/errors";

// this should a protected route
// passport to be passed from middlware
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const users = await getAllUsers();

    return NextResponse.json({ users });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
};
