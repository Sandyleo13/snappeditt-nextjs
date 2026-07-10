import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

function normalizeStatus(status: string | undefined) {
  const value = (status || "").trim().toLowerCase();

  switch (value) {
    case "in process":
    case "in-process":
    case "inprocess":
      return "In Process";
    case "hold":
      return "Hold";
    case "cancel":
    case "canceled":
    case "cancelled":
      return "Cancel";
    case "completed":
    case "complete":
      return "Completed";
    case "pending":
      return "Pending";
    default:
      return status || "In Process";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = body?.orderId;
    const status = body?.status;
    const comment = body?.comment;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const normalizedStatus = normalizeStatus(status);
    const statusComment = comment ? String(comment).trim() : null;

    const [result]: any = await pool.execute(
      `UPDATE order_items
       SET status = ?, status_comment = ?, comment = ?
       WHERE order_id = ?`,
      [normalizedStatus, statusComment, statusComment, Number(orderId)]
    );

    return NextResponse.json({
      success: true,
      updated: result?.affectedRows || 0,
    });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
