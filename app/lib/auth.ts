import { cookies } from "next/headers";

export async function isLoggedIn() {
  const cookieStore = await cookies();

  // 🔴 CHANGE "user" TO YOUR REAL COOKIE NAME
  const session = cookieStore.get("user"); 

  return Boolean(session);
}
