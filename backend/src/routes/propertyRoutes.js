import express from "express";
import {
  createProperty,
  getApprovedProperties,
  getPropertyById,
  getUserProperties,
  getAllPropertiesAdmin,
  updatePropertyStatus,
  updateProperty,
  deleteProperty
} from "../controllers/propertyController.js";
import { protect, sellerOnly, adminOnly } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post("/", protect, sellerOnly, upload.array("images", 5), createProperty);
router.get("/", getApprovedProperties);

router.get("/my", protect, getUserProperties);
router.get("/admin", protect, adminOnly, getAllPropertiesAdmin);
router.patch("/:id/status", protect, adminOnly, updatePropertyStatus);
router.put("/:id", protect, upload.array("images", 5), updateProperty);
router.delete("/:id", protect, deleteProperty);
router.get("/:id", getPropertyById);

export default router;
