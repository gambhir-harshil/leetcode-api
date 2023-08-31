import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { conn, User } = await dbConnect();
    await conn;
    await User.validate(req);
    const user = await User.create(req);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
