import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("snappeditt_user");

  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderId = request.nextUrl.searchParams.get("order_id");
  if (!orderId) {
    return NextResponse.json({ error: "order_id required" }, { status: 400 });
  }

  const connection = await db.getConnection();
  try {
    // Verify this order belongs to the requesting user
    const [orders]: any = await connection.execute(
      `SELECT o.id, o.status, o.created_at, o.delivery_date, o.instructions,
              p.total, p.paypal_order_id, p.created_at AS paid_at
       FROM orders o
       LEFT JOIN payments p ON p.order_id = o.id
       WHERE o.id = ? AND o.user_id = ?`,
      [orderId, user_id]
    );

    if (!orders.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orders[0];

    // Fetch all items for this order
    const [items]: any = await connection.execute(
      `SELECT id, service_name, qty, price, retouching, declutterType,
              color, detailing, order_name, order_images, order_details,
              addons, status, comment, status_comment
       FROM order_items
       WHERE order_id = ?`,
      [orderId]
    );

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        created_at: order.created_at,
        delivery_date: order.delivery_date,
        instructions: order.instructions,
        total: order.total,
        paypal_order_id: order.paypal_order_id,
        paid_at: order.paid_at,
      },
      items: items.map((item: any) => ({
        ...item,
        order_images: (() => {
          try { return JSON.parse(item.order_images || "[]"); }
          catch { return []; }
        })(),
        addons: (() => {
          try { return JSON.parse(item.addons || "[]"); }
          catch { return []; }
        })(),
      })),
    });
  } finally {
    connection.release();
  }
}
