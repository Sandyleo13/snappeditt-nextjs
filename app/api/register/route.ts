import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const firstName = data.get("first_name")?.toString();
    const lastName = data.get("last_name")?.toString();
    const email = data.get("email")?.toString();
    const phone = data.get("mobile")?.toString();
    const password = data.get("password")?.toString();
    const confirm = data.get("confirm_password")?.toString();

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirm) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, phone, hashedPassword]
    );

     return NextResponse.redirect(
      new URL("/login", req.url),
      302
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
