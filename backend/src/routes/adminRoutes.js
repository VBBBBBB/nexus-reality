import express from "express";
import { protect, adminOnly, superAdminOnly } from "../middleware/authMiddleware.js";
import { createAdminUser, getAllAdmins, deleteAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Protected route - only admins can create other admins
router.post("/create-admin", protect, adminOnly, createAdminUser);

// Super Admin routes
router.get("/admins", protect, superAdminOnly, getAllAdmins);
router.delete("/delete-admin/:id", protect, superAdminOnly, deleteAdmin);

export default router;
