import Transaction from '../models/Transaction.js';
import IncomeCategory from '../models/IncomeCategory.js';
import ExpenseCategory from '../models/ExpenseCategory.js';
import User from "../models/User.js";

export const sendMoney = async (req, res) => {
  const { phoneNumber, amount, message } = req.body;
  const sendingUserId = req.userId; // Retrieved from authentication middleware

  if (!phoneNumber || !amount) {
    return res.status(400).json({ message: "Phone number and amount are required" });
  }

  try {
    // Find the receiving user by phone number
    const receivingUser = await User.findOne({ phone: phoneNumber });
    if (!receivingUser) {
      return res.status(404).json({ message: "Receiving user not found" });
    }

    // Find the sending user by ID
    const sendingUser = await User.findById(sendingUserId);
    if (!sendingUser) {
      return res.status(404).json({ message: "Sending user not found" });
    }

    // Check if the sending user has enough balance
    if (sendingUser.income - sendingUser.expense < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the income of the receiving user
    receivingUser.income += amount;
    await receivingUser.save();

    // Update the expense of the sending user
    sendingUser.expense += amount;
    await sendingUser.save();

    // Create a transaction for the sending user
    const transaction = new Transaction({
      userId: sendingUserId,
      categoryId: "100", // Fixed category ID for this transaction
      categoryType: "ExpenseCategory", // Always "ExpenseCategory" for sending money
      description: "Send Money",
      date: new Date(),
      quantity: 1,
      amount: amount,
    });
    await transaction.save();

    res.status(200).json({
      message: "Money sent successfully",
      transaction,
      sendingUser,
      receivingUser,
    });
  } catch (error) {
    console.error("Error sending money:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
