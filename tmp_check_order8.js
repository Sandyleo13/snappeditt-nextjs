const mysql = require('mysql2/promise');
const fs = require('fs');
(async () => {
  const env = fs.readFileSync('.env', 'utf8').split(/\r?\n/).reduce((acc, line) => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) acc[m[1]] = m[2];
    return acc;
  }, {});
  const conn = await mysql.createConnection({
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'snappedittt',
    port: Number(env.DB_PORT) || 3306,
  });

  const [orders] = await conn.execute('SELECT * FROM orders WHERE id = ?', [8]);
  const [items] = await conn.execute('SELECT * FROM order_items WHERE order_id = ?', [8]);
  const [payments] = await conn.execute('SELECT * FROM payments WHERE order_id = ?', [8]);

  console.log('orders:', JSON.stringify(orders, null, 2));
  console.log('items:', JSON.stringify(items, null, 2));
  console.log('payments:', JSON.stringify(payments, null, 2));

  await conn.end();
})();
