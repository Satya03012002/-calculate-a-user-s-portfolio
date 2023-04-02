import express from "express";

import "./db/dbConn.js";
import cors from 'cors';
import Transaction from '../../schema/transaction.js';
import User from '../../schema/user.js';
import GoldTransaction  from '../../schema/ goldTransaction.js';

import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get("/:id",async (req,res)=>{
    const userId =req.params.id;
    const user = await User.findById(userId);
   // const user = await  User.findById(userId);
  const walletTransactions = await Transaction.find({ userId : user });

  
  const goldTransactions = await GoldTransaction.find({ userId : user });

  
  //const user = await User.findById(userId);

  
  let netFundAdded = 0;
  let currentFund = user.runningBalance.wallet;

  walletTransactions.forEach((transaction) => {
    if (transaction.type === 'CREDIT' && transaction.status === 'SUCCESS') {
      netFundAdded += transaction.amount;
    } else if (transaction.type === 'DEBIT' && transaction.status === 'SUCCESS') {
      netFundAdded -= transaction.amount;
    }
  });

  
  let netGrowthOrLoss = 0;

  goldTransactions.forEach((transaction) => {
    if (transaction.type === 'CREDIT' && transaction.status === 'SUCCESS') {
      netGrowthOrLoss += transaction.amount;
    } else if (transaction.type === 'DEBIT' && transaction.status === 'SUCCESS') {
      netGrowthOrLoss -= transaction.amount;
    }
  });

  netGrowthOrLoss += (currentFund - netFundAdded) * user.runningBalance.goldPrice;

  
  let gainOrLossPercentage = 0;

  if (netGrowthOrLoss > 0) {
    gainOrLossPercentage = ((netGrowthOrLoss / netFundAdded) * 100).toFixed(2);
  } else if (netFundAdded > 0) {
    gainOrLossPercentage = ((netGrowthOrLoss / netFundAdded) * 100).toFixed(2);
  }

  const response = {
    netFundAdded,
    currentFund,
    netGrowthOrLoss,
    gainOrLossPercentage: `${gainOrLossPercentage}%`,
  };

  res.json(response);
})
app.listen(PORT,()=>{
    console.log(`server running successfully on PORT : ${PORT}`)
});
