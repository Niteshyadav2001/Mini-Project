import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createIncomeCategory,
  createExpenseCategory,
  addIncomeToCategory,
  addExpenseToCategory,
  getIncomeCategories,
  getExpenseCategories,
  getExpenseByCategory,
  getIncomeByCategory,
} from "../controllers/catController.js";

const categoryRouter = express.Router();

// Routes for creating categories
categoryRouter.post("/category/income", authMiddleware, createIncomeCategory);
categoryRouter.post("/category/expense", authMiddleware, createExpenseCategory);

// Routes for adding income and expenses to categories
categoryRouter.post("/category/income/add", authMiddleware, addIncomeToCategory);
categoryRouter.post("/category/expense/add", authMiddleware, addExpenseToCategory);

// Routes for fetching categories
categoryRouter.get("/category/income", authMiddleware, getIncomeCategories);
categoryRouter.get("/category/expense", authMiddleware, getExpenseCategories);

// Routes for analytics
categoryRouter.get("/income-by-category", authMiddleware, getIncomeByCategory);
categoryRouter.get("/expense-by-category", authMiddleware, getExpenseByCategory);

export default categoryRouter;
