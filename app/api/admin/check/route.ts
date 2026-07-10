// app/api/admin/check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("admin_user"); // <--- read from request
  if (cookie) {
    return NextResponse.json({ loggedIn: true });
  }
  return NextResponse.json({ loggedIn: false });
}
