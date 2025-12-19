import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✅ ES Module import

dotenv.config();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});