const bcrypt = require('bcryptjs');

const password = 'admin123'; // Change this to your desired password
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('\n=== Admin User SQL ===\n');
console.log(`INSERT INTO admins (email, password, name) VALUES ('admin@snappedit.com', '${hashedPassword}', 'Admin User') ON DUPLICATE KEY UPDATE password = '${hashedPassword}';`);
console.log('\n=== Login Credentials ===');
console.log('Email: admin@snappedit.com');
console.log('Password:', password);
console.log('\n');
