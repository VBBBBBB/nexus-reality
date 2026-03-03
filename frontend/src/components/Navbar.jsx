import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    setIsMenuOpen(false);
    localStorage.clear();
    navigate("/");
  };

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem 2rem",
    background: scrolled || isMenuOpen ? "rgba(255, 255, 255, 0.98)" : "#ffffff",
    boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
    transition: "all 0.3s ease",
    zIndex: 1000
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#1a1a1a",
    fontWeight: "500",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    transition: "opacity 0.2s ease"
  };

  const btnStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0",
    border: "1px solid #1a1a1a",
    background: "#1a1a1a",
    color: "white",
    fontWeight: "500",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "fit-content"
  };

  return (
    <>
      <div style={navStyle}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "300", letterSpacing: "0.1em" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#1a1a1a" }} onClick={() => setIsMenuOpen(false)}>
            NEXUS <span style={{ fontWeight: "600" }}>REALITY</span>
          </Link>
        </h2>

        {/* Desktop Links */}
        <div className="desktop-nav">
          <Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.opacity = "0.6"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
            Home
          </Link>
          <Link to="/about" style={linkStyle} onMouseEnter={(e) => e.target.style.opacity = "0.6"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
            About Us
          </Link>

          {!user && (
            <>
              <Link to="/login" style={linkStyle} onMouseEnter={(e) => e.target.style.opacity = "0.6"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Login
              </Link>
              <Link to="/register">
                <button
                  style={btnStyle}
                  onMouseEnter={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "#1a1a1a";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#1a1a1a";
                    e.target.style.color = "white";
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" style={linkStyle} onMouseEnter={(e) => e.target.style.opacity = "0.6"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Profile
              </Link>
              <button
                onClick={logout}
                style={{ ...btnStyle, background: "transparent", color: "#1a1a1a" }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#1a1a1a";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#1a1a1a";
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={isMenuOpen ? "mobile-menu" : ""} style={{ display: isMenuOpen ? "flex" : "none" }}>
        <Link to="/" style={{ ...linkStyle, fontSize: "1.1rem" }} onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" style={{ ...linkStyle, fontSize: "1.1rem" }} onClick={() => setIsMenuOpen(false)}>
          About Us
        </Link>

        {!user ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
            <Link to="/login" style={{ ...linkStyle, fontSize: "1.1rem" }} onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
              <button style={{ ...btnStyle, width: "100%", padding: "1rem" }}>
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
            <Link to="/profile" style={{ ...linkStyle, fontSize: "1.1rem" }} onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
            {user.role === "admin" && (
              <span style={{ ...linkStyle, fontSize: "1.1rem", cursor: "pointer" }} onClick={() => { navigate("/admin/properties"); setIsMenuOpen(false); }}>
                Manage Properties
              </span>
            )}
            <button onClick={logout} style={{ ...btnStyle, width: "100%", padding: "1rem" }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

