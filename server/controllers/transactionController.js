import Transaction from "../models/Transaction.js";
import IncomeCategory from "../models/IncomeCategory.js";
import ExpenseCategory from "../models/ExpenseCategory.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const sendMoney = async (req, res) => {
  const { phoneNumber, amount, message } = req.body;
  const sendingUserId = req.userId; // Retrieved from authentication middleware

  if (!phoneNumber || !amount) {
    return res
      .status(400)
      .json({ message: "Phone number and amount are required" });
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

export const addTransaction = async (req, res) => {
    const { category, description, date, quantity, amount } = req.body;
  
    // Validate required fields
    if (!category || !description || !date || !quantity || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Create a new transaction
      const transaction = new Transaction({
        userId: req.userId, // Assuming userId is retrieved from authentication middleware
        categoryId: 100, // Example categoryId (can be dynamic if needed)
        categoryType: category, // Either "IncomeCategory" or "ExpenseCategory"
        description,
        date,
        quantity,
        amount,
      });
  
      // Save the transaction to the database
      await transaction.save();
  
      if (category === "ExpenseCategory") {
        // Update the user's expense
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        user.expense += Number(amount);
        await user.save();
  
        // Add or update the expense category
        const expenseCategory = await ExpenseCategory.findOne({
          userId: req.userId,
          name: description, // Assuming description is the category name
        });
  
        if (expenseCategory) {
          expenseCategory.totalExpense += Number(amount);
          await expenseCategory.save();
        } else {
          const newExpenseCategory = new ExpenseCategory({
            userId: req.userId,
            name: description,
            totalExpense: Number(amount),
          });
          await newExpenseCategory.save();
        }
      }
  
      if (category === "IncomeCategory") {
        // Update the user's income
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        user.income += Number(amount);
        await user.save();
  
        // Add or update the income category
        const incomeCategory = await IncomeCategory.findOne({
          userId: req.userId,
          name: description, // Assuming description is the category name
        });
  
        if (incomeCategory) {
          incomeCategory.totalIncome += Number(amount);
          await incomeCategory.save();
        } else {
          const newIncomeCategory = new IncomeCategory({
            userId: req.userId,
            name: description,
            totalIncome: Number(amount),
          });
          await newIncomeCategory.save();
        }
      }
  
      res.status(201).json({
        message: "Transaction added successfully",
        transaction,
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
export const getAllTransactions = async (req, res) => {
  try {
    // Fetch all transactions for the authenticated user
    const transactions = await Transaction.find({ userId: req.userId })
      .populate("userId", "name") // Populate user details if needed
      .select("categoryType description date quantity amount"); // Select only the required fields

    // Format the response
    const formattedTransactions = transactions.map((transaction) => ({
      category: transaction.categoryType,
      description: transaction.description,
      date: transaction.date,
      quantity: transaction.quantity,
      amount: transaction.amount,
    }));

    res.status(200).json(formattedTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMonthlyComparison = async (req, res) => {
    try {
      const userId = req.userId; // Assuming userId is retrieved from authentication middleware
  
      // Aggregate income data grouped by month
      const incomeData = await IncomeCategory.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Match documents for the authenticated user
        {
          $group: {
            _id: { $month: "$createdAt" }, // Group by month
            totalIncome: { $sum: "$totalIncome" }, // Sum the totalIncome field
          },
        },
        { $sort: { "_id": 1 } }, // Sort by month
      ]);
  
      // Aggregate expense data grouped by month
      const expenseData = await ExpenseCategory.aggregate([
        { $match: { userId:new mongoose.Types.ObjectId(userId) } }, // Match documents for the authenticated user
        {
          $group: {
            _id: { $month: "$createdAt" }, // Group by month
            totalExpense: { $sum: "$totalExpense" }, // Sum the totalExpense field
          },
        },
        { $sort: { "_id": 1 } }, // Sort by month
      ]);
  
      // Combine income and expense data into a single array
      const monthlyComparison = [];
      for (let i = 1; i <= 12; i++) {
        const income = incomeData.find((data) => data._id === i)?.totalIncome || 0;
        const expense = expenseData.find((data) => data._id === i)?.totalExpense || 0;
        monthlyComparison.push({ month: i, income, expense });
      }
  
      res.status(200).json(monthlyComparison);
    } catch (error) {
      console.error("Error fetching monthly comparison:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
