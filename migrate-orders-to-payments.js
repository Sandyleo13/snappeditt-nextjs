const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Manual .env parsing
const envPath = path.join(__dirname, '.env');
const envConfig = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envConfig[key.trim()] = value.trim();
    }
  });
}

const DB_HOST = envConfig.DB_HOST || process.env.DB_HOST;
const DB_USER = envConfig.DB_USER || process.env.DB_USER;
const DB_PASSWORD = envConfig.DB_PASSWORD || process.env.DB_PASSWORD;
const DB_NAME = envConfig.DB_NAME || process.env.DB_NAME;

async function migrateOrdersToPayments() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  });

  try {
    console.log('🔄 Starting migration: Orders → Payments table...\n');

    // Get all orders with user info and order items
    const [orders] = await connection.execute(`
      SELECT 
        o.id as order_id,
        o.created_at,
        u.first_name,
        u.last_name,
        u.email,
        oi.service_name,
        oi.qty,
        oi.price
      FROM orders o
      JOIN users u ON u.id = o.user_id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id NOT IN (SELECT DISTINCT order_id FROM payments)
      ORDER BY o.created_at DESC
    `);

    if (orders.length === 0) {
      console.log('✅ No orders to migrate. All orders are already in payments table.');
      return;
    }

    console.log(`📦 Found ${orders.length} order(s) to migrate...\n`);

    let migrated = 0;
    for (const order of orders) {
      const userName = `${order.first_name} ${order.last_name}`;
      const total = (order.price || 0) * (order.qty || 1);
      
      await connection.execute(`
        INSERT INTO payments 
          (order_id, user_name, user_email, service_name, qty, total, paypal_order_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        order.order_id,
        userName,
        order.email,
        order.service_name || 'Unknown Service',
        order.qty || 1,
        total,
        'MIGRATED-' + order.order_id,
        order.created_at
      ]);

      migrated++;
      console.log(`✅ Migrated Order #${order.order_id} - ${userName} - ${order.service_name} - $${total}`);
    }

    console.log(`\n🎉 Successfully migrated ${migrated} order(s) to payments table!`);

    // Show summary
    const [paymentCount] = await connection.execute('SELECT COUNT(*) as count FROM payments');
    const [orderCount] = await connection.execute('SELECT COUNT(*) as count FROM orders');
    
    console.log('\n📊 Summary:');
    console.log(`Total Orders: ${orderCount[0].count}`);
    console.log(`Total Payments: ${paymentCount[0].count}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await connection.end();
  }
}

migrateOrdersToPayments();
