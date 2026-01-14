import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import migrationRoutes from "./routes/migrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

dotenv.config();
connectDB();

const app = express();


app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images to be loaded
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});
app.use("/api", limiter); // Apply to API routes

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
// Serve static files - Make sure to allow cross-origin for these
app.use("/uploads", express.static("public/uploads"));

// Routes AFTER body parser
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/migration", migrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("NEXUS REALITY backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
