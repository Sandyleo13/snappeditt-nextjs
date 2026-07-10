import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const adminCookie = (await cookieStore).get("admin_session") || (await cookieStore).get("admin_user");

  if (!adminCookie) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const adminId = Number(adminCookie.value);
  if (!adminId || Number.isNaN(adminId)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { newPassword } = await req.json();
  if (!newPassword) {
    return NextResponse.json({ success: false, error: "New password is required" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.execute("UPDATE admins SET password = ? WHERE id = ?", [hashed, adminId]);

  return NextResponse.json({ success: true });
}
