import { NextRequest, NextResponse } from "next/server";
import CustomError from "@/lib/types/errors";
import { errorResponseHandler } from "@/lib/helpers";
import { verifyJWT } from "./lib/token";

export async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl;
    if (url.href.includes("/leaderboard") || url.href.includes("/profile")) {
      if (!req.cookies.has("session")) {
        if (url.searchParams.get("justAuthenticated"))
          return NextResponse.next();
        return NextResponse.redirect(new URL("login", req.url));
      }
      const accessToken = req.cookies.get("session")?.value;
      const { sub } = await verifyJWT<{ sub: string }>(accessToken as string);
      console.log("passport...", sub);
      req.cookies.set("passport", JSON.stringify(sub));
    }
    return NextResponse.next();
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
