import express from "express";
import { createEnquiry, getAllEnquiries, getUserEnquiries } from "../controllers/enquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEnquiry);
router.get("/", protect, getAllEnquiries);
router.get("/my", protect, getUserEnquiries);

export default router;
