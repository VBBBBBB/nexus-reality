import { useState, useEffect } from "react";
import api from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css";
import { GlowCard } from "../components/ui/glow-card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "admin") {
      navigate("/admin/enquiries");
    } else if (token) {
      navigate("/");
    }
  }, []);

  const login = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin/enquiries");
      }
      else if (role === "seller") {
        navigate("/seller/dashboard");
      }
      else {
        navigate("/"); // buyer goes to home
      }
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.notVerified) {
        alert(err.response.data.message);
        navigate("/verify-email", { state: { email: err.response.data.email } });
      } else {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post("/api/auth/google", {
        tokenId: credentialResponse.credential,
        mode: "login"
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/enquiries");
      else if (role === "seller") navigate("/seller/dashboard");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Google Login failed");
    }
  };

  return (
    <div className="login-page">
      <GlowCard
        containerClassName="login-box border-[0.75px] border-[#e5e5e5]"
        className="flex"
      >
        <div className="login-image relative z-10"></div>

        <div className="login-form relative z-10">
          <h2>
            <Link to="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>
              NEXUS <span>REALITY</span>
            </Link>
          </h2>

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>

          <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "1px", background: "#e5e5e5" }}></div>
              <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "#e5e5e5" }}></div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google Login Failed")}
              />
            </div>
          </div>

          <div className="auth-footer" style={{ textAlign: "center" }}>
            <p>
              <Link to="/forgot-password" style={{ color: "#666", fontWeight: "300" }}>Forgot password?</Link>
            </p>
            <p style={{ marginTop: "15px" }}>
              Don’t have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
