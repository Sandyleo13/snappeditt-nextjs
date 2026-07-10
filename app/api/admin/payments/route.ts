import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await db.execute(`
      SELECT 
        p.id,
        p.order_id,
        p.user_name,
        p.user_email,
        p.service_name,
        p.qty,
        p.total,
        p.paypal_order_id,
        p.created_at
      FROM payments p
      ORDER BY p.created_at DESC
    `);

    return NextResponse.json({ success: true, payments: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
