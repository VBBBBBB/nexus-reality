import { useState } from "react";
import api from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css";
import { useEffect } from "react";

export default function Register() {
  const [form, setForm] = useState({ role: "buyer" });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const submit = async () => {
    await api.post("/api/auth/register", form);
    navigate("/login");
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
      <div className="login-box">
        <div className="login-image"></div>

        <div className="login-form">
          <h2>NEXUS <span>REALITY</span></h2>

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
            value={form.role || "buyer"}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={{
              padding: 14,
              borderRadius: 10,
              border: "1px solid #ddd",
              marginBottom: 20
            }}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>


          <button onClick={submit}>Create Account</button>

          <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Registration Failed")}
              text="signup_with"
            />
          </div>

          <p className="signup">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
