import { useEffect, useState } from "react";
import api from "../config/api";
import { Link } from "react-router-dom";

export default function MyEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await api.get("/api/enquiries/my", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEnquiries(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch enquiries", err);
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    if (loading) return <div style={{ padding: "40px" }}>Loading your enquiries...</div>;

    return (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto", minHeight: "80vh" }}>
            <h2 style={{ marginBottom: "30px", color: "#0f172a" }}>My Enquiries</h2>

            {enquiries.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px", background: "#f8fafc", borderRadius: "12px" }}>
                    <p style={{ color: "#64748b", fontSize: "18px" }}>You haven't made any enquiries yet.</p>
                    <Link to="/" style={{ color: "#1d72f3", fontWeight: "600", textDecoration: "none" }}>Browse Properties</Link>
                </div>
            ) : (
                <div style={{ display: "grid", gap: "20px" }}>
                    {enquiries.map((e) => (
                        <div key={e._id} style={{
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            border: "1px solid #eef2f6",
                            display: "flex",
                            overflow: "hidden",
                            transition: "transform 0.2s",
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                        >
                            <div style={{ width: "200px", height: "150px", background: "#f1f5f9" }}>
                                {e.property?.images?.[0] ? (
                                    <img
                                        src={e.property.images[0]}
                                        alt={e.property.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>No Image</div>
                                )}
                            </div>

                            <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <h3 style={{ margin: "0 0 5px 0", fontSize: "18px", color: "#1e293b" }}>{e.property?.title || "Property Unavailable"}</h3>
                                        <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>{e.property?.location}</p>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontWeight: "700", color: "#059669", fontSize: "18px" }}>₹{e.property?.price?.toLocaleString()}</div>
                                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>{new Date(e.createdAt).toLocaleDateString("en-GB")}</div>
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: "15px",
                                    padding: "12px",
                                    background: "#f8fafc",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: "#475569",
                                    borderLeft: "4px solid #1d72f3"
                                }}>
                                    <strong>Your Message:</strong> {e.message}
                                </div>

                                {e.property && (
                                    <Link
                                        to={`/property/${e.property._id}`}
                                        style={{
                                            marginTop: "15px",
                                            fontSize: "14px",
                                            color: "#1d72f3",
                                            textDecoration: "none",
                                            fontWeight: "600",
                                            alignSelf: "flex-end"
                                        }}
                                    >
                                        View Property Details →
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
