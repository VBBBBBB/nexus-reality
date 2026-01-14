import { useState, useEffect } from "react";
import api from "../config/api";

export default function CreateAdmin() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [admins, setAdmins] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch admins and current user info
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                // Get current user from token/local storage (simplified approach)
                // Ideally, you'd have a context or a /me endpoint, 
                // but for now we'll decode the token or assume api access works

                // Fetch admin list
                const res = await api.get("/api/admin/admins");
                setAdmins(res.data);
            } catch (err) {
                // If 403, it just means they are not superadmin, so we just don't show the list
                console.log("Not a superadmin or failed to fetch admins");
            }
        };

        fetchAdmins();

        // Decode token to get role (simple check)
        const token = localStorage.getItem("token");
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser(payload);
        }
    }, [message]); // Refresh list when message changes (e.g. after create/delete)

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;
        try {
            await api.delete(`/api/admin/delete-admin/${id}`);
            setMessage("Admin deleted successfully");
            setAdmins(admins.filter(a => a._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete admin");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await api.post("/api/admin/create-admin", form);
            setMessage(res.data.message);
            setForm({ name: "", email: "", phone: "", password: "" });
            // Refresh admin list
            const adminsRes = await api.get("/api/admin/admins");
            setAdmins(adminsRes.data);
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
        <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
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

            <div style={{
                display: "grid",
                gridTemplateColumns: admins.length > 0 ? "1fr 1fr" : "1fr",
                gap: "40px",
                maxWidth: admins.length > 0 ? "100%" : "600px",
                margin: "auto"
            }}>
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

                {/* Admin List Section - Only visible if superadmin successfully fetched the list */}
                {admins.length > 0 && (
                    <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eef2f6", padding: "20px" }}>
                        <h3 style={{ marginTop: 0, color: "#1e293b", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Existing Admins</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "400px", overflowY: "auto" }}>
                            {admins.map(admin => (
                                <div key={admin._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#f8fafc", borderRadius: "8px" }}>
                                    <div>
                                        <div style={{ fontWeight: "600", color: "#334155" }}>{admin.name}</div>
                                        <div style={{ fontSize: "12px", color: "#64748b" }}>{admin.email} <span style={{ background: admin.role === 'superadmin' ? '#fef3c7' : '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>{admin.role}</span></div>
                                    </div>
                                    {admin.role !== 'superadmin' && admin._id !== currentUser?.id && (
                                        <button
                                            onClick={() => handleDelete(admin._id)}
                                            style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
