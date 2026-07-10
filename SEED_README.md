# Database Seed Instructions

## Overview
This seed script creates 20 test users with complete order and payment history.

## Features
- ✅ 20 users with hashed passwords
- ✅ 27 orders across different services
- ✅ 27 payments (18 paid via PayPal, 9 pay later)
- ✅ Multiple order statuses (Completed, Processing, Pending)
- ✅ Various service types (Real Estate, Wedding, Product, Portrait, etc.)

## How to Run

### Step 1: Install dependencies (if not already installed)
```bash
npm install bcryptjs mysql2 dotenv
```

### Step 2: Make sure your .env file has database credentials
```
DB_HOST=localhost
DB_USER=sanpappeditt
DB_PASSWORD=root123
DB_NAME=snappedittt
```

### Step 3: Run the seed script
```bash
node seed.js
```

## Test Users

All users have the same password: **test123**

### User List:
1. john@test.com - John Doe
2. emma@test.com - Emma Wilson
3. michael@test.com - Michael Brown
4. sarah@test.com - Sarah Davis
5. david@test.com - David Miller
6. lisa@test.com - Lisa Anderson
7. james@test.com - James Taylor
8. jennifer@test.com - Jennifer Martinez
9. robert@test.com - Robert Garcia
10. maria@test.com - Maria Rodriguez
11. william@test.com - William Hernandez
12. jessica@test.com - Jessica Lopez
13. chris@test.com - Christopher Gonzalez
14. ashley@test.com - Ashley Wilson
15. daniel@test.com - Daniel Moore
16. amanda@test.com - Amanda Jackson
17. matthew@test.com - Matthew White
18. stephanie@test.com - Stephanie Harris
19. joshua@test.com - Joshua Clark
20. nicole@test.com - Nicole Lewis

## Data Statistics

After running the seed:
- **Total Users**: 20
- **Total Orders**: 27
- **Total Payments**: 27
- **Paid Orders**: 18 (via PayPal)
- **Pay Later Orders**: 9 (pending payment)
- **Total Revenue**: ~$8,645

## Service Types Included

### Real Estate Services:
- HDR Basic
- HDR Premium
- Single Exposure
- Virtual Staging
- Flambient Editing
- Manual Blending
- Architecture Retouching
- Day To Dusk
- UAV Retouching

### Wedding & Events:
- Wedding Retouch
- Perfect Color Balance
- Album Retouch
- Fashion Retouching

### Product & E-commerce:
- Product Retouching
- Ghost Mannequin
- Product Composite
- Clipping Path
- Extraction
- Jewelry

### People Retouching:
- Portrait Retouch
- Corporate Headshots
- Maternity Retouch
- New Born Retouch
- School Retouching
- Sports Retouching

### 3D Services:
- 3D Floor Plan
- 3D Rendering

## Order Statuses
- **Completed**: Orders that have been finished
- **Processing**: Orders currently being worked on
- **Pending**: Orders awaiting processing

## Payment Types
- **Paid**: Orders with PayPal transaction IDs (format: PAYID-MXXXXXXXXX)
- **Pay Later**: Orders with deferred payment (format: PAYLATER-XXX)

## Notes
- The script will clear existing data before seeding
- All dates are set between January 2023 and August 2024
- Revenue varies by service type and quantity
- Each user has 1-2 orders to show realistic usage patterns
