import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("snappeditt_user");

  if (!userCookie?.value) {
    return NextResponse.json({ loggedIn: false });
  }

  return NextResponse.json({
    loggedIn: true,
    user_id: Number(userCookie.value),
  });
}
