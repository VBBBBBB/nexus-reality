import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Check if superadmin already exists
        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log("User already exists. Promoting to Super Admin...");
            admin.role = "superadmin";
            admin.isVerified = true;
            await admin.save();
            console.log("✅ User promoted to Super Admin successfully!");
            process.exit(0);
        }

        // Create superadmin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        admin = await User.create({
            name: "Super Admin",
            email: adminEmail,
            phone: "9999999999",
            password: hashedPassword,
            role: "superadmin",
            isVerified: true
        });

        console.log("✅ Super Admin created successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log("Password: [HIDDEN] (Check your .env file)");

        process.exit(0);
    } catch (error) {
        console.error("Error creating super admin:", error);
        process.exit(1);
    }
};

createSuperAdmin();
