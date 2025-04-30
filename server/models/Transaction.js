// models/Transaction.js

import mongoose from 'mongoose';


const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type:Number,
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
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
