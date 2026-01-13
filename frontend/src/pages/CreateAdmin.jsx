import { useState } from "react";
import api from "../config/api";

export default function CreateAdmin() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await api.post("/api/admin/create-admin", form);
            setMessage(res.data.message);
            setForm({ name: "", email: "", phone: "", password: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create admin");
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

    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ marginBottom: "30px", color: "#0f172a" }}>Create New Admin</h2>

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

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        style={inputStyle}
                        placeholder="Enter admin name"
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        style={inputStyle}
                        placeholder="admin@nexusreality.com"
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                        style={inputStyle}
                        placeholder="9999999999"
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        style={inputStyle}
                        placeholder="Secure password"
                    />
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "5px" }}>
                        The new admin should change this password after first login.
                    </p>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "16px",
                        background: "linear-gradient(135deg, #1d72f3 0%, #175ec2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(29, 114, 243, 0.3)"
                    }}
                >
                    Create Admin Account
                </button>
            </form>
        </div>
    );
}
