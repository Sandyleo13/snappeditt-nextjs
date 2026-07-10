import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const [rows] = await db.query(
      "SELECT id, password FROM users WHERE email = ?",
      [email]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = (rows as any[])[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ✅ Create response with redirect
    const response = NextResponse.redirect(
      new URL("/", req.url), // HOME PAGE
      302
    );

    // ✅ Set session cookie (simple version)
    response.cookies.set("snappeditt_user", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
