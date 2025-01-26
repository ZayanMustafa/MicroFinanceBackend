import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  loanAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  guarantee1Name: { type: String, required: true },
  guarantee1Email: { type: String, required: true },
  guarantee1Phone: { type: String, required: true },
  status: { type: String, default: "pending" },
  applicationDate: { type: Date, default: Date.now },
  approvedDate: { type: Date, default: null },
});

export default mongoose.model("Loan", loanSchema);
