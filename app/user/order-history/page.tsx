import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import TabNav from "../orders/TabNav";

export default async function OrderHistoryPage() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) redirect("/login");

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) redirect("/login");

  const connection = await db.getConnection();

  try {
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

    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
            <p className="mt-1 text-sm text-slate-500">
              A full history of all your past orders.
            </p>
          </div>
          <TabNav />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          {orders.length === 0 ? (
            <div className="rounded-xl bg-slate-50 p-10 text-center text-sm text-slate-500">
              No order history found.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order: any) => {
                const isPaylater = order.paypal_order_id?.startsWith("PAYLATER-");
                const label = order.status === "Completed" ? "Completed" : isPaylater ? "Pending" : "Processing";
                const cls =
                  label === "Completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : label === "Pending"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-blue-100 text-blue-600";

                return (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF1F0]">
                      {label === "Completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(order.created_at).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-slate-700 truncate max-w-[160px]">
                        {order.service_names || "Order"}
                      </p>
                      {order.total_qty > 0 && (
                        <p className="text-xs text-slate-500">Qty: {order.total_qty}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sm font-bold text-slate-900">
                        ${Number(order.total || 0).toFixed(2)}
                      </p>
                      <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>
                        {label}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  } finally {
    connection.release();
  }
}
