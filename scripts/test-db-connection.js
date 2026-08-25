const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Simple .env loader (fallback if dotenv isn't installed)
function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) return;
    let [, key, val] = m;
    if (val.startsWith("\"") && val.endsWith("\"")) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  });
}

const envPath = path.resolve(__dirname, '..', '.env');
loadEnv(envPath);

(async () => {
  try {
    const useSsl = (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1');
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
      waitForConnections: true,
      connectionLimit: 1,
    });

    const [rows] = await pool.execute('SELECT 1 as ok');
    console.log('DB connection successful:', rows);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err.message || err);
    process.exit(1);
  }
})();
