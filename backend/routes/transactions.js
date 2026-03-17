import exp from 'express'
import Transaction from '../models/Transaction.js'
import { checkUser } from '../middleware/checkUser.js'

export const transactionRouter = exp.Router()

// ADD TRANSACTION 
transactionRouter.post('/transactions', checkUser, async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      userId: req.user._id
    });

    const savedTransaction = await newTransaction.save();

    return res.status(201).json({
      message: "Transaction Added",
      payload: savedTransaction
    });

  } catch (err) {

    res.status(400).json({
      message: "Failed to add transaction"
    });
  }
});


//GET USER TRANSACTIONS 
transactionRouter.get('/transactions', checkUser, async (req, res) => {
  try {

    const transactions = await Transaction.find({
      userId: req.user._id
    });

    return res.status(200).json({
      message: "Transactions Retrieved",
      count: transactions.length,
      payload: transactions
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch transactions"
    });
  }
});