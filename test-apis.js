// Test all admin APIs
// Run this with: node test-apis.js

const testAPIs = async () => {
  const baseURL = 'http://localhost:8083';
  
  console.log('Testing Admin APIs...\n');
  
  // Test 1: Dashboard API
  console.log('1. Testing /api/admin/dashboard');
  try {
    const res = await fetch(`${baseURL}/api/admin/dashboard`, {
      headers: {
        'Cookie': 'admin_session=1' // You need to be logged in
      }
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Data keys:', Object.keys(data));
    console.log('Stats:', data.stats);
    console.log('✅ Dashboard API working\n');
  } catch (err) {
    console.log('❌ Dashboard API failed:', err.message, '\n');
  }

  // Test 2: Payments API
  console.log('2. Testing /api/admin/payments');
  try {
    const res = await fetch(`${baseURL}/api/admin/payments`, {
      headers: {
        'Cookie': 'admin_session=1'
      }
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Success:', data.success);
    console.log('Payments count:', data.payments?.length || 0);
    console.log('✅ Payments API working\n');
  } catch (err) {
    console.log('❌ Payments API failed:', err.message, '\n');
  }

  // Test 3: Users API
  console.log('3. Testing /api/admin/users');
  try {
    const res = await fetch(`${baseURL}/api/admin/users?page=1`, {
      headers: {
        'Cookie': 'admin_session=1'
      }
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Success:', data.success);
    console.log('Users count:', data.users?.length || 0);
    console.log('Total:', data.total);
    console.log('✅ Users API working\n');
  } catch (err) {
    console.log('❌ Users API failed:', err.message, '\n');
  }
};

testAPIs();
