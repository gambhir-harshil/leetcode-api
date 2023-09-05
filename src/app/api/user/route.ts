import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { hash } from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const required = ["username", "email", "password"]
    const missingFields = required.filter((field) => !data[field])
    console.log(missingFields)
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }
    const hashedpw = await hash(data.password, 10)
    const { conn, User } = await dbConnect();
    const newUser = new User({
      username: data.username,
      email: data.email,
      password: hashedpw
    })
    await conn;
    const user = await newUser.save()
    // await User.validate(data);
    // const user = await User.create(data);

    return NextResponse.json({ "message": "success" }, { status: 201 });
  } catch (error) {
    console.error("", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
