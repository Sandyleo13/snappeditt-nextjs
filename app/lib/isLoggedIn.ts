// app/lib/isLoggedIn.ts
import { cookies } from "next/headers";

export async function getLoggedInUserId(): Promise<number | null> {
  const cookieStore = await cookies();   // ✅ await it

  const userCookie = cookieStore.get("snappeditt_user");

  if (!userCookie?.value) return null;

  return Number(userCookie.value);
}
