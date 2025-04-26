import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createIncomeCategory,
  createExpenseCategory,
} from "../controllers/catController.js";

const categoryRouter = express.Router();

// Separate routes for Income & Expense categories
categoryRouter.post("/category/income", authMiddleware, createIncomeCategory);
categoryRouter.post("/category/expense", authMiddleware, createExpenseCategory);

export default categoryRouter;
