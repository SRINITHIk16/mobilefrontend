# Fix 404 Error - Testing Steps

## 1. Start Backend Server
```powershell
cd backend
node server.js
```
Should show:
- "Server running on port 9000"
- "MongoDB connected" (or error message)

## 2. Test in Postman (Step by Step)

### Step 1: Basic Server Test
- Method: **GET**
- URL: `http://localhost:9000/`
- Expected: `{"message": "Mobile Recharge API is running!", "port": 9000}`

### Step 2: API Test Route
- Method: **GET** 
- URL: `http://localhost:9000/api/test`
- Expected: `{"message": "API routes working!", "timestamp": "..."}`

### Step 3: Plans Route Test
- Method: **GET**
- URL: `http://localhost:9000/api/plans`
- Expected: `[]` (empty array initially)

## 3. If Still Getting 404:

### Check Server Status:
1. Is server running? (Check terminal for "Server running on port 9000")
2. Is MongoDB running? (Check for "MongoDB connected")
3. Try different port if 9000 is blocked

### Common Issues:
- **Server not running**: Start with `node server.js`
- **Wrong URL**: Use `localhost:9000` not `localhost:8000`
- **Firewall**: Allow port 9000
- **MongoDB not running**: Start MongoDB service

## 4. Create Sample Data (After Basic Tests Work):

### Create Plan:
- Method: **POST**
- URL: `http://localhost:9000/api/plans`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Test Plan",
  "price": 99,
  "subscriptionPrice": 89,
  "validity": "28 days",
  "data": "1GB/day",
  "calls": "Unlimited",
  "sms": "100/day"
}
```

Start with Step 1 and 2 first to confirm basic connectivity!