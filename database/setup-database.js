const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Read .env file manually
const envPath = path.join(__dirname, '..', '.env');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    port: envVars.DB_PORT || 3306,
  });

  console.log('✓ Connected to database:', envVars.DB_NAME);

  try {
    // Check if users table exists and has required columns
    const [columns] = await connection.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'`,
      [envVars.DB_NAME]
    );

    const columnNames = columns.map(c => c.COLUMN_NAME);
    console.log('\n📊 Existing users table columns:', columnNames);

    // Add missing columns to users table
    if (!columnNames.includes('first_name')) {
      await connection.execute('ALTER TABLE users ADD COLUMN first_name VARCHAR(100) AFTER id');
      console.log('✓ Added first_name column');
    }

    if (!columnNames.includes('last_name')) {
      await connection.execute('ALTER TABLE users ADD COLUMN last_name VARCHAR(100) AFTER first_name');
      console.log('✓ Added last_name column');
    }

    if (!columnNames.includes('mobile')) {
      await connection.execute('ALTER TABLE users ADD COLUMN mobile VARCHAR(20) AFTER email');
      console.log('✓ Added mobile column');
    }

  } catch (err) {
    if (err.code === 'ER_NO_SUCH_TABLE') {
      console.log('⚠ Users table does not exist, creating it...');
      await connection.execute(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          email VARCHAR(255) NOT NULL UNIQUE,
          mobile VARCHAR(20),
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_email (email)
        )
      `);
      console.log('✓ Created users table');
    }
  }

  // Create orders table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      paypal_order_id VARCHAR(255),
      total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_user_id (user_id),
      INDEX idx_paypal_order_id (paypal_order_id),
      INDEX idx_created_at (created_at)
    )
  `);
  console.log('✓ Orders table ready');

  // Create order_items table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      service_name VARCHAR(255) NOT NULL,
      qty INT NOT NULL DEFAULT 1,
      price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      retouching VARCHAR(255),
      declutterType VARCHAR(255),
      color VARCHAR(100),
      detailing VARCHAR(255),
      order_name VARCHAR(255),
      order_images TEXT,
      order_details TEXT,
      addons TEXT,
      status VARCHAR(50) DEFAULT 'paid',
      status_comment TEXT,
      comment TEXT,
      extra_options TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_order_id (order_id),
      INDEX idx_status (status)
    )
  `);
  console.log('✓ Order_items table ready');

  await connection.end();
  console.log('\n✅ Database setup completed successfully!\n');
}

setupDatabase().catch(err => {
  console.error('\n❌ Error:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});
