import IncomeCategory from "../models/IncomeCategory.js";
import ExpenseCategory from "../models/ExpenseCategory.js";
import mongoose from "mongoose";
import User from "../models/User.js";

// Fetch all income categories sorted by name
export const getIncomeCategories = async (req, res) => {
  const userId = req.userId; // Retrieved from authentication middleware

  try {
    const incomeCategories = await IncomeCategory.find({ userId }).sort({ name: 1 }); // Sort by name (ascending)
    res.status(200).json(incomeCategories);
  } catch (error) {
    console.error("Error fetching income categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all expense categories sorted by name
export const getExpenseCategories = async (req, res) => {
  const userId = req.userId; // Retrieved from authentication middleware

  try {
    const expenseCategories = await ExpenseCategory.find({ userId }).sort({ name: 1 }); // Sort by name (ascending)
    res.status(200).json(expenseCategories);
  } catch (error) {
    console.error("Error fetching expense categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Add income to an existing income category by name
export const addIncomeToCategory = async (req, res) => {
  const { categoryName, amount } = req.body;
  const userId = req.userId; // Retrieved from authentication middleware

  if (!categoryName || !amount) {
    return res.status(400).json({ message: "Category name and amount are required" });
  }

  try {
    // Find the income category by name and userId
    const category = await IncomeCategory.findOne({ name: categoryName, userId });
    if (!category) {
      return res.status(404).json({ message: "Income category not found" });
    }

    // Update the category's total income
    category.totalIncome = (category.totalIncome || 0) + amount;
    await category.save();

    // Update the user's total income
    const user = await User.findById(userId);
    user.income = (user.income || 0) + amount; // Update user's total income
    await user.save();

    res.status(200).json({ message: "Income added successfully", category, user });
  } catch (error) {
    console.error("Error adding income to category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add expense to an existing expense category by name
export const addExpenseToCategory = async (req, res) => {
  const { categoryName, amount } = req.body;
  const userId = req.userId; // Retrieved from authentication middleware

  if (!categoryName || !amount) {
    return res.status(400).json({ message: "Category name and amount are required" });
  }

  try {
    // Find the expense category by name and userId
    const category = await ExpenseCategory.findOne({ name: categoryName, userId });
    if (!category) {
      return res.status(404).json({ message: "Expense category not found" });
    }

    // Update the category's total expense
    category.totalExpense = (category.totalExpense || 0) + amount;
    await category.save();

    // Update the user's total expenses
    const user = await User.findById(userId);
    user.expense = (user.expense || 0) + amount; // Update user's total expenses
    await user.save();

    res.status(200).json({ message: "Expense added successfully", category, user });
  } catch (error) {
    console.error("Error adding expense to category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createExpenseCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId; // Retrieved from authentication middleware

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check if a category with the same name (case-insensitive) already exists
    const existingCategory = await ExpenseCategory.findOne({
      userId,
      name: { $regex: new RegExp(`^${name}$`, "i") }, // Case-insensitive match
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Expense category with this name already exists" });
    }

    const category = new ExpenseCategory({ userId, name });
    await category.save();

    res
      .status(201)
      .json({ message: "Expense category created successfully", category });
  } catch (error) {
    console.error("Expense category creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createIncomeCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId; // Retrieved from authentication middleware

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check if a category with the same name (case-insensitive) already exists
    const existingCategory = await IncomeCategory.findOne({
      userId,
      name: { $regex: new RegExp(`^${name}$`, "i") }, // Case-insensitive match
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Income category with this name already exists" });
    }

    const category = new IncomeCategory({ userId, name });
    await category.save();

    res
      .status(201)
      .json({ message: "Income category created successfully", category });
  } catch (error) {
    console.error("Income category creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get income data grouped by category
export const getIncomeByCategory = async (req, res) => {
  const userId = req.userId; // Retrieved from authentication middleware

  try {
    const incomeData = await IncomeCategory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Match documents for the logged-in user
      {
        $project: {
          name: 1,
          totalIncome: 1,
        },
      },
    ]);

    res.status(200).json(incomeData);
  } catch (error) {
    console.error("Error fetching income by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get expense data grouped by category
export const getExpenseByCategory = async (req, res) => {
  const userId = req.userId; // Retrieved from authentication middleware

  try {
    const expenseData = await ExpenseCategory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId),
      } }, // Match documents for the logged-in user
      {
        $project: {
          name: 1,
          totalExpense: 1,
        },
      },
    ]);

    res.status(200).json(expenseData);
  } catch (error) {
    console.error("Error fetching expense by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};