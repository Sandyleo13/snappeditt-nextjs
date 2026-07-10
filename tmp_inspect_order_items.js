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
  const [rows] = await conn.execute(
    `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
     ORDER BY ORDINAL_POSITION`,
    [env.DB_NAME, 'order_items']
  );
  console.log(JSON.stringify(rows, null, 2));
  await conn.end();
})();
