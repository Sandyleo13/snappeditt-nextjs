import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { orderId, paypalOrderId } = await req.json();

    if (!orderId || !paypalOrderId) {
      return NextResponse.json(
        { success: false, error: "Missing data" },
        { status: 400 }
      );
    }

    await db.execute(
      `
      UPDATE orders
      SET paypal_order_id = ?
      WHERE id = ?
      `,
      [paypalOrderId, orderId]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Paylater Pay Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
