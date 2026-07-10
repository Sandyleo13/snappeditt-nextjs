import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email & password required" }, { status: 400 });
    }

    const [rows]: any = await db.execute(
      "SELECT * FROM admins WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const admin = rows[0];

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Set cookie for session
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", String(admin.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("admin_user", String(admin.id), {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
