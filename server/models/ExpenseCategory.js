import mongoose from "mongoose";

const expenseCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    totalExpense: { type: Number, default: 0 }, // New field to track total expense for this category
  },
  { timestamps: true }
);

const ExpenseCategory = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);
export default ExpenseCategory;