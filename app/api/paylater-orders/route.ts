import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("snappeditt_user");

    if (!userCookie) {
      return NextResponse.json(
        { success: false, error: "Not logged in" },
        { status: 401 }
      );
    }

    const user_id = Number(userCookie.value);

    const [orders]: any = await db.execute(
      `
      SELECT 
        o.id,
        o.total,
        o.created_at,
        o.paypal_order_id,
        oi.service_name,
        oi.order_images,
        oi.status
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      AND LOWER(o.paypal_order_id) LIKE 'paylater%'
      ORDER BY o.created_at DESC
      `,
      [user_id]
    );

    return NextResponse.json({
      success: true,
      orders,
    });

  } catch (error: any) {
    console.error("Paylater Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
