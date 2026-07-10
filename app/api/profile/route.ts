import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [rows] = await db.query(
    "SELECT id, first_name, last_name, email, phone AS mobile, created_at FROM users WHERE id = ?",
    [userCookie.value]
  );

  const user = (rows as any[])[0];
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, user });
}

export async function PUT(req: Request) {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { first_name, last_name, phone } = body;

  if (!first_name?.trim()) {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }

  await db.query(
    "UPDATE users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?",
    [first_name.trim(), (last_name ?? "").trim(), (phone ?? "").trim() || null, user_id]
  );

  return NextResponse.json({ success: true });
}
