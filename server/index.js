import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/userRoutes.js";
import catRoutes from "./routes/catRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const M_G = process.env.MONGO_URI;
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(M_G)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", catRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
