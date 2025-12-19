import express from "express";
import Recharge from "../models/Recharge.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create recharge
router.post("/", authMiddleware, async(req, res) => {
    const recharge = await Recharge.create({
        userId: req.user.id,
        ...req.body
    });
    res.json(recharge);
});

// Dashboard data
router.get("/my", authMiddleware, async(req, res) => {
    const data = await Recharge.find({ userId: req.user.id });
    res.json(data);
});

export default router;