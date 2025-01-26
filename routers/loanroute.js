import express from "express";
import { createLoanApplication, approveLoan, getAllLoans } from "../controllers/loanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes with authMiddleware
router.post("/loan-application", authMiddleware, createLoanApplication);
router.put("/approve-loan/:loanId", authMiddleware, approveLoan);
router.get("/all-loans", authMiddleware, getAllLoans);

export default router;
