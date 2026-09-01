const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "ShopSphere backend is running",
    });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);
        console.log("Starting MongoDB connection...");

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`ShopSphere backend running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
    }
}

startServer();