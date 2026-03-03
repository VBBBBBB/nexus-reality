import { useState, useEffect } from "react";
import api from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css";
import { GlowingEffect } from "../components/ui/glowing-effect";

export default function Register() {
  const [form, setForm] = useState({ role: "buyer" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const submit = async () => {
    try {
      if (!form.name || !form.email || !form.phone || !form.password) {
        alert("Please fill all fields");
        return;
      }
      const res = await api.post("/api/auth/register", form);
      alert(res.data.message);
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    // Validation: Enforce role and phone before registration
    if (!form.role || !form.phone) {
      alert("Please select a role and enter your phone number before signing up with Google.");
      return;
    }

    try {
      const res = await api.post("/api/auth/google", {
        tokenId: credentialResponse.credential,
        mode: "signup",
        role: form.role,
        phone: form.phone
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/enquiries");
      else if (role === "seller") navigate("/seller/dashboard");
      else navigate("/");
    } catch (err) {
      alert("Google Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box relative border-[0.75px] border-[#e5e5e5]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="login-image relative z-10"></div>

        <div className="login-form relative z-10">
          <h2>
            <Link to="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>
              NEXUS <span>REALITY</span>
            </Link>
          </h2>

          <input
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Phone"
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="role-select"
            value={form.role || "buyer"}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <button onClick={submit}>Create Account</button>

          <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "1px", background: "#e5e5e5" }}></div>
              <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "#e5e5e5" }}></div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google Registration Failed")}
                text="signup_with"
              />
            </div>
          </div>

          <div className="auth-footer" style={{ textAlign: "center" }}>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
