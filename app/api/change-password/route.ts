import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { password } = await req.json();

  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.execute(
    `UPDATE users SET password = ? WHERE id = ?`,
    [hashed, userCookie.value]
  );

  return NextResponse.json({ success: true });
}
