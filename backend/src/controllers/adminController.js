import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Only admins can create other admins
export const createAdminUser = async (req, res) => {
    try {
        // Check if the requester is an admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can create admin accounts" });
        }

        const { name, email, phone, password } = req.body;

        // Validate input
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin user
        const newAdmin = await User.create({
            name,
            email: email.trim().toLowerCase(),
            phone,
            password: hashedPassword,
            role: "admin"
        });

        res.status(201).json({
            message: "Admin user created successfully",
            user: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Failed to create admin user" });
    }
};
