import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = NextResponse.redirect(
    new URL("/", req.url)
  );

  response.cookies.delete("snappeditt_user");

  return response;
}
