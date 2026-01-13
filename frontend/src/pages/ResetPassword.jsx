import { useState } from "react";
import api from "../config/api";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function ResetPassword() {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await api.post(`/api/auth/reset-password/${resetToken}`, { password });
            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-form" style={{ width: "100%", padding: "40px" }}>
                    <h2>Reset <span>Password</span></h2>
                    <p style={{ color: "#64748b", marginBottom: "20px" }}>
                        Enter your new password below.
                    </p>

                    {message && (
                        <div style={{ padding: "10px", background: "#dcfce7", color: "#15803d", borderRadius: "8px", marginBottom: "20px" }}>
                            {message}. Redirecting to login...
                        </div>
                    )}

                    {error && (
                        <div style={{ padding: "10px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", marginBottom: "20px" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                outline: "none"
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                outline: "none"
                            }}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: "12px",
                                background: "linear-gradient(135deg, #1d72f3 0%, #175ec2 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: loading ? "not-allowed" : "pointer"
                            }}
                        >
                            {loading ? "Updating..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
