import express from "express";
import Plan from "../models/Plan.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all plans
router.get("/", async(req, res) => {
    const plans = await Plan.find();
    res.json(plans);
});

// Admin add plan
router.post("/", async(req, res) => {
    const plan = await Plan.create(req.body);
    res.json(plan);
});

export default router;