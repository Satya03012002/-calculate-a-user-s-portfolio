import mongoose from "mongoose";


const user = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    password: { type: String, required: false },
    mobileNumber: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    runningBalance: {
        wallet: { type: Number, required: true }, // CURRENT FUNDS STORED
        gold: { type: Number, required: true }, // CURRENT GOLD QTY IN GMS
        goldPrice: { type: Number, required: true }, // CURRENT GOLD PRICE
    }
}
);

const User = new mongoose.model("User", user);
export default User;