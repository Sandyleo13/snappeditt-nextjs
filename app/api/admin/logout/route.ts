// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Make absolute URL for redirect
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:8083";
  const response = NextResponse.redirect(new URL("/admin", url));

  // Delete the admin cookie
  response.cookies.set("admin_user", "", {
    path: "/",              // must match how it was set
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),   // expire immediately
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
