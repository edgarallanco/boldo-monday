// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/about"],
};

export function middleware(req: NextRequest) {
  
  const existing = req.cookies.get("aboutVariant")?.value as
    | "dark"
    | "green"
    | undefined;

  const variant: "dark" | "green" =
    existing ?? (Math.random() < 0.5 ? "dark" : "green");

  const url = req.nextUrl.clone();
  url.pathname = `/about-${variant}`;
  const res = NextResponse.rewrite(url);

  if (!existing) {
    res.cookies.set("aboutVariant", variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return res;
}
