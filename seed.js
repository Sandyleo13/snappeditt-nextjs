const bcrypt = require('bcryptjs');
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

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  });

  try {
    console.log('🔄 Starting database seed...');

    // Create tables if they don't exist
    console.log('📋 Creating tables...');
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add phone column if it doesn't exist
    try {
      await connection.execute(`ALTER TABLE users ADD COLUMN phone VARCHAR(20)`);
    } catch (e) {
      // Column already exists, ignore error
    }

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        service_name VARCHAR(255) NOT NULL,
        qty INT NOT NULL DEFAULT 1,
        upload_date DATE,
        delivery_date DATE,
        status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
        instructions TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        service_name VARCHAR(255) NOT NULL,
        qty INT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        paypal_order_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Tables created/verified');

    // Hash password for all users (password: test123)
    const hashedPassword = await bcrypt.hash('test123', 10);

    // Clear existing data
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    await connection.execute('TRUNCATE TABLE payments');
    await connection.execute('TRUNCATE TABLE orders');
    await connection.execute('TRUNCATE TABLE users');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Cleared existing data');

    // Insert 20 users
    const users = [
      ['John', 'Doe', 'john@test.com', hashedPassword, '1234567890', '2023-01-15 10:30:00'],
      ['Emma', 'Wilson', 'emma@test.com', hashedPassword, '2345678901', '2023-02-20 14:20:00'],
      ['Michael', 'Brown', 'michael@test.com', hashedPassword, '3456789012', '2023-03-10 09:15:00'],
      ['Sarah', 'Davis', 'sarah@test.com', hashedPassword, '4567890123', '2023-04-05 11:45:00'],
      ['David', 'Miller', 'david@test.com', hashedPassword, '5678901234', '2023-05-12 16:30:00'],
      ['Lisa', 'Anderson', 'lisa@test.com', hashedPassword, '6789012345', '2023-06-18 13:20:00'],
      ['James', 'Taylor', 'james@test.com', hashedPassword, '7890123456', '2023-07-22 10:10:00'],
      ['Jennifer', 'Martinez', 'jennifer@test.com', hashedPassword, '8901234567', '2023-08-14 15:40:00'],
      ['Robert', 'Garcia', 'robert@test.com', hashedPassword, '9012345678', '2023-09-08 12:25:00'],
      ['Maria', 'Rodriguez', 'maria@test.com', hashedPassword, '0123456789', '2023-10-03 09:50:00'],
      ['William', 'Hernandez', 'william@test.com', hashedPassword, '1122334455', '2023-11-11 14:15:00'],
      ['Jessica', 'Lopez', 'jessica@test.com', hashedPassword, '2233445566', '2023-12-05 11:30:00'],
      ['Christopher', 'Gonzalez', 'chris@test.com', hashedPassword, '3344556677', '2024-01-20 10:05:00'],
      ['Ashley', 'Wilson', 'ashley@test.com', hashedPassword, '4455667788', '2024-02-14 16:20:00'],
      ['Daniel', 'Moore', 'daniel@test.com', hashedPassword, '5566778899', '2024-03-08 13:40:00'],
      ['Amanda', 'Jackson', 'amanda@test.com', hashedPassword, '6677889900', '2024-04-12 09:25:00'],
      ['Matthew', 'White', 'matthew@test.com', hashedPassword, '7788990011', '2024-05-18 15:10:00'],
      ['Stephanie', 'Harris', 'stephanie@test.com', hashedPassword, '8899001122', '2024-06-22 12:50:00'],
      ['Joshua', 'Clark', 'joshua@test.com', hashedPassword, '9900112233', '2024-07-15 10:35:00'],
      ['Nicole', 'Lewis', 'nicole@test.com', hashedPassword, '0011223344', '2024-08-10 14:45:00']
    ];

    await connection.query(
      `INSERT INTO users (first_name, last_name, email, password, phone, created_at) VALUES ?`,
      [users]
    );
    console.log('✅ Inserted 20 users');

    // Insert orders
    const orders = [
      // User 1: John
      [1, 'HDR Basic', 10, '2024-01-10', '2024-01-12', 'Completed', 'Please enhance colors', '2024-01-10 10:00:00'],
      [1, 'Single Exposure', 5, '2024-02-15', '2024-02-17', 'Completed', 'Standard editing', '2024-02-15 09:30:00'],
      [1, 'Virtual Staging', 3, '2024-03-20', '2024-03-23', 'Processing', 'Modern furniture', '2024-03-20 14:20:00'],
      
      // User 2: Emma
      [2, 'Wedding Retouch', 50, '2024-01-05', '2024-01-08', 'Completed', 'Natural skin tones', '2024-01-05 11:00:00'],
      [2, 'Perfect Color Balance', 100, '2024-02-10', '2024-02-13', 'Completed', 'Warm tones', '2024-02-10 10:15:00'],
      
      // User 3: Michael
      [3, 'Product Retouching', 25, '2024-01-12', '2024-01-15', 'Completed', 'White background', '2024-01-12 13:40:00'],
      [3, 'Ghost Mannequin', 15, '2024-03-05', '2024-03-08', 'Completed', 'Clean edges', '2024-03-05 15:20:00'],
      
      // User 4: Sarah
      [4, 'HDR Premium', 8, '2024-02-01', '2024-02-03', 'Completed', 'Bright and airy', '2024-02-01 09:00:00'],
      [4, 'Day To Dusk', 4, '2024-03-15', '2024-03-18', 'Completed', 'Warm sunset', '2024-03-15 16:30:00'],
      
      // User 5: David
      [5, 'Portrait Retouch', 20, '2024-01-20', '2024-01-23', 'Completed', 'Professional headshots', '2024-01-20 10:30:00'],
      [5, 'Corporate Headshots', 30, '2024-04-10', '2024-04-13', 'Processing', 'Business professional', '2024-04-10 11:00:00'],
      
      // User 6: Lisa
      [6, 'Flambient Editing', 12, '2024-02-05', '2024-02-08', 'Completed', 'Natural lighting', '2024-02-05 14:00:00'],
      
      // User 7: James
      [7, 'Album Retouch', 40, '2024-01-25', '2024-01-28', 'Completed', 'Wedding album', '2024-01-25 10:00:00'],
      [7, 'Fashion Retouching', 15, '2024-03-12', '2024-03-15', 'Completed', 'Magazine quality', '2024-03-12 13:20:00'],
      
      // User 8: Jennifer
      [8, '3D Floor Plan', 5, '2024-02-20', '2024-02-24', 'Completed', 'Modern style', '2024-02-20 09:30:00'],
      
      // User 9: Robert
      [9, 'UAV Retouching', 10, '2024-01-30', '2024-02-02', 'Completed', 'Aerial photography', '2024-01-30 15:00:00'],
      
      // User 10: Maria
      [10, 'Jewelry', 20, '2024-02-15', '2024-02-18', 'Completed', 'High-end jewelry', '2024-02-15 11:30:00'],
      
      // User 11: William
      [11, 'Architecture Retouching', 6, '2024-03-01', '2024-03-04', 'Completed', 'Commercial building', '2024-03-01 10:00:00'],
      
      // User 12: Jessica
      [12, 'Maternity Retouch', 25, '2024-02-25', '2024-02-28', 'Completed', 'Soft and natural', '2024-02-25 14:30:00'],
      
      // User 13: Christopher
      [13, 'Product Composite', 10, '2024-03-10', '2024-03-13', 'Completed', 'Creative composites', '2024-03-10 09:00:00'],
      
      // User 14: Ashley
      [14, 'School Retouching', 50, '2024-03-20', '2024-03-23', 'Processing', 'School portraits', '2024-03-20 10:30:00'],
      
      // User 15: Daniel
      [15, 'Sports Retouching', 30, '2024-04-01', '2024-04-04', 'Pending', 'Action shots', '2024-04-01 11:00:00'],
      
      // User 16: Amanda
      [16, 'Clipping Path', 100, '2024-03-15', '2024-03-18', 'Completed', 'Simple clipping', '2024-03-15 13:00:00'],
      
      // User 17: Matthew
      [17, 'Extraction', 40, '2024-04-05', '2024-04-08', 'Processing', 'Complex extraction', '2024-04-05 14:00:00'],
      
      // User 18: Stephanie
      [18, 'Manual Blending', 8, '2024-03-25', '2024-03-28', 'Completed', 'Real estate photos', '2024-03-25 10:00:00'],
      
      // User 19: Joshua
      [19, 'New Born Retouch', 15, '2024-04-10', '2024-04-13', 'Processing', 'Newborn baby photos', '2024-04-10 09:30:00'],
      
      // User 20: Nicole
      [20, '3D Rendering', 3, '2024-04-15', '2024-04-20', 'Pending', 'Architectural rendering', '2024-04-15 15:00:00']
    ];

    await connection.query(
      `INSERT INTO orders (user_id, service_name, qty, upload_date, delivery_date, status, instructions, created_at) VALUES ?`,
      [orders]
    );
    console.log('✅ Inserted 27 orders');

    // Insert payments (mix of paid and pay later)
    const payments = [
      // User 1: John
      [1, 'John Doe', 'john@test.com', 'HDR Basic', 10, 120.00, 'PAYID-M123456789ABC', '2024-01-10 10:05:00'],
      [2, 'John Doe', 'john@test.com', 'Single Exposure', 5, 45.00, 'PAYID-M234567890BCD', '2024-02-15 09:35:00'],
      [3, 'John Doe', 'john@test.com', 'Virtual Staging', 3, 450.00, 'PAYLATER-001', '2024-03-20 14:25:00'],
      
      // User 2: Emma
      [4, 'Emma Wilson', 'emma@test.com', 'Wedding Retouch', 50, 400.00, 'PAYID-M345678901CDE', '2024-01-05 11:05:00'],
      [5, 'Emma Wilson', 'emma@test.com', 'Perfect Color Balance', 100, 350.00, 'PAYID-M456789012DEF', '2024-02-10 10:20:00'],
      
      // User 3: Michael
      [6, 'Michael Brown', 'michael@test.com', 'Product Retouching', 25, 375.00, 'PAYID-M567890123EFG', '2024-01-12 13:45:00'],
      [7, 'Michael Brown', 'michael@test.com', 'Ghost Mannequin', 15, 300.00, 'PAYLATER-002', '2024-03-05 15:25:00'],
      
      // User 4: Sarah
      [8, 'Sarah Davis', 'sarah@test.com', 'HDR Premium', 8, 160.00, 'PAYID-M678901234FGH', '2024-02-01 09:05:00'],
      [9, 'Sarah Davis', 'sarah@test.com', 'Day To Dusk', 4, 120.00, 'PAYID-M789012345GHI', '2024-03-15 16:35:00'],
      
      // User 5: David
      [10, 'David Miller', 'david@test.com', 'Portrait Retouch', 20, 280.00, 'PAYID-M890123456HIJ', '2024-01-20 10:35:00'],
      [11, 'David Miller', 'david@test.com', 'Corporate Headshots', 30, 450.00, 'PAYLATER-003', '2024-04-10 11:05:00'],
      
      // User 6: Lisa
      [12, 'Lisa Anderson', 'lisa@test.com', 'Flambient Editing', 12, 240.00, 'PAYID-M901234567IJK', '2024-02-05 14:05:00'],
      
      // User 7: James
      [13, 'James Taylor', 'james@test.com', 'Album Retouch', 40, 600.00, 'PAYID-M012345678JKL', '2024-01-25 10:05:00'],
      [14, 'James Taylor', 'james@test.com', 'Fashion Retouching', 15, 375.00, 'PAYID-M123456789KLM', '2024-03-12 13:25:00'],
      
      // User 8: Jennifer
      [15, 'Jennifer Martinez', 'jennifer@test.com', '3D Floor Plan', 5, 750.00, 'PAYID-M234567890LMN', '2024-02-20 09:35:00'],
      
      // User 9: Robert
      [16, 'Robert Garcia', 'robert@test.com', 'UAV Retouching', 10, 150.00, 'PAYID-M345678901MNO', '2024-01-30 15:05:00'],
      
      // User 10: Maria
      [17, 'Maria Rodriguez', 'maria@test.com', 'Jewelry', 20, 500.00, 'PAYID-M456789012NOP', '2024-02-15 11:35:00'],
      
      // User 11: William
      [18, 'William Hernandez', 'william@test.com', 'Architecture Retouching', 6, 180.00, 'PAYLATER-004', '2024-03-01 10:05:00'],
      
      // User 12: Jessica
      [19, 'Jessica Lopez', 'jessica@test.com', 'Maternity Retouch', 25, 375.00, 'PAYID-M567890123OPQ', '2024-02-25 14:35:00'],
      
      // User 13: Christopher
      [20, 'Christopher Gonzalez', 'chris@test.com', 'Product Composite', 10, 250.00, 'PAYID-M678901234PQR', '2024-03-10 09:05:00'],
      
      // User 14: Ashley
      [21, 'Ashley Wilson', 'ashley@test.com', 'School Retouching', 50, 400.00, 'PAYLATER-005', '2024-03-20 10:35:00'],
      
      // User 15: Daniel
      [22, 'Daniel Moore', 'daniel@test.com', 'Sports Retouching', 30, 450.00, 'PAYLATER-006', '2024-04-01 11:05:00'],
      
      // User 16: Amanda
      [23, 'Amanda Jackson', 'amanda@test.com', 'Clipping Path', 100, 300.00, 'PAYID-M789012345QRS', '2024-03-15 13:05:00'],
      
      // User 17: Matthew
      [24, 'Matthew White', 'matthew@test.com', 'Extraction', 40, 280.00, 'PAYLATER-007', '2024-04-05 14:05:00'],
      
      // User 18: Stephanie
      [25, 'Stephanie Harris', 'stephanie@test.com', 'Manual Blending', 8, 200.00, 'PAYID-M890123456RST', '2024-03-25 10:05:00'],
      
      // User 19: Joshua
      [26, 'Joshua Clark', 'joshua@test.com', 'New Born Retouch', 15, 300.00, 'PAYLATER-008', '2024-04-10 09:35:00'],
      
      // User 20: Nicole
      [27, 'Nicole Lewis', 'nicole@test.com', '3D Rendering', 3, 900.00, 'PAYLATER-009', '2024-04-15 15:05:00']
    ];

    await connection.query(
      `INSERT INTO payments (order_id, user_name, user_email, service_name, qty, total, paypal_order_id, created_at) VALUES ?`,
      [payments]
    );
    console.log('✅ Inserted 27 payments');

    // Show summary
    const [stats] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM orders) as total_orders,
        (SELECT COUNT(*) FROM payments) as total_payments,
        (SELECT COUNT(*) FROM payments WHERE paypal_order_id NOT LIKE 'PAYLATER%') as paid_orders,
        (SELECT COUNT(*) FROM payments WHERE paypal_order_id LIKE 'PAYLATER%') as paylater_orders,
        (SELECT SUM(total) FROM payments) as total_revenue
    `);

    console.log('\n📊 Database Seed Summary:');
    console.log('========================');
    console.log(`Total Users: ${stats[0].total_users}`);
    console.log(`Total Orders: ${stats[0].total_orders}`);
    console.log(`Total Payments: ${stats[0].total_payments}`);
    console.log(`Paid Orders: ${stats[0].paid_orders}`);
    console.log(`Pay Later Orders: ${stats[0].paylater_orders}`);
    console.log(`Total Revenue: $${stats[0].total_revenue}`);
    console.log('\n✅ Database seeded successfully!');
    console.log('\n🔑 Login Credentials for all users:');
    console.log('Email: john@test.com (or any other user email)');
    console.log('Password: test123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seedDatabase();
