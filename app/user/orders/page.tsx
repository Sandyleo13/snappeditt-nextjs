import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import OrdersClient from "./OrdersClient";

export default async function OrdersPage() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) redirect("/login");

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) redirect("/login");

  const connection = await db.getConnection();

  try {
    // Fetch orders with item details (service name, quantity)
    const [orders]: any = await connection.execute(
      `SELECT 
        o.id,
        o.status,
        p.total,
        p.paypal_order_id,
        o.created_at,
        GROUP_CONCAT(oi.service_name ORDER BY oi.id SEPARATOR ', ') AS service_names,
        SUM(oi.qty) AS total_qty
       FROM orders o
       LEFT JOIN payments p ON p.order_id = o.id
       LEFT JOIN order_items oi ON oi.order_id = o.id
       WHERE o.user_id = ?
       GROUP BY o.id, o.status, p.total, p.paypal_order_id, o.created_at
       ORDER BY o.created_at DESC`,
      [user_id]
    );

    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (o: any) =>
        o.status === "Completed" ||
        (o.paypal_order_id && !o.paypal_order_id.startsWith("PAYLATER-"))
    ).length;
    const pendingOrders = orders.filter(
      (o: any) =>
        o.status !== "Completed" &&
        o.paypal_order_id &&
        o.paypal_order_id.startsWith("PAYLATER-")
    ).length;
    const cancelledOrders = orders.filter(
      (o: any) => o.status === "Cancelled"
    ).length;
    const totalSpent = orders.reduce(
      (sum: number, order: any) => sum + Number(order.total || 0),
      0
    );

    const serializable = orders.map((o: any) => ({
      id: o.id,
      status: o.status,
      total: Number(o.total || 0),
      paypal_order_id: o.paypal_order_id || null,
      created_at: new Date(o.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      service_name: o.service_names || "Order",
      quantity: Number(o.total_qty || 0),
    }));

    return (
      <OrdersClient
        orders={serializable}
        totalOrders={totalOrders}
        completedOrders={completedOrders}
        pendingOrders={pendingOrders}
        cancelledOrders={cancelledOrders}
        totalSpent={totalSpent}
      />
    );
  } finally {
    connection.release();
  }
}
