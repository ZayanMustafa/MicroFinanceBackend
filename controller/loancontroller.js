import Loan from "../models/loan.js";
import User from "../models/user.js";
import { sendResponse } from "../utils/sendResponse.js";
import sendEmail from "../utils/sendEmail.js";

// Create loan application
export const createLoanApplication = async (req, res) => {
  try {
    const { loanAmount, purpose, guarantee1Name, guarantee1Email, guarantee1Phone } = req.body;
    
    const newLoan = new Loan({
      user: req.user._id,
      loanAmount,
      purpose,
      guarantee1Name,
      guarantee1Email,
      guarantee1Phone,
      status: 'pending',
    });

    await newLoan.save();

    // Update loan history in user profile
    const user = await User.findById(req.user._id);
    user.loanHistory.push({
      loanId: newLoan._id,
      loanAmount,
      purpose,
      status: newLoan.status,
      applicationDate: newLoan.applicationDate,
    });

    await user.save();

    return sendResponse(res, 200, newLoan, false, "Loan application created successfully.");
  } catch (err) {
    return sendResponse(res, 500, null, true, "Error creating loan application.");
  }
};

// Admin approves loan
export const approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return sendResponse(res, 404, null, true, "Loan application not found.");
    }

    loan.status = 'approved';
    loan.approvedDate = new Date();

    await loan.save();

    // Notify the user via email
    const user = await User.findById(loan.user);
    sendEmail(user.email, "Your Loan Application Approved", `Dear ${user.name}, your loan application has been approved.`);

    return sendResponse(res, 200, loan, false, "Loan approved successfully.");
  } catch (err) {
    return sendResponse(res, 500, null, true, "Error approving loan.");
  }
};

// Get all loan applications
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    return sendResponse(res, 200, loans, false, "Loans fetched successfully.");
  } catch (err) {
    return sendResponse(res, 500, null, true, "Error fetching loans.");
  }
};
