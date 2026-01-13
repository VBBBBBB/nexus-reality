import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "#0f172a",
      padding: "60px 40px 30px",
      color: "#94a3b8",
      marginTop: "80px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px",
        marginBottom: "40px"
      }}>
        {/* Brand */}
        <div>
          <h2 style={{ color: "white", marginBottom: "20px" }}>NEXUS <span style={{ color: "#1d72f3" }}>REALITY</span></h2>
          <p style={{ lineHeight: "1.6", fontSize: "14px" }}>
            The most trusted platform for buying, selling, and managing properties with full-service support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ color: "white", fontSize: "18px", marginBottom: "20px" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", lineHeight: "2.5" }}>
            <li><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link></li>
            <li><Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>About Us</Link></li>
            <li><Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>Login</Link></li>
            <li><Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>Register</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ color: "white", fontSize: "18px", marginBottom: "20px" }}>Our Services</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", lineHeight: "2.5" }}>
            <li>In-House Legal Team</li>
            <li>Painting Services</li>
            <li>Document Handling</li>
            <li>Cleaning Services</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ color: "white", fontSize: "18px", marginBottom: "20px" }}>Contact</h3>
          <p style={{ fontSize: "14px", lineHeight: "1.8" }}>
            123 Reality Square, Tech City<br />
            Email: info@nexusreality.com<br />
            Phone: +91 999 999 9999
          </p>
        </div>
      </div>

      <div style={{
        textAlign: "center",
        paddingTop: "30px",
        borderTop: "1px solid #1e293b",
        fontSize: "13px"
      }}>
        © 2026 Nexus Reality. All rights reserved.
      </div>
    </footer>
  );
}
