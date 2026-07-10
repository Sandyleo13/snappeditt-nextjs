import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("admin_session");
    
    console.log("[Dashboard] Cookie check:", adminCookie);
    
    if (!adminCookie) {
      console.log("[Dashboard] No cookie found - Unauthorized");
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Basic stats
    const [orders]: any = await db.execute("SELECT COUNT(*) as total FROM orders");
    const [users]: any = await db.execute("SELECT COUNT(*) as total FROM users");
    const [totalRevenue]: any = await db.execute(
      "SELECT COALESCE(SUM(total), 0) as total FROM payments"
    );
    const [paidRevenue]: any = await db.execute(
      "SELECT COALESCE(SUM(total), 0) as total FROM payments WHERE paypal_order_id NOT LIKE 'PAYLATER%'"
    );
    const [unpaidRevenue]: any = await db.execute(
      "SELECT COALESCE(SUM(total), 0) as total FROM payments WHERE paypal_order_id LIKE 'PAYLATER%'"
    );
    
    // Sales data (last 30 days)
    const [salesData]: any = await db.execute(`
      SELECT DATE(created_at) as date, 
             SUM(total) as total,
             COUNT(*) as orders
      FROM payments 
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

    // Monthly sales growth (last 12 months)
    const [monthlySales]: any = await db.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        DATE_FORMAT(created_at, '%b %Y') as month_label,
        SUM(total) as revenue,
        COUNT(*) as orders,
        SUM(CASE WHEN paypal_order_id NOT LIKE 'PAYLATER%' THEN 1 ELSE 0 END) as paid_orders,
        SUM(CASE WHEN paypal_order_id LIKE 'PAYLATER%' THEN 1 ELSE 0 END) as unpaid_orders
      FROM payments
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b %Y')
      ORDER BY month ASC
    `);

    // Yearly statistics
    const [yearlySales]: any = await db.execute(`
      SELECT 
        YEAR(created_at) as year,
        SUM(total) as revenue,
        COUNT(*) as orders,
        SUM(CASE WHEN paypal_order_id NOT LIKE 'PAYLATER%' THEN 1 ELSE 0 END) as paid_orders,
        SUM(CASE WHEN paypal_order_id LIKE 'PAYLATER%' THEN 1 ELSE 0 END) as unpaid_orders,
        ROUND(AVG(total), 2) as avg_order_value
      FROM payments
      GROUP BY YEAR(created_at)
      ORDER BY year DESC
    `);

    // Top services by revenue
    const [topServices]: any = await db.execute(`
      SELECT 
        service_name,
        SUM(total) as revenue,
        COUNT(*) as orders,
        SUM(qty) as total_quantity
      FROM payments
      GROUP BY service_name
      ORDER BY revenue DESC
      LIMIT 10
    `);

    // Recent orders
    const [recentOrders]: any = await db.execute(`
      SELECT p.id, p.total, p.created_at, p.paypal_order_id, p.user_name, p.user_email, p.service_name, p.qty,
        oi.status
      FROM payments p
      LEFT JOIN orders o ON p.order_id = o.id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      ORDER BY p.created_at DESC
      LIMIT 10
    `);

    // Top customers by revenue
    const [topCustomers]: any = await db.execute(`
      SELECT 
        user_email,
        user_name,
        SUM(total) as total_spent,
        COUNT(*) as order_count
      FROM payments
      GROUP BY user_email, user_name
      ORDER BY total_spent DESC
      LIMIT 10
    `);

    // Order status distribution
    const [orderStatus]: any = await db.execute(`
      SELECT 
        status,
        COUNT(*) as count
      FROM order_items
      GROUP BY status
    `);

    // Recent users
    const [recentUsers]: any = await db.execute(`
      SELECT id, first_name, last_name, email, phone, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 10
    `);

    // Payment method distribution
    const [paymentMethods]: any = await db.execute(`
      SELECT 
        CASE 
          WHEN paypal_order_id LIKE 'PAYLATER%' THEN 'Pay Later'
          ELSE 'Paid'
        END as payment_type,
        COUNT(*) as count,
        SUM(total) as revenue
      FROM payments
      GROUP BY payment_type
    `);

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders: orders[0].total,
        totalCustomers: users[0].total,
        totalRevenue: parseFloat(totalRevenue[0].total) || 0,
        paidRevenue: parseFloat(paidRevenue[0].total) || 0,
        unpaidRevenue: parseFloat(unpaidRevenue[0].total) || 0,
        averageOrderValue: orders[0].total > 0 ? (parseFloat(totalRevenue[0].total) / orders[0].total) : 0
      },
      salesData,
      monthlySales,
      yearlySales,
      topServices,
      recentOrders,
      topCustomers,
      orderStatus,
      recentUsers,
      paymentMethods
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
