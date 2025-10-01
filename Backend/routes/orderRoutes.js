import express from "express";
import Order from "../models/orderModel.js";
import authMiddleware from "./authMiddleware.js";

const router = express.Router();



// Create a new order (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, total } = req.body;

    if (!products || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.create({
      userId: req.user.id,   // ✅ comes from JWT
      products,
      total,
      status: "Pending"
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders of a specific user (protected)
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    // ✅ Ensure users can only fetch their own orders
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;