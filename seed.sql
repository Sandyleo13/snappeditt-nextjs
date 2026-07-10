-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE payments;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert 20 users with varied data
INSERT INTO users (first_name, last_name, email, password, phone, created_at) VALUES
-- Test user (password: test123)
('John', 'Doe', 'john@test.com', '$2a$10$YourHashedPasswordHere', '1234567890', '2023-01-15 10:30:00'),
('Emma', 'Wilson', 'emma@test.com', '$2a$10$YourHashedPasswordHere', '2345678901', '2023-02-20 14:20:00'),
('Michael', 'Brown', 'michael@test.com', '$2a$10$YourHashedPasswordHere', '3456789012', '2023-03-10 09:15:00'),
('Sarah', 'Davis', 'sarah@test.com', '$2a$10$YourHashedPasswordHere', '4567890123', '2023-04-05 11:45:00'),
('David', 'Miller', 'david@test.com', '$2a$10$YourHashedPasswordHere', '5678901234', '2023-05-12 16:30:00'),
('Lisa', 'Anderson', 'lisa@test.com', '$2a$10$YourHashedPasswordHere', '6789012345', '2023-06-18 13:20:00'),
('James', 'Taylor', 'james@test.com', '$2a$10$YourHashedPasswordHere', '7890123456', '2023-07-22 10:10:00'),
('Jennifer', 'Martinez', 'jennifer@test.com', '$2a$10$YourHashedPasswordHere', '8901234567', '2023-08-14 15:40:00'),
('Robert', 'Garcia', 'robert@test.com', '$2a$10$YourHashedPasswordHere', '9012345678', '2023-09-08 12:25:00'),
('Maria', 'Rodriguez', 'maria@test.com', '$2a$10$YourHashedPasswordHere', '0123456789', '2023-10-03 09:50:00'),
('William', 'Hernandez', 'william@test.com', '$2a$10$YourHashedPasswordHere', '1122334455', '2023-11-11 14:15:00'),
('Jessica', 'Lopez', 'jessica@test.com', '$2a$10$YourHashedPasswordHere', '2233445566', '2023-12-05 11:30:00'),
('Christopher', 'Gonzalez', 'chris@test.com', '$2a$10$YourHashedPasswordHere', '3344556677', '2024-01-20 10:05:00'),
('Ashley', 'Wilson', 'ashley@test.com', '$2a$10$YourHashedPasswordHere', '4455667788', '2024-02-14 16:20:00'),
('Daniel', 'Moore', 'daniel@test.com', '$2a$10$YourHashedPasswordHere', '5566778899', '2024-03-08 13:40:00'),
('Amanda', 'Jackson', 'amanda@test.com', '$2a$10$YourHashedPasswordHere', '6677889900', '2024-04-12 09:25:00'),
('Matthew', 'White', 'matthew@test.com', '$2a$10$YourHashedPasswordHere', '7788990011', '2024-05-18 15:10:00'),
('Stephanie', 'Harris', 'stephanie@test.com', '$2a$10$YourHashedPasswordHere', '8899001122', '2024-06-22 12:50:00'),
('Joshua', 'Clark', 'joshua@test.com', '$2a$10$YourHashedPasswordHere', '9900112233', '2024-07-15 10:35:00'),
('Nicole', 'Lewis', 'nicole@test.com', '$2a$10$YourHashedPasswordHere', '0011223344', '2024-08-10 14:45:00');

-- Insert orders for these users (mix of different services)
INSERT INTO orders (user_id, service_name, qty, upload_date, delivery_date, status, instructions, created_at) VALUES
-- User 1: John - Multiple orders
(1, 'HDR Basic', 10, '2024-01-10', '2024-01-12', 'Completed', 'Please enhance colors', '2024-01-10 10:00:00'),
(1, 'Single Exposure', 5, '2024-02-15', '2024-02-17', 'Completed', 'Standard editing', '2024-02-15 09:30:00'),
(1, 'Virtual Staging', 3, '2024-03-20', '2024-03-23', 'Processing', 'Modern furniture style', '2024-03-20 14:20:00'),

-- User 2: Emma - Wedding services
(2, 'Wedding Retouch', 50, '2024-01-05', '2024-01-08', 'Completed', 'Natural skin tones', '2024-01-05 11:00:00'),
(2, 'Perfect Color Balance', 100, '2024-02-10', '2024-02-13', 'Completed', 'Warm tones preferred', '2024-02-10 10:15:00'),

-- User 3: Michael - Commercial
(3, 'Product Retouching', 25, '2024-01-12', '2024-01-15', 'Completed', 'White background', '2024-01-12 13:40:00'),
(3, 'Ghost Mannequin', 15, '2024-03-05', '2024-03-08', 'Completed', 'Clean edges', '2024-03-05 15:20:00'),

-- User 4: Sarah - Real Estate
(4, 'HDR Premium', 8, '2024-02-01', '2024-02-03', 'Completed', 'Bright and airy', '2024-02-01 09:00:00'),
(4, 'Day To Dusk', 4, '2024-03-15', '2024-03-18', 'Completed', 'Warm sunset effect', '2024-03-15 16:30:00'),

-- User 5: David - Portrait
(5, 'Portrait Retouch', 20, '2024-01-20', '2024-01-23', 'Completed', 'Professional headshots', '2024-01-20 10:30:00'),
(5, 'Corporate Headshots', 30, '2024-04-10', '2024-04-13', 'Processing', 'Business professional', '2024-04-10 11:00:00'),

-- User 6: Lisa
(6, 'Flambient Editing', 12, '2024-02-05', '2024-02-08', 'Completed', 'Natural lighting', '2024-02-05 14:00:00'),

-- User 7: James
(7, 'Album Retouch', 40, '2024-01-25', '2024-01-28', 'Completed', 'Wedding album', '2024-01-25 10:00:00'),
(7, 'Fashion Retouching', 15, '2024-03-12', '2024-03-15', 'Completed', 'Magazine quality', '2024-03-12 13:20:00'),

-- User 8: Jennifer
(8, '3D Floor Plan', 5, '2024-02-20', '2024-02-24', 'Completed', 'Modern style', '2024-02-20 09:30:00'),

-- User 9: Robert
(9, 'UAV Retouching', 10, '2024-01-30', '2024-02-02', 'Completed', 'Aerial photography', '2024-01-30 15:00:00'),

-- User 10: Maria
(10, 'Jewelry', 20, '2024-02-15', '2024-02-18', 'Completed', 'High-end jewelry', '2024-02-15 11:30:00'),

-- User 11: William
(11, 'Architecture Retouching', 6, '2024-03-01', '2024-03-04', 'Completed', 'Commercial building', '2024-03-01 10:00:00'),

-- User 12: Jessica
(12, 'Maternity Retouch', 25, '2024-02-25', '2024-02-28', 'Completed', 'Soft and natural', '2024-02-25 14:30:00'),

-- User 13: Christopher
(13, 'Product Composite', 10, '2024-03-10', '2024-03-13', 'Completed', 'Creative composites', '2024-03-10 09:00:00'),

-- User 14: Ashley
(14, 'School Retouching', 50, '2024-03-20', '2024-03-23', 'Processing', 'School portraits', '2024-03-20 10:30:00'),

-- User 15: Daniel
(15, 'Sports Retouching', 30, '2024-04-01', '2024-04-04', 'Pending', 'Action shots', '2024-04-01 11:00:00'),

-- User 16: Amanda
(16, 'Clipping Path', 100, '2024-03-15', '2024-03-18', 'Completed', 'Simple clipping', '2024-03-15 13:00:00'),

-- User 17: Matthew
(17, 'Extraction', 40, '2024-04-05', '2024-04-08', 'Processing', 'Complex extraction', '2024-04-05 14:00:00'),

-- User 18: Stephanie
(18, 'Manual Blending', 8, '2024-03-25', '2024-03-28', 'Completed', 'Real estate photos', '2024-03-25 10:00:00'),

-- User 19: Joshua
(19, 'New Born Retouch', 15, '2024-04-10', '2024-04-13', 'Processing', 'Newborn baby photos', '2024-04-10 09:30:00'),

-- User 20: Nicole
(20, '3D Rendering', 3, '2024-04-15', '2024-04-20', 'Pending', 'Architectural rendering', '2024-04-15 15:00:00');

-- Insert payments (mix of paid and pay later)
INSERT INTO payments (order_id, user_name, user_email, service_name, qty, total, paypal_order_id, created_at) VALUES
-- User 1: John
(1, 'John Doe', 'john@test.com', 'HDR Basic', 10, 120.00, 'PAYID-M123456789ABC', '2024-01-10 10:05:00'),
(2, 'John Doe', 'john@test.com', 'Single Exposure', 5, 45.00, 'PAYID-M234567890BCD', '2024-02-15 09:35:00'),
(3, 'John Doe', 'john@test.com', 'Virtual Staging', 3, 450.00, 'PAYLATER-001', '2024-03-20 14:25:00'),

-- User 2: Emma
(4, 'Emma Wilson', 'emma@test.com', 'Wedding Retouch', 50, 400.00, 'PAYID-M345678901CDE', '2024-01-05 11:05:00'),
(5, 'Emma Wilson', 'emma@test.com', 'Perfect Color Balance', 100, 350.00, 'PAYID-M456789012DEF', '2024-02-10 10:20:00'),

-- User 3: Michael
(6, 'Michael Brown', 'michael@test.com', 'Product Retouching', 25, 375.00, 'PAYID-M567890123EFG', '2024-01-12 13:45:00'),
(7, 'Michael Brown', 'michael@test.com', 'Ghost Mannequin', 15, 300.00, 'PAYLATER-002', '2024-03-05 15:25:00'),

-- User 4: Sarah
(8, 'Sarah Davis', 'sarah@test.com', 'HDR Premium', 8, 160.00, 'PAYID-M678901234FGH', '2024-02-01 09:05:00'),
(9, 'Sarah Davis', 'sarah@test.com', 'Day To Dusk', 4, 120.00, 'PAYID-M789012345GHI', '2024-03-15 16:35:00'),

-- User 5: David
(10, 'David Miller', 'david@test.com', 'Portrait Retouch', 20, 280.00, 'PAYID-M890123456HIJ', '2024-01-20 10:35:00'),
(11, 'David Miller', 'david@test.com', 'Corporate Headshots', 30, 450.00, 'PAYLATER-003', '2024-04-10 11:05:00'),

-- User 6: Lisa
(12, 'Lisa Anderson', 'lisa@test.com', 'Flambient Editing', 12, 240.00, 'PAYID-M901234567IJK', '2024-02-05 14:05:00'),

-- User 7: James
(13, 'James Taylor', 'james@test.com', 'Album Retouch', 40, 600.00, 'PAYID-M012345678JKL', '2024-01-25 10:05:00'),
(14, 'James Taylor', 'james@test.com', 'Fashion Retouching', 15, 375.00, 'PAYID-M123456789KLM', '2024-03-12 13:25:00'),

-- User 8: Jennifer
(15, 'Jennifer Martinez', 'jennifer@test.com', '3D Floor Plan', 5, 750.00, 'PAYID-M234567890LMN', '2024-02-20 09:35:00'),

-- User 9: Robert
(16, 'Robert Garcia', 'robert@test.com', 'UAV Retouching', 10, 150.00, 'PAYID-M345678901MNO', '2024-01-30 15:05:00'),

-- User 10: Maria
(17, 'Maria Rodriguez', 'maria@test.com', 'Jewelry', 20, 500.00, 'PAYID-M456789012NOP', '2024-02-15 11:35:00'),

-- User 11: William
(18, 'William Hernandez', 'william@test.com', 'Architecture Retouching', 6, 180.00, 'PAYLATER-004', '2024-03-01 10:05:00'),

-- User 12: Jessica
(19, 'Jessica Lopez', 'jessica@test.com', 'Maternity Retouch', 25, 375.00, 'PAYID-M567890123OPQ', '2024-02-25 14:35:00'),

-- User 13: Christopher
(20, 'Christopher Gonzalez', 'chris@test.com', 'Product Composite', 10, 250.00, 'PAYID-M678901234PQR', '2024-03-10 09:05:00'),

-- User 14: Ashley
(21, 'Ashley Wilson', 'ashley@test.com', 'School Retouching', 50, 400.00, 'PAYLATER-005', '2024-03-20 10:35:00'),

-- User 15: Daniel
(22, 'Daniel Moore', 'daniel@test.com', 'Sports Retouching', 30, 450.00, 'PAYLATER-006', '2024-04-01 11:05:00'),

-- User 16: Amanda
(23, 'Amanda Jackson', 'amanda@test.com', 'Clipping Path', 100, 300.00, 'PAYID-M789012345QRS', '2024-03-15 13:05:00'),

-- User 17: Matthew
(24, 'Matthew White', 'matthew@test.com', 'Extraction', 40, 280.00, 'PAYLATER-007', '2024-04-05 14:05:00'),

-- User 18: Stephanie
(25, 'Stephanie Harris', 'stephanie@test.com', 'Manual Blending', 8, 200.00, 'PAYID-M890123456RST', '2024-03-25 10:05:00'),

-- User 19: Joshua
(26, 'Joshua Clark', 'joshua@test.com', 'New Born Retouch', 15, 300.00, 'PAYLATER-008', '2024-04-10 09:35:00'),

-- User 20: Nicole
(20, 'Nicole Lewis', '3D Rendering', 3, 900.00, 'PAYLATER-009', '2024-04-15 15:05:00');

-- Insert order items for seeded orders
INSERT INTO order_items (order_id, service_name, qty, price, retouching, declutterType, color, detailing, order_name, order_images, order_details, addons, status) VALUES
(1, 'HDR Basic', 10, 120.00, 'Standard', 'None', 'Color', 'Detailed', 'HDR Basic Package', '[]', 'Please enhance colors', '[]', 'paid'),
(2, 'Single Exposure', 5, 45.00, 'None', 'None', 'Natural', 'Clean', 'Single Exposure Editing', '[]', 'Standard editing', '[]', 'paid'),
(3, 'Virtual Staging', 3, 450.00, 'Yes', 'Furniture', 'Warm', 'High detail', 'Virtual Staging', '[]', 'Modern furniture style', '[]', 'paid'),
(4, 'Wedding Retouch', 50, 400.00, 'Skin smoothing', 'None', 'Romantic', 'Soft', 'Wedding Retouch', '[]', 'Natural skin tones', '[]', 'paid'),
(5, 'Perfect Color Balance', 100, 350.00, 'Color correction', 'None', 'Warm', 'Refined', 'Color Balance', '[]', 'Warm tones preferred', '[]', 'paid'),
(6, 'Product Retouching', 25, 375.00, 'Highlights', 'None', 'White', 'Fine', 'Product Retouch', '[]', 'White background', '[]', 'paid'),
(7, 'Ghost Mannequin', 15, 300.00, 'Edges', 'None', 'Clean', 'Sharp', 'Ghost Mannequin', '[]', 'Clean edges', '[]', 'paid'),
(8, 'HDR Premium', 8, 160.00, 'HDR blend', 'None', 'Bright', 'Fine', 'HDR Premium', '[]', 'Bright and airy', '[]', 'paid'),
(9, 'Day To Dusk', 4, 120.00, 'Color shift', 'None', 'Warm', 'Balanced', 'Day To Dusk', '[]', 'Warm sunset effect', '[]', 'paid'),
(10, 'Portrait Retouch', 20, 280.00, 'Skin smoothing', 'None', 'Natural', 'Professional', 'Portrait Retouch', '[]', 'Professional headshots', '[]', 'paid'),
(11, 'Corporate Headshots', 30, 450.00, 'Sharpen', 'None', 'Neutral', 'Business', 'Corporate Headshots', '[]', 'Business professional', '[]', 'paid'),
(12, 'Flambient Editing', 12, 240.00, 'Lighting', 'None', 'Warm', 'Natural', 'Flambient Editing', '[]', 'Natural lighting', '[]', 'paid'),
(13, 'Album Retouch', 40, 600.00, 'Skin retouch', 'None', 'Soft', 'Editorial', 'Album Retouch', '[]', 'Wedding album', '[]', 'paid'),
(14, 'Fashion Retouching', 15, 375.00, 'Color pop', 'None', 'Vibrant', 'High detail', 'Fashion Retouch', '[]', 'Magazine quality', '[]', 'paid'),
(15, '3D Floor Plan', 5, 750.00, 'Render cleanup', 'None', 'Neutral', 'Precise', '3D Floor Plan', '[]', 'Modern style', '[]', 'paid'),
(16, 'UAV Retouching', 10, 150.00, 'Sky enhancement', 'None', 'Crisp', 'Aerial', 'UAV Retouch', '[]', 'Aerial photography', '[]', 'paid'),
(17, 'Jewelry', 20, 500.00, 'Polish', 'None', 'Sparkle', 'Fine', 'Jewelry Retouch', '[]', 'High-end jewelry', '[]', 'paid'),
(18, 'Architecture Retouching', 6, 180.00, 'Perspective', 'None', 'Natural', 'Detailed', 'Architecture Retouching', '[]', 'Commercial building', '[]', 'paid'),
(19, 'Maternity Retouch', 25, 375.00, 'Soft skin', 'None', 'Warm', 'Gentle', 'Maternity Retouch', '[]', 'Soft and natural', '[]', 'paid'),
(20, 'Product Composite', 10, 250.00, 'Masking', 'None', 'Clean', 'Creative', 'Product Composite', '[]', 'Creative composites', '[]', 'paid'),
(21, 'School Retouching', 50, 400.00, 'Uniform edit', 'None', 'Bright', 'Clean', 'School Retouching', '[]', 'School portraits', '[]', 'paid'),
(22, 'Sports Retouching', 30, 450.00, 'Action clarity', 'None', 'Dynamic', 'Bold', 'Sports Retouching', '[]', 'Action shots', '[]', 'paid'),
(23, 'Clipping Path', 100, 300.00, 'Path mask', 'None', 'Neutral', 'Clean', 'Clipping Path', '[]', 'Simple clipping', '[]', 'paid'),
(24, 'Extraction', 40, 280.00, 'Background removal', 'None', 'Sharp', 'Precise', 'Extraction', '[]', 'Complex extraction', '[]', 'paid'),
(25, 'Manual Blending', 8, 200.00, 'Blend layers', 'None', 'Natural', 'Soft', 'Manual Blending', '[]', 'Real estate photos', '[]', 'paid'),
(26, 'New Born Retouch', 15, 300.00, 'Gentle skin', 'None', 'Soft', 'Tender', 'New Born Retouch', '[]', 'Newborn baby photos', '[]', 'paid'),
(27, '3D Rendering', 3, 900.00, 'Render polish', 'None', 'Clean', 'Architectural', '3D Rendering', '[]', 'Architectural rendering', '[]', 'paid');

-- Summary Stats
SELECT 'Total Users' as Metric, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Total Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Total Payments', COUNT(*) FROM payments
UNION ALL
SELECT 'Paid Orders', COUNT(*) FROM payments WHERE paypal_order_id NOT LIKE 'PAYLATER%'
UNION ALL
SELECT 'Pay Later Orders', COUNT(*) FROM payments WHERE paypal_order_id LIKE 'PAYLATER%'
UNION ALL
SELECT 'Total Revenue', SUM(total) FROM payments;
