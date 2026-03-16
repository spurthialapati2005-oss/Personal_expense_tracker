import exp from "express";
import EMI from "../models/EMI.js";

export const emiRouter = exp.Router();


// POST EMI (Add EMI details)
emiRouter.post("/emi", async (req, res) => {

  try {

    const newEmi = new EMI(req.body);

    const savedEmi = await newEmi.save();

    res.status(201).json({
      message: "EMI added successfully",
      payload: savedEmi
    });

  } catch (err) {

    console.error("EMI Error:", err.message);

    res.status(400).json({
      message: "Failed to add EMI",
      error: err.message
    });

  }

});


// GET ALL EMI RECORDS
emiRouter.get("/emi/:userId", async (req, res) => {

  try {

    const emiList = await EMI.find({
      userId: req.params.userId
    });

    res.status(200).json({
      message: "EMI records retrieved",
      count: emiList.length,
      payload: emiList
    });

  } catch (err) {

    console.error("Fetch EMI Error:", err.message);

    res.status(500).json({
      message: "Failed to fetch EMI records",
      error: err.message
    });

  }

});