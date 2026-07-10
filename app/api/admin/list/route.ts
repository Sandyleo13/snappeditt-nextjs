// app/api/admin/list/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [admins]: any = await db.execute(
      "SELECT id, name, email, created_at FROM admins ORDER BY created_at DESC"
    );
    return NextResponse.json({ success: true, admins });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
