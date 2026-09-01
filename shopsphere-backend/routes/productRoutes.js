const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});
router.post("/seed", async (req, res) => {
  try {
    const products = [
      {
        name: "Laptop",
        price: 50000,
        image: "https://via.placeholder.com/300",
        description: "Powerful laptop for everyday use.",
      },
      {
        name: "Phone",
        price: 30000,
        image: "https://via.placeholder.com/300",
        description: "Modern smartphone with great performance.",
      },
      {
        name: "Headphones",
        price: 5000,
        image: "https://via.placeholder.com/300",
        description: "Comfortable headphones with clear sound.",
      },
    ];

    const savedProducts = await Product.insertMany(products);

    res.status(201).json(savedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to seed products",
      error: error.message,
    });
  }
});

module.exports = router;