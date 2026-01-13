import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createAdminUser } from "../controllers/adminController.js";

const router = express.Router();

// Protected route - only admins can create other admins
router.post("/create-admin", protect, adminOnly, createAdminUser);

export default router;
