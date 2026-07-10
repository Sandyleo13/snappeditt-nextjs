import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  Wallet,
  ChevronRight,
  PlusCircle,
  History,
  CreditCard,
  User,
} from "lucide-react";

export default async function UserDashboard() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) redirect("/login");

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) redirect("/login");

  const connection = await db.getConnection();

  try {
    const [users]: any = await connection.execute(
      `SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE id = ?`,
      [user_id]
    );

    if (!users.length) redirect("/login");
    const user = users[0];

    const [orders]: any = await connection.execute(
      `SELECT 
        o.id, o.paypal_order_id, o.total, o.created_at,
        GROUP_CONCAT(oi.service_name ORDER BY oi.id SEPARATOR ', ') AS service_names,
        SUM(oi.qty) AS total_qty
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       WHERE o.user_id = ?
       GROUP BY o.id, o.paypal_order_id, o.total, o.created_at
       ORDER BY o.created_at DESC`,
      [user_id]
    );

    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (o: any) => o.paypal_order_id && !o.paypal_order_id.startsWith("PAYLATER-")
    ).length;
    const pendingOrders = orders.filter(
      (o: any) => o.paypal_order_id && o.paypal_order_id.startsWith("PAYLATER-")
    ).length;
    const totalSpent = orders.reduce(
      (sum: number, order: any) => sum + Number(order.total || 0),
      0
    );
    const userName = user.first_name || user.email.split("@")[0];
    const recentOrders = orders.slice(0, 5);

    return (
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with your orders today.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <DashStatCard
            icon={<ShoppingBag className="h-5 w-5 text-[#E53E3E]" />}
            iconBg="bg-[#FFF1F0]"
            label="Total Orders"
            value={totalOrders}
            sub="All time orders"
          />
          <DashStatCard
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
            label="Completed"
            value={completedOrders}
            sub={
              totalOrders > 0
                ? `${Math.round((completedOrders / totalOrders) * 100)}% completion rate`
                : "No orders yet"
            }
            subColor="text-emerald-600"
          />
          <DashStatCard
            icon={<Clock className="h-5 w-5 text-amber-500" />}
            iconBg="bg-amber-50"
            label="Pending"
            value={pendingOrders}
            sub="Currently in progress"
            subColor="text-amber-500"
          />
          <DashStatCard
            icon={<Wallet className="h-5 w-5 text-blue-500" />}
            iconBg="bg-blue-50"
            label="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
            sub="All time spending"
          />
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          {/* Recent orders */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Your latest order activity.
                </p>
              </div>
              <Link
                href="/user/orders"
                className="rounded-full bg-[#E53E3E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C53030]"
              >
                View all orders
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                  No recent orders found.
                </div>
              ) : (
                recentOrders.map((order: any) => {
                  const isPaylater = order.paypal_order_id?.startsWith("PAYLATER-");
                  const label = isPaylater ? "Pending" : "Completed";
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
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF1F0]">
                        <ShoppingBag className="h-5 w-5 text-[#E53E3E]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          Order #{order.id}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(order.created_at).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <div className="hidden sm:block text-right min-w-[120px]">
                        <p className="text-sm font-medium text-slate-700 truncate">
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
                })
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#F44336] text-lg font-bold text-white">
                  {user.first_name?.[0]?.toUpperCase() ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-slate-500">Premium Member</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <InfoRow label="Email" value={user.email} />
                <InfoRow
                  label="Member since"
                  value={new Date(user.created_at).toLocaleDateString()}
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-bold text-slate-900">Quick Actions</h3>
              <div className="space-y-2">
                <QuickLink
                  icon={<PlusCircle className="h-4 w-4 text-[#E53E3E]" />}
                  iconBg="bg-[#FFF1F0]"
                  label="Place New Order"
                  href="/cart"
                />
                <QuickLink
                  icon={<History className="h-4 w-4 text-blue-500" />}
                  iconBg="bg-blue-50"
                  label="Order History"
                  href="/user/order-history"
                />
                <QuickLink
                  icon={<CreditCard className="h-4 w-4 text-purple-500" />}
                  iconBg="bg-purple-50"
                  label="Payments"
                  href="/user/payments"
                />
                <QuickLink
                  icon={<User className="h-4 w-4 text-slate-500" />}
                  iconBg="bg-slate-100"
                  label="Edit Profile"
                  href="/user/profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } finally {
    connection.release();
  }
}

function DashStatCard({
  icon,
  iconBg,
  label,
  value,
  sub,
  subColor = "text-slate-500",
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  sub: string;
  subColor?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      <p className={`mt-1 text-xs font-medium ${subColor}`}>{sub}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="max-w-[160px] truncate text-xs font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function QuickLink({
  icon,
  iconBg,
  label,
  href,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
    >
      <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}
