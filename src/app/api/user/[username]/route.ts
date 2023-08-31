import { dbConnect } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { username: string } }
) {
  try {
    const { conn, User } = await dbConnect();
    conn;
    const user = await User.find({ username: context.params.username });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
