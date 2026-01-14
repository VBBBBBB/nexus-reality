import User from "../models/User.js";
import Property from "../models/Property.js";
import bcrypt from "bcryptjs";

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

// Get all users (Admin/Superadmin only) -> For regular users (buyers/sellers)
export const getAllUsers = async (req, res) => {
    try {
        const { name, email, phone, role, page = 1, limit = 10, date } = req.query;

        let filter = { role: { $nin: ["admin", "superadmin"] } };

        if (name) filter.name = { $regex: name, $options: "i" };
        if (email) filter.email = { $regex: email, $options: "i" };
        if (phone) filter.phone = { $regex: phone, $options: "i" };
        if (role) filter.role = role;

        // Smart Date Filter
        if (date) {
            filter.createdAt = {};
            const dateStr = date.toString();

            if (dateStr.length === 4) { // YYYY
                const start = new Date(`${dateStr}-01-01`);
                const end = new Date(`${dateStr}-12-31T23:59:59.999Z`);
                filter.createdAt.$gte = start;
                filter.createdAt.$lte = end;
            } else if (dateStr.length === 7) { // YYYY-MM
                const start = new Date(`${dateStr}-01`);
                const year = parseInt(dateStr.split('-')[0]);
                const month = parseInt(dateStr.split('-')[1]);
                // Get last day of month
                const end = new Date(year, month, 0, 23, 59, 59, 999);
                filter.createdAt.$gte = start;
                filter.createdAt.$lte = end;
            } else { // YYYY-MM-DD (or full date)
                const start = new Date(dateStr);
                start.setHours(0, 0, 0, 0);
                const end = new Date(dateStr);
                end.setHours(23, 59, 59, 999);
                filter.createdAt.$gte = start;
                filter.createdAt.$lte = end;
            }
        }

        const count = await User.countDocuments(filter);
        const users = await User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalUsers: count
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Update user profile (name, email, phone)
export const updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({
                email: email.trim().toLowerCase(),
                _id: { $ne: req.user._id }
            });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || req.user.name,
                email: email ? email.trim().toLowerCase() : req.user.email,
                phone: phone || req.user.phone
            },
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile" });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new passwords are required" });
        }

        // Get user with password
        const user = await User.findById(req.user._id);

        // Verify current password (skip for Google users who don't have a password)
        if (user.password) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to change password" });
    }
};
// Delete Self
export const deleteSelf = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user is a seller, delete all their properties first
        if (user.role === "seller") {
            await Property.deleteMany({ seller: user._id });
        }

        await User.findByIdAndDelete(user._id);
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete account" });
    }
};

// Admin delete user
export const deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);

        if (!userToDelete) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent deleting admins using this regular endpoint (use admin specific endpoints)
        if (userToDelete.role === "admin" || userToDelete.role === "superadmin") {
            return res.status(403).json({ message: "Cannot delete admin users via this endpoint" });
        }

        // If user is a seller, delete all their properties first
        if (userToDelete.role === "seller") {
            await Property.deleteMany({ seller: userToDelete._id });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};
