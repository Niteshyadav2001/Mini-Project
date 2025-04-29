import express from 'express';
import { signup, login,getUserIncomeAndExpense } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user/income-expense', authMiddleware, getUserIncomeAndExpense);

export default router;
