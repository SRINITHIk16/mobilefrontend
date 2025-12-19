# Postman Testing Steps

## 1. Start Backend Server
```bash
cd backend
node server.js
```
Server should show: "Server running on port 8000"

## 2. Test API Connection

### Step 1: Test Server Status
- Method: GET
- URL: `http://localhost:8000/`
- Expected Response: `{"message": "Mobile Recharge API is running!"}`

### Step 2: Create a Plan
- Method: POST
- URL: `http://localhost:8000/api/plans`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Airtel Basic Plan",
  "price": 99,
  "subscriptionPrice": 89,
  "validity": "28 days",
  "data": "1GB/day",
  "calls": "Unlimited",
  "sms": "100/day"
}
```

### Step 3: Get All Plans
- Method: GET
- URL: `http://localhost:8000/api/plans`
- Expected: Array of plans

### Step 4: Register User
- Method: POST
- URL: `http://localhost:8000/api/auth/register`
- Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

### Step 5: Login User
- Method: POST
- URL: `http://localhost:8000/api/auth/login`
- Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Step 6: Create Recharge
- Method: POST
- URL: `http://localhost:8000/api/recharges`
- Body (raw JSON):
```json
{
  "number": "9876543210",
  "amount": 99,
  "plan": "Airtel Basic Plan"
}
```

## Troubleshooting
- If connection fails, check if MongoDB is running
- Ensure backend server is running on port 8000
- Check console for any error messages