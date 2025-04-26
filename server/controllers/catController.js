import IncomeCategory from "../models/IncomeCategory.js";
import ExpenseCategory from "../models/ExpenseCategory.js";

export const createExpenseCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId; // Retrieved from authentication middleware

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
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
