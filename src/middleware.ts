import { NextRequest, NextResponse } from "next/server";
import CustomError from "@/lib/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { verifyJWT } from "./lib/token";

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl;
    if (url.href.includes("/profile")) {
      if (!request.cookies.has("session")) {
        if (url.searchParams.get("justAuthenticated"))
          return NextResponse.next();
        return NextResponse.redirect(new URL("login", request.url));
      }
      const accessToken = request.cookies.get("session")?.value;
      const { sub } = await verifyJWT<{ sub: string }>(accessToken as string);
      console.log("passport...", sub);
    }
    return NextResponse.next();
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
