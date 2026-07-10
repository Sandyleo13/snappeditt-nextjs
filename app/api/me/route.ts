import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("snappeditt_user")?.value;

  if (!userId) {
    return NextResponse.json({ loggedIn: false });
  }

  const [rows] = await db.query(
    "SELECT first_name FROM users WHERE id = ?",
    [userId]
  );

  if ((rows as any[]).length === 0) {
    return NextResponse.json({ loggedIn: false });
  }

  return NextResponse.json({
    loggedIn: true,
    first_name: (rows as any[])[0].first_name,
  });
}
