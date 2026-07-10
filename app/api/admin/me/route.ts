import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const adminId = req.cookies.get("admin_session")?.value || req.cookies.get("admin_user")?.value;

  if (!adminId) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  try {
    const [rows]: any = await db.execute(
      "SELECT id, name, email, created_at FROM admins WHERE id = ? LIMIT 1",
      [adminId]
    );

    if (!rows?.length) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
    }

    const admin = rows[0];
    return NextResponse.json({ success: true, admin });
  } catch (error) {
    console.error("/api/admin/me error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
