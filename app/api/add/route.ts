import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();

  const existing = cookieStore.get("cart");
  const cart = existing ? JSON.parse(existing.value) : [];

  cart.push(body);

  cookieStore.set("cart", JSON.stringify(cart), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json({ success: true });
}
