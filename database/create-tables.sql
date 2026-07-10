-- Create orders table
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
);

-- Create order_items table
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
  INDEX idx_status (status),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Check and alter users table to ensure it has required columns
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  mobile VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- If users table exists but missing columns, add them
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS first_name VARCHAR(100) AFTER id,
  ADD COLUMN IF NOT EXISTS last_name VARCHAR(100) AFTER first_name,
  ADD COLUMN IF NOT EXISTS mobile VARCHAR(20) AFTER email;
