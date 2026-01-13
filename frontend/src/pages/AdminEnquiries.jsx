import { useEffect, useState } from "react";
import api from "../config/api";
import * as XLSX from "xlsx";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    propertyId: "",
    date: "",
    buyerName: "",
    contact: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    listingType: ""
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
      .get(`/api/enquiries?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setEnquiries(res.data.enquiries);
        setTotalPages(res.data.pages);
      });
  }, [page, debouncedFilters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = async () => {
    const token = localStorage.getItem("token");
    const query = new URLSearchParams({
      limit: 10000, // Fetch all for export
      ...filters
    }).toString();

    try {
      const res = await api.get(`/api/enquiries?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const dataToExport = res.data.enquiries.map(e => ({
        "Property ID": e.property?.customId || "N/A",
        "Property Title": e.property?.title || "N/A",
        "Buyer Name": e.buyer?.name || "N/A",
        "Buyer Email": e.buyer?.email || "N/A",
        "Buyer Phone": e.buyer?.phone || "N/A",
        "Message": e.message,
        "Price": e.property?.price,
        "Location": e.property?.location,
        "Listing Type": e.property?.listingType || "N/A",
        "Date": new Date(e.createdAt).toLocaleDateString("en-GB")
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
      XLSX.writeFile(wb, "Enquiries.xlsx");
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export data");
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
      <h2 style={{ marginBottom: "30px", color: "#0f172a", fontSize: "24px" }}>Customer Enquiries</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", background: "#f8fafc", padding: "15px", borderRadius: "8px" }}>
        <input name="propertyId" placeholder="Property ID" value={filters.propertyId} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <input name="buyerName" placeholder="Buyer Name" value={filters.buyerName} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <input name="contact" placeholder="Contact No" value={filters.contact} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <input name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <select name="listingType" value={filters.listingType} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}>
          <option value="">All Listing Types</option>
          <option value="Resale">Resale</option>
          <option value="New">New</option>
          <option value="Rent">Rent</option>
        </select>
        <input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <input name="date" type="date" value={filters.date} onChange={handleFilterChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />

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

      {enquiries.length === 0 ? (
        <p style={{ color: "#64748b" }}>No enquiries yet</p>
      ) : (
        <div style={{ borderRadius: "12px", border: "1px solid #eef2f6", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Property ID</th>
                <th style={thStyle}>Buyer Name</th>
                <th style={thStyle}>Contact No</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(e => (
                <tr key={e._id} style={{ transition: "background 0.2s" }}>
                  <td style={tdStyle}>
                    <span style={{
                      background: "#e0f2fe",
                      color: "#0284c7",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {e.property?.customId || "N/A"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: "500" }}>{e.buyer?.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{e.buyer?.email}</div>
                  </td>
                  <td style={tdStyle}>{e.buyer?.phone}</td>
                  <td style={{ ...tdStyle, maxWidth: "300px", lineHeight: "1.5" }}>{e.message}</td>
                  <td style={{ ...tdStyle, fontWeight: "600", color: "#059669" }}>
                    ₹{e.property?.price?.toLocaleString()}
                  </td>
                  <td style={tdStyle}>{e.property?.location}</td>
                  <td style={tdStyle}>
                    <span style={{
                      background: e.property?.listingType === "Rent" ? "#fff1f2" : "#ecfdf5",
                      color: e.property?.listingType === "Rent" ? "#be123c" : "#047857",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {e.property?.listingType}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: "#94a3b8", fontSize: "12px" }}>
                    {new Date(e.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
