import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/api/properties/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: 1200, margin: "auto", minHeight: "80vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#0f172a" }}>Seller Dashboard</h1>
        <button
          onClick={() => navigate("/seller/add-property")}
          style={{
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            background: "#1d72f3",
            color: "white",
            fontSize: 15,
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(29, 114, 243, 0.2)"
          }}
        >
          + Add New Property
        </button>
      </div>

      {/* Listings */}
      <h3 style={{ marginTop: "40px", color: "#334155" }}>My My Listings</h3>

      {properties.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px", background: "#f8fafc", borderRadius: "16px", marginTop: "20px" }}>
          <p style={{ color: "#64748b" }}>You haven't listed any properties yet.</p>
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "25px",
        marginTop: "20px"
      }}>
        {properties.map(p => (
          <div
            key={p._id}
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid #eef2f6",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={p.images?.[0]}
                alt=""
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  background: p.status === "approved" ? "#dcfce7" : p.status === "rejected" ? "#fee2e2" : "#fef9c3",
                  color: p.status === "approved" ? "#15803d" : p.status === "rejected" ? "#b91c1c" : "#854d0e",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  {p.status === "approved" ? "Verified" : p.status}
                </span>
                {p.isSponsored && (
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    background: "#eff6ff",
                    color: "#1d72f3",
                    border: "1px solid #bfdbfe",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}>
                    Sponsored ✨
                  </span>
                )}
              </div>
            </div>

            <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h4 style={{ margin: "0 0 5px 0", fontSize: "20px", color: "#0f172a" }}>₹{p.price.toLocaleString()}</h4>
              <p style={{ margin: "0 0 15px 0", color: "#64748b", fontSize: "14px" }}>{p.location}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontSize: "14px", color: "#475569", fontWeight: "500" }}>{p.bhk} BHK • {p.propertyType}</span>
                <span style={{ fontSize: "12px", color: "#1d72f3", fontWeight: "700", background: "#f0f7ff", padding: "4px 8px", borderRadius: "6px" }}>{p.listingType}</span>
              </div>

              <div style={{ marginTop: "auto" }}>
                <button
                  onClick={() => navigate(`/seller/edit-property/${p._id}`)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #1d72f3",
                    background: "white",
                    color: "#1d72f3",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#1d72f3";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#1d72f3";
                  }}
                >
                  Edit Property
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
