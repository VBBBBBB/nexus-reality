import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Only admins can create other admins
export const createAdminUser = async (req, res) => {
    try {
        // Check if the requester is an admin
        if (req.user.role !== "admin" && req.user.role !== "superadmin") {
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
// Superadmin can get all admin users
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: { $in: ["admin", "superadmin"] } }).select("-password");
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch admins" });
    }
};

// Superadmin can delete other admins
export const deleteAdmin = async (req, res) => {
    try {
        const adminToDelete = await User.findById(req.params.id);

        if (!adminToDelete) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Prevent deleting self
        if (adminToDelete._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot delete yourself" });
        }

        // Prevent deleting another superadmin (optional, but good practice)
        if (adminToDelete.role === "superadmin") {
            return res.status(403).json({ message: "Cannot delete a Super Admin. Use script instead." });
        }

        await User.deleteOne({ _id: req.params.id });
        res.json({ message: "Admin removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete admin" });
    }
};
