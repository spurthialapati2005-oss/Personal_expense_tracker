import exp from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';
import EMI from '../models/EMI.js';

export const analyticsRouter = exp.Router();

analyticsRouter.get('/overall-analysis/:userId', async (req, res) => {

    try {

        const userId = new mongoose.Types.ObjectId(req.params.userId);

        // 1️⃣ Transaction totals by category for this user
        const transactionData = await Transaction.aggregate([
            { $match: { userId: userId } },
            { 
                $group: { 
                    _id: "$category", 
                    total: { $sum: "$amount" } 
                } 
            }
        ]);

        // 2️⃣ EMI totals for this user
        const emiData = await EMI.aggregate([
            { $match: { userId: userId } },
            { 
                $group: { 
                    _id: "Fixed EMIs", 
                    total: { $sum: "$loanAmount" } 
                } 
            }
        ]);

        // 3️⃣ Combine both results
        const finalData = [...transactionData, ...emiData];

        res.status(200).json({
            message: "User Financial Analysis",
            payload: finalData
        });

    } catch (err) {

        console.error("Analytics Error:", err.message);

        res.status(500).json({
            message: "Error generating analysis",
            error: err.message
        });

    }

});