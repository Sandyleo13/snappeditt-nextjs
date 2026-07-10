import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("snappeditt_user");

  if (!userCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orderId = request.nextUrl.searchParams.get("order_id");
  if (!orderId) return NextResponse.json({ error: "order_id required" }, { status: 400 });

  const connection = await db.getConnection();
  try {
    const [rows]: any = await connection.execute(
      `SELECT p.id, p.total, p.paypal_order_id, p.created_at
       FROM payments p
       JOIN orders o ON o.id = p.order_id
       WHERE p.order_id = ? AND o.user_id = ?
       LIMIT 1`,
      [orderId, user_id]
    );

    if (!rows.length) return NextResponse.json({ success: true, payment: null });

    return NextResponse.json({
      success: true,
      payment: {
        id: rows[0].id,
        total: Number(rows[0].total || 0),
        paypal_order_id: rows[0].paypal_order_id,
        created_at: rows[0].created_at,
      },
    });
  } finally {
    connection.release();
  }
}
