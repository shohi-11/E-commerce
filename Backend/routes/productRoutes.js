import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Dummy data (optional fallback)
const dummyProducts = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Phone", price: 25000 },
  { id: 3, name: "Headphones", price: 3000 },
];

// @desc   Create product
// @route  POST /api/products
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Get all products
// @route  GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    // If no products in DB, fallback to dummy products
    if (products.length === 0) {
      return res.json(dummyProducts);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;