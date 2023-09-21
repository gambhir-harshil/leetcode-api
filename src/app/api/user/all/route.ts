import { errorResponseHandler } from "@/lib/helpers";
import { dbConnect } from "@/lib/clients/db";
import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/services/userService";
import type CustomError from "@/lib/types/errors";

export const GET = async (req: Request) => {
  try {
    await dbConnect();
    const users = await getAllUsers();

    return NextResponse.json({ users });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
};
