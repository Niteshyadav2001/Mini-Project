import express from 'express';
import { signup, login,getUserIncomeAndExpense } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { sendMoney } from "../controllers/transactionController.js";
import { getAllTransactions } from "../controllers/transactionController.js"

import { addTransaction } from "../controllers/transactionController.js";
import { getMonthlyComparison } from "../controllers/transactionController.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user/income-expense', authMiddleware, getUserIncomeAndExpense);
router.post("/send-money", authMiddleware, sendMoney);
router.get("/transactions",authMiddleware, getAllTransactions);
// Route to add a transaction
router.post("/transactions", authMiddleware, addTransaction);
router.get("/category/monthly-comparison", authMiddleware, getMonthlyComparison);
export default router;
