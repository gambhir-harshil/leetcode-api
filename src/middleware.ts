import { NextRequest, NextResponse } from "next/server";
import { getErrorRes } from "./lib/helpers";
import { verifyJWT } from "./lib/token";

let redirectToLogin = false;

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}
export const middleware = async (req: NextRequest) => {
  let token: string | undefined;

  console.log("intercepted");
  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }
  console.log(req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return;
  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/user") ||
      req.nextUrl.pathname.startsWith("/api/auth/logout"))
  ) {
    return getErrorRes(
      401,
      "You are not logged in. Please provide a token to gain access"
    );
  }
  const response = NextResponse.next();
  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
    }
  } catch {
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith("/api")) {
      getErrorRes(401, "Token is invalid or user doesn't exist");
    }
    return NextResponse.redirect(
      new URL(`login/${new URLSearchParams({ error: "badauth" })}`, req.url)
    );
  }
  const authUser = (req as AuthenticatedRequest).user;
  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `login/${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    );
  }

  if (req.url.includes("login") && authUser) {
    return NextResponse.redirect(new URL("profile", req.url));
  }
  return response;
};

export const config = {
  matcher: ["/profile", "/login", "/api/user/:path*", "/api/auth/logout"],
};
