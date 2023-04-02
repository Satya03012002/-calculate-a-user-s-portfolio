import mongoose from "mongoose";


const goldtransaction = new mongoose.Schema({

    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },// A required object ID reference to the user.
    entityUser: { type: mongoose.Types.ObjectId, ref: 'User' },//An object ID reference to the user entity.
    quantity: { type: Number, required: true },  //A required number indicating the quantity of gold in gms.
    amount: { type: Number, required: true },//A required number indicating the amount spent or earned.
    type: { type: String, required: true, enums: ['CREDIT', 'DEBIT'] }, //A required string with possible values of "CREDIT" or "DEBIT".
    status: {
        type: String,
        required: true,
        enums: ["WAITING", "CANCELED", "PENDING"],
    },  //A required string indicating the transaction status, with possible values of "FAILED", "SUCCESS",
    // "WAITING", "CANCELED", or "PENDING".
    runningBalance: { type: Number, required: true }, //An object with required number fields indicating the wallet, loyalty points, and gold balances.
    createdAt: { type: Date, required: true }, //A required date indicating when the transaction was created.
    updatedAt: { type: Date, required: true }, //A required date indicating when the transaction was last updated.

});

const GoldTransaction = new mongoose.model(" GoldTransaction",  goldtransaction);
export default GoldTransaction ;