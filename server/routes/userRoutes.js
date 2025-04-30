import express from 'express';
import { signup, login,getUserIncomeAndExpense } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { sendMoney } from "../controllers/transactionController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user/income-expense', authMiddleware, getUserIncomeAndExpense);
router.post("/send-money", authMiddleware, sendMoney);

export default router;
