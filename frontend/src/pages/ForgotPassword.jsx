import { useState } from "react";
import api from "../config/api";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await api.post("/api/auth/forgot-password", { email });
            setMessage(res.data.message);
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
                    <h2>Forgot <span>Password</span></h2>
                    <p style={{ color: "#64748b", marginBottom: "20px" }}>
                        Enter your email and we'll send you a link to reset your password.
                    </p>

                    {message && (
                        <div style={{ padding: "10px", background: "#dcfce7", color: "#15803d", borderRadius: "8px", marginBottom: "20px" }}>
                            {message}
                        </div>
                    )}

                    {error && (
                        <div style={{ padding: "10px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", marginBottom: "20px" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <p style={{ marginTop: "20px" }}>
                        <Link to="/login" style={{ color: "#1d72f3", textDecoration: "none" }}>Back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
