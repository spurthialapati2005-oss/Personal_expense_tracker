import mongoose, { model, Schema } from "mongoose";

const transactionSchema = new Schema({

  amount: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },
  userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
    },

  date: {
    type: Date,
    required: true
  },

  description: {
    type: String
  }
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;