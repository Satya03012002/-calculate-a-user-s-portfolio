import mongoose from "mongoose";


const transaction = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // To store the user id
    amount: { type: Number, required: true }, // Amount of the transaction done.
    type: { type: String, required: true, enums: ['CREDIT', 'DEBIT'] }, // Type - debit or credit.
    status: {
    type: String,
    required: true,
    enums: ['FAILED', 'SUCCESS', 'PROCESSING'],
    }, // Status of the transaction being done.
    runningBalance: { type: Number, required: true }, // Running Balance of the user after each  transaction.
    transaction: { type: ObjectId, ref: 'Transaction' }, // Gold transactions reference.
    createdAt: { type: Date, required: true }, // Created At date
    updatedAt: { type: Date, required: true }, // Updated At date
    }
);

const Transaction = new mongoose.model("Transaction", transaction);
export default Transaction ;