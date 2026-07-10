import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import PaymentsClient from "./PaymentsClient";

export default async function PaymentsPage() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("snappeditt_user");

  if (!userCookie) redirect("/login");

  const user_id = Number(userCookie.value);
  if (!user_id || isNaN(user_id)) redirect("/login");

  const connection = await db.getConnection();

  try {
    const [payments]: any = await connection.execute(
      `SELECT p.id, p.total, p.paypal_order_id, p.created_at,
              o.id AS order_id, p.service_name
       FROM payments p
       JOIN orders o ON o.id = p.order_id
       WHERE o.user_id = ?
       ORDER BY p.created_at DESC`,
      [user_id]
    );

    const totalPaid = payments
      .filter((p: any) => !p.paypal_order_id?.startsWith("PAYLATER-"))
      .reduce((sum: number, p: any) => sum + Number(p.total || 0), 0);

    const totalPending = payments
      .filter((p: any) => p.paypal_order_id?.startsWith("PAYLATER-"))
      .reduce((sum: number, p: any) => sum + Number(p.total || 0), 0);

    const serialized = payments.map((p: any) => ({
      id: p.id,
      order_id: p.order_id,
      total: Number(p.total || 0),
      paypal_order_id: p.paypal_order_id ?? null,
      created_at: new Date(p.created_at).toISOString(),
      service_name: p.service_name ?? null,
    }));

    return (
      <PaymentsClient
        payments={serialized}
        totalPaid={totalPaid}
        totalPending={totalPending}
      />
    );
  } finally {
    connection.release();
  }
}
