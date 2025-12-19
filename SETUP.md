# Mobile Recharge Site - Full Stack Setup

## Prerequisites
1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install Postman: https://www.postman.com/downloads/

## Setup Steps

### 1. Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux  
sudo systemctl start mongod
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

### 4. Start Frontend
```bash
# In root directory
npm run dev
```
Frontend will run on: http://localhost:5173

## Postman API Testing

### 1. Create Plans (POST)
URL: `http://localhost:5000/api/plans`
Body (JSON):
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

### 2. Get All Plans (GET)
URL: `http://localhost:5000/api/plans`

### 3. Register User (POST)
URL: `http://localhost:5000/api/auth/register`
Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

### 4. Login User (POST)
URL: `http://localhost:5000/api/auth/login`
Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### 5. Create Recharge (POST)
URL: `http://localhost:5000/api/recharges`
Body (JSON):
```json
{
  "number": "9876543210",
  "amount": 99,
  "plan": "Airtel Basic Plan"
}
```

### 6. Get All Recharges (GET)
URL: `http://localhost:5000/api/recharges`

## Project Structure
```
mobile-recharge-site/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── src/
├── package.json
└── SETUP.md
```

## Running Both Servers
1. Terminal 1: `cd backend && npm run dev` (Backend on port 5000)
2. Terminal 2: `npm run dev` (Frontend on port 5173)