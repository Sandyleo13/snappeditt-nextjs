// app/api/order/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { sendInvoiceEmail } from "@/lib/mailer";

console.log("✅ [order/route.ts] Module loaded");

export async function POST(req: Request) {
  console.log("✅ [POST /api/order] Handler entered");

  const connection = await db.getConnection();

  try {
    const body = await req.json();
    console.log("📦 [POST /api/order] Body received:", JSON.stringify(body, null, 2));

    const cookieStore = await cookies();
    const userCookie = cookieStore.get("snappeditt_user");
    console.log("🍪 [POST /api/order] Cookie:", userCookie);

    if (!userCookie) {
      console.warn("⚠️ [POST /api/order] No user cookie found");
      return NextResponse.json(
        { success: false, error: "Not logged in" },
        { status: 401 }
      );
    }

    const user_id = Number(userCookie.value);
    console.log("👤 [POST /api/order] user_id:", user_id);

    if (!body.paypal_order_id) {
      console.warn("⚠️ [POST /api/order] Missing paypal_order_id");
      throw new Error("Missing PayPal Order ID");
    }

    // ✅ Get user email securely from DB
    const [users]: any = await connection.execute(
      `SELECT email FROM users WHERE id = ?`,
      [user_id]
    );
    console.log("📧 [POST /api/order] DB user lookup result:", users);

    if (!users.length) {
      console.warn("⚠️ [POST /api/order] User not found in DB");
      throw new Error("User not found");
    }

    const userEmail = users[0].email;
    console.log("📧 [POST /api/order] User email:", userEmail);

    // ===============================
    // START TRANSACTION
    // ===============================
    await connection.beginTransaction();
    console.log("🔄 [POST /api/order] Transaction started");

    // 1️⃣ Insert Order
    const [orderResult]: any = await connection.execute(
      `INSERT INTO orders 
        (user_id, service_name, qty, upload_date, delivery_date, status, instructions, created_at)
       VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), 'Processing', ?, NOW())`,
      [user_id, body.service_name ?? 'Unknown Service', body.qty ?? 1, body.order_details ?? '']
    );

    const orderId = orderResult.insertId;
    console.log("🧾 [POST /api/order] Order inserted, orderId:", orderId);

    // 2️⃣ Insert Order Items
    await connection.execute(
      `INSERT INTO order_items
        (
          order_id,
          service_name,
          qty,
          price,
          retouching,
          declutterType,
          color,
          detailing,
          order_name,
          order_images,
          order_details,
          addons,
          status
        )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        body.service_name ?? null,
        body.qty ?? 1,
        body.price ?? 0,
        body.retouching ?? null,
        body.declutterType ?? null,
        body.color ?? null,
        body.detailing ?? null,
        body.order_name ?? null,
        JSON.stringify(body.order_images || []),
        body.order_details ?? null,
        JSON.stringify(body.addons || []),
        "paid",
      ]
    );
    console.log("📝 [POST /api/order] Order items inserted");

    // 3️⃣ Insert into Payments table for admin dashboard
    const [userInfo]: any = await connection.execute(
      `SELECT first_name, last_name, email FROM users WHERE id = ?`,
      [user_id]
    );
    
    const userName = userInfo.length > 0 
      ? `${userInfo[0].first_name} ${userInfo[0].last_name}` 
      : 'Unknown User';
    const userEmailForPayment = userInfo.length > 0 ? userInfo[0].email : userEmail;

    await connection.execute(
      `INSERT INTO payments
        (order_id, user_name, user_email, service_name, qty, total, paypal_order_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        orderId,
        userName,
        userEmailForPayment,
        body.service_name ?? 'Unknown Service',
        body.qty ?? 1,
        body.total ?? 0,
        body.paypal_order_id
      ]
    );
    console.log("💳 [POST /api/order] Payment record inserted");

    // ✅ Commit transaction
    await connection.commit();
    console.log("✅ [POST /api/order] Transaction committed");

    // ===============================
    // SEND EMAIL
    // ===============================
    console.log("📨 [POST /api/order] Sending invoice email to:", userEmail);
    try {
      await sendInvoiceEmail(
        userEmail,
        orderId,
        body.service_name ?? "Digital Declutter",
        body.qty ?? 1,
        body.price ?? 0,
        body.retouching ?? null,
        body.declutterType ?? null,
        body.color ?? null,
        body.detailing ?? null,
        body.addons || [],
        body.total
      );
      console.log("✅ [POST /api/order] Invoice email sent successfully");
    } catch (emailError: any) {
      // Don't fail the order if email fails — just log it
      console.error("❌ [POST /api/order] Email send failed:", emailError.message);
    }

    return NextResponse.json({
      success: true,
      order_id: orderId,
    });

  } catch (error: any) {
    await connection.rollback();
    console.error("❌ [POST /api/order] ERROR:", error.message);
    console.error("❌ [POST /api/order] Stack:", error.stack);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    connection.release();
    console.log("🔓 [POST /api/order] DB connection released");
  }
}