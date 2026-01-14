import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, changePassword, deleteSelf, deleteUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Admin routes
router.get("/", protect, adminOnly, getAllUsers);

// All routes require authentication
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// Deletion routes
router.delete("/me", protect, deleteSelf);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
