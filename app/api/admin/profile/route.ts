import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const cookieStore = cookies();
  const adminCookie = (await cookieStore).get("admin_session") || (await cookieStore).get("admin_user");

  if (!adminCookie) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const [rows]: any = await db.execute(
    "SELECT id, name, email, created_at FROM admins WHERE id = ? LIMIT 1",
    [adminCookie.value]
  );

  const admin = rows[0];
  if (!admin) {
    return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, admin });
}

export async function PUT(req: Request) {
  const cookieStore = cookies();
  const adminCookie = (await cookieStore).get("admin_session") || (await cookieStore).get("admin_user");

  if (!adminCookie) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const adminId = Number(adminCookie.value);
  if (!adminId || Number.isNaN(adminId)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email } = body;

  if (!name?.trim()) {
    return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
  }

  if (!email?.trim()) {
    return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
  }

  await db.execute(
    "UPDATE admins SET name = ?, email = ? WHERE id = ?",
    [name.trim(), email.trim(), adminId]
  );

  return NextResponse.json({ success: true });
}
