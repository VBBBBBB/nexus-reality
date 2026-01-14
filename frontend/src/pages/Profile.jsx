import { useState, useEffect } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profileForm, setProfileForm] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get("/api/user/profile");
            setUser(res.data);
            setProfileForm({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone || ""
            });
        } catch (err) {
            console.error("Failed to fetch profile", err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await api.put("/api/user/profile", profileForm);
            setMessage(res.data.message);
            // Update localStorage
            const updatedUser = { ...user, ...res.data.user };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await api.put("/api/user/change-password", {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            setMessage(res.data.message);
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password");
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone and will delete all your data.")) return;

        try {
            await api.delete("/api/user/me");
            localStorage.clear();
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete account");
        }
    };

    const inputStyle = {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none"
    };

    const buttonStyle = {
        padding: "12px 24px",
        background: "linear-gradient(135deg, #1d72f3 0%, #175ec2 100%)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(29, 114, 243, 0.3)"
    };

    if (!user) return <div style={{ padding: "40px" }}>Loading...</div>;

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "auto", minHeight: "80vh" }}>
            <h2 style={{ marginBottom: "30px", color: "#0f172a" }}>My Profile</h2>

            {message && (
                <div style={{ padding: "15px", background: "#ecfdf5", color: "#059669", borderRadius: "8px", marginBottom: "20px" }}>
                    ✅ {message}
                </div>
            )}

            {error && (
                <div style={{ padding: "15px", background: "#fee2e2", color: "#dc2626", borderRadius: "8px", marginBottom: "20px" }}>
                    ❌ {error}
                </div>
            )}

            {/* Profile Information */}
            <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
                <h3 style={{ marginBottom: "20px", color: "#334155" }}>Profile Information</h3>
                <form onSubmit={handleProfileUpdate} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Name</label>
                        <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Email</label>
                        <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Phone</label>
                        <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Role</label>
                        <input
                            type="text"
                            value={user.role}
                            disabled
                            style={{ ...inputStyle, background: "#f8fafc", color: "#64748b" }}
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Update Profile
                    </button>
                </form>
            </div>

            {/* Change Password */}
            <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 style={{ marginBottom: "20px", color: "#334155" }}>Change Password</h3>
                <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Current Password</label>
                        <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            required
                            style={inputStyle}
                            placeholder="Enter current password"
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>New Password</label>
                        <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            required
                            style={inputStyle}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Confirm New Password</label>
                        <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            required
                            style={inputStyle}
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Change Password
                    </button>
                </form>
                <p style={{ marginTop: "15px", fontSize: "14px" }}>
                    Forgot your current password? <span onClick={() => navigate("/forgot-password")} style={{ color: "#1d72f3", cursor: "pointer", fontWeight: "600" }}>Click here</span> to reset by email.
                </p>
            </div>

            {/* Danger Zone */}
            <div style={{ marginTop: "30px", background: "#fff1f2", padding: "30px", borderRadius: "12px", border: "1px solid #fecdd3" }}>
                <h3 style={{ marginBottom: "15px", color: "#9f1239" }}>Danger Zone</h3>
                <p style={{ color: "#881337", marginBottom: "20px", fontSize: "14px" }}>
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    style={{
                        padding: "12px 24px",
                        background: "#e11d48",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background 0.2s"
                    }}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
