import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("admin_session");
    if (!adminCookie) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = "SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE 1=1";
    const params: any[] = [];

    if (search) {
      query += " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [total]: any = await db.execute(query.replace("id, first_name, last_name, email, phone, created_at", "COUNT(*) as count"), params);
    
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [users]: any = await db.execute(query, params);

    return NextResponse.json({
      success: true,
      users,
      total: total[0].count,
      pages: Math.ceil(total[0].count / limit),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("admin_session");
    if (!adminCookie) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    await db.execute("DELETE FROM users WHERE id = ?", [userId]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
