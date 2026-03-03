import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "#000000",
      padding: "6rem 2rem 2rem",
      color: "#a0a0a0",
      marginTop: "8rem",
      fontFamily: '"Inter", sans-serif',
      fontWeight: "300"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "4rem",
        marginBottom: "4rem"
      }}>
        {/* Brand */}
        <div>
          <h2 style={{ color: "#ffffff", marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "300", letterSpacing: "0.1em" }}>
            NEXUS <span style={{ fontWeight: "600" }}>REALTY</span>
          </h2>
          <p style={{ lineHeight: "1.8", fontSize: "0.95rem" }}>
            The standard of excellence in real estate. Experience curated properties and unparalleled white-glove service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", lineHeight: "2.2" }}>
            <li><Link to="/" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Home</Link></li>
            <li><Link to="/about" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>About Us</Link></li>
            <li><Link to="/login" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Client Login</Link></li>
            <li><Link to="/register" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Register Interest</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>Concierge Services</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", lineHeight: "2.2" }}>
            <li style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Legal Consultation</li>
            <li style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Interior Curation</li>
            <li style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Private Viewings</li>
            <li style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#ffffff"} onMouseLeave={(e) => e.target.style.color = "#a0a0a0"}>Estate Management</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>Global Office</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "2" }}>
            1 Excellence Boulevard<br />
            Metropolis Hub, NY 10001<br />
            <br />
            inquiries@nexusrealty.com<br />
            +1 (800) 555-REAL
          </p>
        </div>
      </div>

      <div style={{
        textAlign: "center",
        paddingTop: "2rem",
        borderTop: "1px solid #333333",
        fontSize: "0.8rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase"
      }}>
        &copy; {new Date().getFullYear()} Nexus Realty. All rights reserved.
      </div>
    </footer>
  );
}
