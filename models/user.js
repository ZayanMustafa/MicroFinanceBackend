import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  loanHistory: [
    {
      loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan" },
      loanAmount: { type: Number },
      purpose: { type: String },
      status: { type: String },
      applicationDate: { type: Date },
      approvedDate: { type: Date },
    },
  ],
});

export default mongoose.model("User", userSchema);
