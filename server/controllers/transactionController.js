import Transaction from '../models/Transaction.js';
import IncomeCategory from '../models/IncomeCategory.js';
import ExpenseCategory from '../models/ExpenseCategory.js';

export const createTransaction = async (req, res) => {
    const { categoryId, categoryType, description, date, amount } = req.body;
    const userId = req.userId; // Retrieved from authMiddleware

    if (!categoryId || !categoryType || !description || !date || !amount) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure categoryType is valid
    if (!['IncomeCategory', 'ExpenseCategory'].includes(categoryType)) {
        return res.status(400).json({ message: "Invalid categoryType. Use 'IncomeCategory' or 'ExpenseCategory'." });
    }

    try {
        // Check if categoryId exists in the correct model
        const categoryExists = categoryType === 'IncomeCategory' 
            ? await IncomeCategory.findById(categoryId) 
            : await ExpenseCategory.findById(categoryId);

        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" });
        }

        const transaction = new Transaction({ userId, categoryId, categoryType, description, date, amount });
        await transaction.save();

        res.status(201).json({ message: "Transaction recorded successfully", transaction });
    } catch (error) {
        console.error("Transaction creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
