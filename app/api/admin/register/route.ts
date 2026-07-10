import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existing]: any = await db.execute(
      "SELECT id FROM admins WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email Already Exists" }, // updated message
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    await db.execute(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json({ success: true, message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
