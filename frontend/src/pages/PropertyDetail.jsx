import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/api";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api
      .get(`/api/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
      });
  }, [id]);

  const sendEnquiry = async () => {
    await api.post(
      "/api/enquiries",
      {
        propertyId: property._id,
        message
      }
    );

    setSent(true);
  };

  if (!property) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto", minHeight: "90vh" }}>
      {/* Upper Gallery Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <img
            src={property.images?.[activeImage] || "https://via.placeholder.com/1200x600"}
            alt={property.title}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              transition: "all 0.5s ease"
            }}
          />
          <div style={{ position: "absolute", bottom: "20px", left: "20px", display: "flex", gap: "12px", background: "rgba(0,0,0,0.4)", padding: "10px", borderRadius: "12px", backdropFilter: "blur(5px)" }}>
            {property.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                style={{
                  width: "60px",
                  height: "45px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: activeImage === i ? "2px solid #fff" : "2px solid transparent",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 40
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
            <h1 style={{ fontSize: "36px", color: "#0f172a" }}>₹{property.price.toLocaleString()}</h1>
            <span style={{
              background: property.listingType === "Rent" ? "#fff1f2" : "#ecfdf5",
              color: property.listingType === "Rent" ? "#be123c" : "#047857",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {property.listingType}
            </span>
          </div>
          <h3 style={{ color: "#64748b", fontWeight: "400", fontSize: "20px", marginBottom: "20px" }}>{property.location}</h3>

          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #eef2f6" }}>
            <h4 style={{ marginBottom: "10px", color: "#1e293b" }}>Description</h4>
            <p style={{ color: "#475569", lineHeight: "1.6", whiteSpace: "pre-line" }}>{property.description}</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginTop: 30
            }}
          >
            <DetailItem label="BHK" value={property.bhk} />
            <DetailItem label="Area" value={`${property.area} sq.ft`} />
            <DetailItem label="Floor" value={property.floor} />
            <DetailItem label="Furnishing" value={property.furnished ? "Fully Furnished" : "Not Furnished"} />
            <DetailItem label="Age" value={`${property.age} years`} />
            <DetailItem label="Property Type" value={property.propertyType} />
          </div>
        </div>

        <div
          style={{
            padding: "30px",
            borderRadius: "20px",
            background: "white",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            border: "1px solid #f1f5f9",
            height: "fit-content"
          }}
        >
          <h3 style={{ marginBottom: "5px", color: "#0f172a" }}>Interested?</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>Contact for details</p>

          <div style={{ marginBottom: "25px", padding: "12px", background: "#f8fafc", borderRadius: "10px" }}>
            <div style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>Seller</div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#334155" }}>{property.seller?.name || "Premium Consultant"}</div>
          </div>

          {sent ? (
            <div style={{ padding: "20px", background: "#ecfdf5", color: "#059669", borderRadius: "12px", textAlign: "center", fontWeight: "600" }}>
              ✨ Enquiry Sent Successfully!
              <p style={{ fontSize: "13px", color: "#10b981", marginTop: "5px" }}>Our team will reach out shortly.</p>
            </div>
          ) : (
            <>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "8px" }}>Your Message</label>
              <textarea
                placeholder="I am interested in this property. Please contact me with more details."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  minHeight: "120px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.currentTarget.style.borderColor = "#1d72f3"}
                onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
              />

              <button
                onClick={sendEnquiry}
                style={{
                  marginTop: 20,
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #1d72f3 0%, #175ec2 100%)",
                  color: "white",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(29, 114, 243, 0.2)"
                }}
              >
                Send Enquiry
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div style={{ background: "#fff", padding: "15px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
      <div style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", marginBottom: "5px" }}>{label}</div>
      <div style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", textTransform: "capitalize" }}>{value}</div>
    </div>
  );
}
