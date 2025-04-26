import mongoose from "mongoose";

const expenseCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const ExpenseCategory = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);
export default ExpenseCategory;
