import { NextRequest, NextResponse } from "next/server";
import CustomError from "@/lib/types/errors";
import { verifyAccessToken } from "@/lib/services/authService";
import { errorResponseHandler } from "@/lib/helpers";
import { verifyJWT } from "./lib/token";

export async function middleware(req: NextRequest) {
  try {
    const href = req.nextUrl.href;
    if (href.includes("/leaderboard") || href.includes("/profile")) {
      if (!req.cookies.has("session")) {
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
