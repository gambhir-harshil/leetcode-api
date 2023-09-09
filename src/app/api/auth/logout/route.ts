import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const response = NextResponse.json({ status: 200 });

  response.cookies.set({
    name: "logged-in",
    value: "",
    maxAge: -1,
  });
  response.cookies.set({
    name: "token",
    value: "",
    maxAge: -1,
  });
  return response;
};
