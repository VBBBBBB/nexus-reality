import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          NEXUS <span>REALITY</span>
        </Link>
      </h2>

      <div className="nav-buttons" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/about" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"}>
          About Us
        </Link>

        {!user && (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"}>
              Login
            </Link>
            <Link to="/register">
              <button
                style={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#1d72f3",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(29, 114, 243, 0.2)",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                Sign Up
              </button>
            </Link>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <span style={{ cursor: "pointer", textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"} onClick={() => navigate("/admin/properties")}>
              Manage Properties
            </span>
            <span style={{ cursor: "pointer", textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"} onClick={() => navigate("/admin/enquiries")}>
              Enquiries
            </span>
            <span style={{ cursor: "pointer", textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"} onClick={() => navigate("/admin/create-admin")}>
              Create Admin
            </span>
          </>
        )}

        {user && user.role === "seller" && (
          <span style={{ cursor: "pointer", textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"} onClick={() => navigate("/seller/dashboard")}>
            My Listings
          </span>
        )}

        {user && user.role !== "admin" && (
          <span style={{ cursor: "pointer", textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"} onClick={() => navigate("/my-enquiries")}>
            My Enquiries
          </span>
        )}

        {user && (
          <>
            <span style={{ cursor: "pointer", textDecoration: "none", color: "#334155", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#1d72f3"} onMouseLeave={(e) => e.target.style.color = "#334155"} onClick={() => navigate("/profile")}>
              Profile
            </span>
            <button
              onClick={logout}
              style={{
                padding: "10px 24px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: "white",
                color: "#475569",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f8fafc";
                e.target.style.color = "#0f172a";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#475569";
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>

    </div>
  );
}
