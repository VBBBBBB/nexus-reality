import { useState, useEffect } from "react";
import api from "../config/api";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filters & Pagination State
    const [filters, setFilters] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        date: ""
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    const limit = 10;

    // Debounce filters
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1); // Reset to page 1 on filter change
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        fetchUsers();
    }, [debouncedFilters, page]); // Only refetch when debounced filters change

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                ...debouncedFilters,
                page,
                limit
            }).toString();

            const res = await api.get(`/api/user?${query}`);

            setUsers(res.data.users);
            setTotalPages(res.data.totalPages);
            setTotalUsers(res.data.totalUsers);
            setLoading(false);
            setError(""); // Clear error on success
        } catch (err) {
            // Ignore 429s (rate limits) gracefully inside the component if needed,
            // but debouncing should prevent them.
            setError("Failed to fetch users");
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        // Page reset is handled in the debounce effect
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? This will also delete all their properties/enquiries.")) return;

        try {
            await api.delete(`/api/user/${id}`);
            // Optimistic update
            setUsers(users.filter(user => user._id !== id));
            setTotalUsers(totalUsers - 1);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete user");
        }
    };

    const handleExport = async () => {
        try {
            const query = new URLSearchParams({ ...filters, limit: 10000 }).toString();
            const res = await api.get(`/api/user?${query}`);
            const usersToExport = res.data.users;

            const headers = ["Name", "Email", "Phone", "Role", "Joined Date"];
            const csvRows = [
                headers.join(","),
                ...usersToExport.map(user => [
                    `"${user.name || ''}"`,
                    `"${user.email || ''}"`,
                    `"${user.phone || ''}"`,
                    user.role,
                    new Date(user.createdAt).toLocaleDateString()
                ].join(","))
            ];

            const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            alert("Failed to export users");
        }
    };

    const thStyle = {
        padding: "16px",
        textAlign: "left",
        borderBottom: "2px solid #eef2f6",
        color: "#64748b",
        fontSize: "14px",
        fontWeight: "600",
        background: "#f8fafc"
    };

    const tdStyle = {
        padding: "16px",
        borderBottom: "1px solid #eef2f6",
        color: "#334155",
        fontSize: "14px"
    };

    const inputStyle = {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ddd",
        fontSize: "14px",
        outline: "none"
    };

    return (
        <div style={{ padding: "40px", background: "#fff", minHeight: "100vh" }}>
            <h2 style={{ marginBottom: "30px", color: "#0f172a", fontSize: "24px" }}>User Management</h2>

            {/* Filters Bar */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", background: "#f8fafc", padding: "15px", borderRadius: "8px" }}>
                <input name="name" placeholder="Search Name" value={filters.name} onChange={handleFilterChange} style={inputStyle} />
                <input name="email" placeholder="Search Email" value={filters.email} onChange={handleFilterChange} style={inputStyle} />
                <input name="phone" placeholder="Search Phone" value={filters.phone} onChange={handleFilterChange} style={inputStyle} />
                <select name="role" value={filters.role} onChange={handleFilterChange} style={inputStyle}>
                    <option value="">All Roles</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <input
                    name="date"
                    placeholder="YYYY or YYYY-MM-DD"
                    value={filters.date}
                    onChange={handleFilterChange}
                    style={{ ...inputStyle, width: "160px" }}
                    title="Filter by Year (2024), Month (2024-01), or Date (2024-01-01)"
                />

                <button
                    onClick={handleExport}
                    style={{
                        padding: "8px 16px",
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}
                >
                    <span>Export Excel</span>
                </button>
            </div>

            {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading users...</div>
            ) : users.length === 0 ? (
                <p style={{ color: "#64748b" }}>No active users match your search.</p>
            ) : (
                <div style={{ borderRadius: "12px", border: "1px solid #eef2f6", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Contact</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Role</th>
                                <th style={thStyle}>Joined</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} style={{ transition: "background 0.2s" }}>
                                    <td style={{ ...tdStyle, fontWeight: "500" }}>{user.name}</td>
                                    <td style={tdStyle}>{user.phone || "-"}</td>
                                    <td style={{ ...tdStyle, color: "#64748b" }}>{user.email}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            background: user.role === 'seller' ? '#e0f2fe' : '#fef3c7',
                                            color: user.role === 'seller' ? '#0369a1' : '#b45309'
                                        }}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, color: "#94a3b8" }}>
                                        {new Date(user.createdAt).toLocaleDateString("en-GB")}
                                    </td>
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            style={{
                                                padding: "6px 12px",
                                                background: "#fee2e2",
                                                color: "#dc2626",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "12px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Footer */}
                    <div style={{
                        padding: "16px",
                        borderTop: "1px solid #eef2f6",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#f8fafc"
                    }}>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "1px solid #ddd",
                                background: page === 1 ? "#f1f5f9" : "white",
                                color: page === 1 ? "#94a3b8" : "#334155",
                                cursor: page === 1 ? "not-allowed" : "pointer"
                            }}
                        >
                            Previous
                        </button>
                        <span style={{ color: "#64748b", fontSize: "14px" }}>Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "1px solid #ddd",
                                background: page === totalPages ? "#f1f5f9" : "white",
                                color: page === totalPages ? "#94a3b8" : "#334155",
                                cursor: page === totalPages ? "not-allowed" : "pointer"
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
