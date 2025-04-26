// models/Transaction.js

import mongoose from 'mongoose';


const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'categoryType', // Dynamic reference to Income or Expense
        required: true
    },
    categoryType: { 
        type: String, 
        enum: ['IncomeCategory', 'ExpenseCategory'], 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
