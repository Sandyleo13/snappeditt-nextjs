const mysql = require('mysql2/promise');
const fs = require('fs');
const env = {};
fs.readFileSync('.env', 'utf8').split(/\r?\n/).forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      port: Number(env.DB_PORT || 3306),
    });
    const [rows] = await conn.execute('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?', [env.DB_NAME]);
    console.log(rows.map(r => r.TABLE_NAME).sort().join('\n'));
    const [cols] = await conn.execute('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?', [env.DB_NAME, 'order_items']);
    console.log('--- order_items cols ---');
    console.log(cols.map(r => r.COLUMN_NAME).join(', '));
    await conn.end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
