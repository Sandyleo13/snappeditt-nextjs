import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'cart',
    value: JSON.stringify(body),
    httpOnly: true,
    path: '/',
  });

  return response;
}
