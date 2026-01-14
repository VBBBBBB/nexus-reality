import { useState } from "react";
import api from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css";
import { useEffect } from "react";

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
      <div className="login-box">
        <div className="login-image"></div>

        <div className="login-form">
          <h2>NEXUS <span>REALITY</span></h2>

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

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "14px", color: "#64748b" }}>OR</span>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Login Failed")}
            />
          </div>

          <p style={{ textAlign: "center", marginTop: "25px", fontSize: "14px" }}>
            <Link to="/forgot-password" style={{ textDecoration: "underline", color: "#1d72f3", fontWeight: "700" }}>Forgot password?</Link>
          </p>

          <p className="auth-footer" style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", color: "#1e293b" }}>
            Don’t have an account? <Link to="/register" style={{ color: "#1d72f3", fontWeight: "700", textDecoration: "underline" }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
