import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api";
import "../styles/login.css";

export default function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    }, [email, navigate]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("Please enter a valid 6-digit code");
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/auth/verify-email", { email, otp });
            alert("Email verified successfully! You can now login.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0) return;

        setResendLoading(true);
        try {
            await api.post("/api/auth/resend-otp", { email });
            alert("A new code has been sent to your email.");
            setTimer(60);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to resend OTP");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box" style={{ maxWidth: "500px", height: "auto" }}>
                <div className="login-form" style={{ flex: 1, padding: "50px" }}>
                    <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Verify <span>Email</span></h2>
                    <p style={{ textAlign: "center", color: "#64748b", marginBottom: "30px", fontSize: "14px" }}>
                        We've sent a 6-digit verification code to <br />
                        <strong style={{ color: "#0f172a" }}>{email}</strong>
                    </p>

                    <form onSubmit={handleVerify}>
                        <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            style={{
                                textAlign: "center",
                                letterSpacing: "8px",
                                fontSize: "24px",
                                fontWeight: "bold",
                                marginBottom: "30px"
                            }}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: "100%", marginBottom: "20px" }}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>

                    <div style={{ textAlign: "center", fontSize: "14px" }}>
                        <p style={{ color: "#64748b", marginBottom: "10px" }}>Didn't receive the code?</p>
                        <button
                            onClick={handleResend}
                            disabled={timer > 0 || resendLoading}
                            style={{
                                background: "none",
                                color: timer > 0 ? "#cbd5e1" : "#1d72f3",
                                border: "none",
                                padding: 0,
                                fontSize: "14px",
                                fontWeight: "700",
                                cursor: timer > 0 ? "default" : "pointer",
                                textDecoration: timer > 0 ? "none" : "underline"
                            }}
                        >
                            {resendLoading ? "Sending..." : timer > 0 ? `Resend code in ${timer}s` : "Resend Code"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
