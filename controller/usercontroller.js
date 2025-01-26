import User from "../models/user.js";
import { sendResponse } from "../utils/sendResponse.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("loanHistory.loanId");

    if (!user) {
      return sendResponse(res, 404, null, true, "User not found.");
    }

    return sendResponse(res, 200, user, false, "User profile fetched successfully.");
  } catch (err) {
    return sendResponse(res, 500, null, true, "Error fetching user profile.");
  }
};
