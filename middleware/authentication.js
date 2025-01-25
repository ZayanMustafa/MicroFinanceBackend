import jwt from "jsonwebtoken";
import 'dotenv/config';
import User from "../models/users.js"; // Ensure the correct file extension

export async function authenticateUser(req, res, next) {
    try {
        const bearerToken = req.headers?.authorization;
        if (!bearerToken) {
            return res.status(403).json({ message: "Access denied. No token provided." });
        }

        const token = bearerToken.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Access denied. Malformed token." });
        }

        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid token." });
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(403).json({ message: "User not found." });
        }

        req.user = user; // Attach the user object to the request
        next();
    } catch (error) {
        console.error("Error in authenticateUser:", error.message);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

export function authorizeRole(roles) {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Access denied. You do not have the required role.",
                });
            }
            next();
        } catch (error) {
            console.error("Error in authorizeRole:", error.message);
            return res.status(403).json({
                message: "An error occurred during role authorization.",
            });
        }
    };
}

export async function authenticateStudent(req, res, next) {
    try {
        const bearerToken = req.headers?.authorization;
        if (!bearerToken) {
            return res.status(403).json({ success: false, message: "No token provided." });
        }

        const token = bearerToken.split(" ")[1];
        if (!token) {
            return res.status(403).json({ success: false, message: "Malformed token." });
        }

        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Invalid or expired token." });
        }

        req.student = decoded; // Attach the student info (decoded token) to the request
        next();
    } catch (err) {
        console.error("Error in authenticateStudent:", err.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}
