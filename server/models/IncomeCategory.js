import mongoose from "mongoose";

const incomeCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    totalIncome: { type: Number, default: 0 }, // New field to track total income for this category
  },
  { timestamps: true }
);

const IncomeCategory = mongoose.model("IncomeCategory", incomeCategorySchema);
export default IncomeCategory;