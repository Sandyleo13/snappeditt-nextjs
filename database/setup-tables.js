const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  const content = fs.readFileSync(filePath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...valueParts] = trimmed.split('=');
    if (!key || valueParts.length === 0) return;
    env[key.trim()] = valueParts.join('=').trim();
  });
  return env;
}

const env = loadEnv(path.join(__dirname, '..', '.env'));

async function createTables() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT || 3306,
  });

  console.log('Connected to database...');

  const sql = fs.readFileSync(path.join(__dirname, 'create-tables.sql'), 'utf8');
  const statements = sql.split(';').filter(s => s.trim());

  for (const statement of statements) {
    if (statement.trim()) {
      try {
        await connection.execute(statement);
        console.log('✓ Executed:', statement.substring(0, 50) + '...');
      } catch (err) {
        console.error('✗ Error:', err.message);
      }
    }
  }

  // Ensure order_items has the new columns if the table was created by an older schema.
  const [existingColumns] = await connection.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [env.DB_NAME, 'order_items']
  );

  const currentColumns = new Set(existingColumns.map((row) => row.COLUMN_NAME));
  const alterations = [];

  if (!currentColumns.has('status_comment')) alterations.push('ADD COLUMN status_comment TEXT');
  if (!currentColumns.has('comment')) alterations.push('ADD COLUMN comment TEXT');
  if (!currentColumns.has('extra_options')) alterations.push('ADD COLUMN extra_options TEXT');

  if (alterations.length > 0) {
    await connection.execute(`ALTER TABLE order_items ${alterations.join(', ')}`);
    console.log('✓ Patched order_items schema:', alterations.join(', '));
  } else {
    console.log('✓ order_items schema is already up-to-date');
  }

  await connection.end();
  console.log('\n✅ Database tables created successfully!');
}

createTables().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
