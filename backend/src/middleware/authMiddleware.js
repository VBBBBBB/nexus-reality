import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token, not authorized" });
  }
};

export const sellerOnly = (req, res, next) => {
  if (req.user.role === "seller" || req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Seller access only" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.user.role === "superadmin") {
    next();
  } else {
    res.status(403).json({ message: "Super Admin access only" });
  }
};
