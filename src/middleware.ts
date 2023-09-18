import { NextRequest, NextResponse } from "next/server";
import CustomError from "@/types/errors";
import { verifyAccessToken } from "./services/authService";
import { errorResponseHandler } from "./lib/helpers";

export async function middleware(req: NextRequest) {
  try {
    const href = req.nextUrl.href;
    if (href.includes("/leaderboard")) {
      if (!req.cookies.has("session")) {
        return NextResponse.redirect(new URL("login", req.url));
      }

      const accessToken = req.cookies.get("session")?.value;
      const { payload } = await verifyAccessToken(accessToken as string);
      console.log("passport...", payload);
      req.cookies.set("passport", JSON.stringify(payload));
    }

    return NextResponse.next();
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
