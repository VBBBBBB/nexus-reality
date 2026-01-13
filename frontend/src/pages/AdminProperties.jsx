import { useEffect, useState } from "react";
import api from "../config/api";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export default function AdminProperties() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        propertyId: "",
        date: "",
        sellerName: "",
        contact: "",
        minPrice: "",
        maxPrice: "",
        location: "",
        listingType: "",
        status: ""
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1); // Reset to page 1 on filter change
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const query = new URLSearchParams({
            page,
            limit: 20,
            ...debouncedFilters
        }).toString();

        api
            .get(`/api/properties/admin?${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setProperties(res.data.properties);
                setTotalPages(res.data.pages);
            })
            .catch(err => console.error("Fetch failed", err));
    }, [page, debouncedFilters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleExport = async () => {
        const token = localStorage.getItem("token");
        const query = new URLSearchParams({
            limit: 10000,
            ...filters
        }).toString();

        try {
            const res = await api.get(`/api/properties/admin?${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const dataToExport = res.data.properties.map(p => ({
                "Property ID": p.customId || "N/A",
                "Title": p.title,
                "Seller Name": p.seller?.name || "N/A",
                "Seller Email": p.seller?.email || "N/A",
                "Seller Phone": p.seller?.phone || "N/A",
                "Price": p.price,
                "Location": p.location,
                "Listing Type": p.listingType,
                "Property Type": p.propertyType,
                "BHK": p.bhk,
                "Status": p.status,
                "Date Added": new Date(p.createdAt).toLocaleDateString("en-GB")
            }));

            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Properties");
            XLSX.writeFile(wb, "Properties_Nexus.xlsx");
        } catch (error) {
            console.error("Export failed", error);
            alert("Failed to export data");
        }
    };

    const setStatus = async (id, newStatus) => {
        const token = localStorage.getItem("token");
        try {
            await api.patch(`/api/properties/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProperties(properties.map(p =>
                p._id === id ? { ...p, status: newStatus } : p
            ));
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;

        const token = localStorage.getItem("token");
        try {
            await api.delete(`/api/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(properties.filter(p => p._id !== id));
            alert("Property deleted successfully");
        } catch (err) {
            alert("Failed to delete property");
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

    return (
        <div style={{ padding: "40px", background: "#fff", minHeight: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h2 style={{ color: "#0f172a", fontSize: "24px", margin: 0 }}>Property Management</h2>
                <button
                    onClick={() => navigate("/seller/add-property")}
                    style={{
                        padding: "10px 20px",
                        background: "#1d72f3",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    + Add Property
                </button>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", background: "#f8fafc", padding: "15px", borderRadius: "8px" }}>
                <input name="propertyId" placeholder="Property ID" value={filters.propertyId} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
                <input name="sellerName" placeholder="Seller Name" value={filters.sellerName} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
                <input name="contact" placeholder="Contact No" value={filters.contact} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
                <input name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />

                <select name="status" value={filters.status} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}>
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Verified</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select name="listingType" value={filters.listingType} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}>
                    <option value="">All Types</option>
                    <option value="Resale">Resale</option>
                    <option value="New">New</option>
                    <option value="Rent">Rent</option>
                </select>

                <input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
                <input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />

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
                        marginLeft: "auto"
                    }}
                >
                    Export Excel
                </button>
            </div>

            {properties.length === 0 ? (
                <p style={{ color: "#64748b" }}>No properties found matching your criteria</p>
            ) : (
                <div style={{ borderRadius: "12px", border: "1px solid #eef2f6", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>ID</th>
                                <th style={thStyle}>Seller</th>
                                <th style={thStyle}>Details</th>
                                <th style={thStyle}>Price</th>
                                <th style={thStyle}>Location</th>
                                <th style={thStyle}>Type</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map(p => (
                                <tr key={p._id} style={{ transition: "background 0.2s" }}>
                                    <td style={tdStyle}>
                                        <span style={{ background: "#e0f2fe", color: "#0284c7", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                                            {p.customId || "N/A"}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: "500" }}>{p.seller?.name}</div>
                                        <div style={{ fontSize: "12px", color: "#64748b" }}>{p.seller?.phone}</div>
                                    </td>
                                    <td style={{ ...tdStyle, maxWidth: "200px" }}>
                                        <div style={{ fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                                        <div style={{ fontSize: "12px", color: "#64748b" }}>{p.propertyType} • {p.bhk} BHK</div>
                                    </td>
                                    <td style={{ ...tdStyle, fontWeight: "600", color: "#059669" }}>
                                        ₹{p.price?.toLocaleString()}
                                    </td>
                                    <td style={tdStyle}>{p.location}</td>
                                    <td style={tdStyle}>{p.listingType}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: "4px 10px",
                                            borderRadius: "20px",
                                            fontSize: "11px",
                                            fontWeight: "700",
                                            textTransform: "uppercase",
                                            background: p.status === "approved" ? "#dcfce7" : p.status === "rejected" ? "#fee2e2" : "#fef9c3",
                                            color: p.status === "approved" ? "#15803d" : p.status === "rejected" ? "#b91c1c" : "#854d0e"
                                        }}>
                                            {p.status === "approved" ? "Verified" : p.status}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: "220px" }}>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            {p.status !== "approved" && (
                                                <button onClick={() => setStatus(p._id, "approved")} style={{ padding: "6px 10px", borderRadius: "6px", border: "none", background: "#10b981", color: "white", cursor: "pointer", fontSize: "11px", fontWeight: "600" }}>Verify</button>
                                            )}
                                            {p.status !== "rejected" && (
                                                <button onClick={() => setStatus(p._id, "rejected")} style={{ padding: "6px 10px", borderRadius: "6px", border: "none", background: "#f59e0b", color: "white", cursor: "pointer", fontSize: "11px", fontWeight: "600" }}>Reject</button>
                                            )}
                                            <button onClick={() => handleDelete(p._id)} style={{ padding: "6px 10px", borderRadius: "6px", border: "none", background: "#ef4444", color: "white", cursor: "pointer", fontSize: "11px", fontWeight: "600" }}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ padding: "16px", background: "#f8fafc", color: "#64748b", fontSize: "13px", textAlign: "right", borderTop: "1px solid #eef2f6" }}>
                        Showing Page {page} of {totalPages}
                    </div>
                </div>
            )}
        </div>
    );
}
