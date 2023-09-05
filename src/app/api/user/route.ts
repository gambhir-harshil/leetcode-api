import { getErrorRes } from "@/lib/helpers";
import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("X-USER-ID");
  if (!userId) {
    return getErrorRes(401, "You are not logged in. Pls provide a token");
  }
  const { conn, User } = await dbConnect();
  await conn;
  const user = await User.findById(userId).select("-password").exec();
  if (!user) {
    return getErrorRes(400, "User not found");
  }
  return NextResponse.json({
    msg: "success",
    user: user.toObject(),
  });
};
