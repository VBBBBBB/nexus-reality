import { Shield, Paintbrush, FileText, Sparkles, Home, Target, Users } from "lucide-react";

export default function About() {
    const services = [
        {
            title: "In-House Legal Team",
            desc: "Our expert legal professionals handle all property documentation, title verification, and registration processes to ensure a worry-free transaction.",
            icon: <Shield size={32} color="#1d72f3" />
        },
        {
            title: "Premium Painting Services",
            desc: "Transform your new space with our professional painting team. We offer high-quality finishes and color consultation for both interiors and exteriors.",
            icon: <Paintbrush size={32} color="#1d72f3" />
        },
        {
            title: "Document Handling",
            desc: "From blueprint approvals to tax paperwork, our dedicated document handlers ensure all your property files are organized and filed correctly.",
            icon: <FileText size={32} color="#1d72f3" />
        },
        {
            title: "Professional Cleaning",
            desc: "Step into a spotless home. Our cleaning services include deep cleaning, sanitization, and post-construction cleanup for a move-in ready experience.",
            icon: <Sparkles size={32} color="#1d72f3" />
        }
    ];

    const sectionStyle = {
        padding: "80px 40px",
        maxWidth: "1200px",
        margin: "0 auto"
    };

    return (
        <div style={{ background: "#fff", minHeight: "100vh" }}>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                color: "white",
                padding: "100px 40px",
                textAlign: "center"
            }}>
                <h1 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "800" }}>About <span style={{ color: "#1d72f3" }}>Nexus Reality</span></h1>
                <p style={{ fontSize: "20px", color: "#94a3b8", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
                    Redefining the real estate experience through transparency, technology, and comprehensive end-to-end support for every homeowner.
                </p>
            </div>

            {/* Story Section */}
            <div style={sectionStyle}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                    <div>
                        <h2 style={{ fontSize: "36px", color: "#0f172a", marginBottom: "24px" }}>Our Story</h2>
                        <p style={{ color: "#475569", fontSize: "18px", lineHeight: "1.8", marginBottom: "20px" }}>
                            Founded with the vision to simplify property buying and selling, Nexus Reality has grown into a trusted marketplace that goes beyond just listings. We understood that finding a property is only the first step.
                        </p>
                        <p style={{ color: "#475569", fontSize: "18px", lineHeight: "1.8" }}>
                            Today, we provide a complete ecosystem of services—from legal verification and document handling to property maintenance and cleaning—ensuring that your journey from "Searching" to "Settled" is completely seamless.
                        </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "16px", textAlign: "center" }}>
                            <Home size={40} color="#1d72f3" style={{ marginBottom: "15px" }} />
                            <h3 style={{ fontSize: "24px", color: "#0f172a" }}>5000+</h3>
                            <p style={{ color: "#64748b" }}>Properties Listed</p>
                        </div>
                        <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "16px", textAlign: "center" }}>
                            <Users size={40} color="#1d72f3" style={{ marginBottom: "15px" }} />
                            <h3 style={{ fontSize: "24px", color: "#0f172a" }}>2000+</h3>
                            <p style={{ color: "#64748b" }}>Happy Clients</p>
                        </div>
                        <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "16px", textAlign: "center", gridColumn: "span 2" }}>
                            <Target size={40} color="#1d72f3" style={{ marginBottom: "15px" }} />
                            <h3 style={{ fontSize: "24px", color: "#0f172a" }}>100% Transparency</h3>
                            <p style={{ color: "#64748b" }}>No Hidden Charges. Verified Listings.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div style={{ background: "#f1f5f9", padding: "80px 40px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <h2 style={{ fontSize: "36px", color: "#0f172a", marginBottom: "15px" }}>Comprehensive Services</h2>
                        <p style={{ color: "#64748b", fontSize: "18px" }}>We take care of everything so you can focus on making memories.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
                        {services.map((s, i) => (
                            <div key={i} style={{
                                background: "white",
                                padding: "40px",
                                borderRadius: "20px",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                                transition: "transform 0.3s ease",
                                cursor: "default"
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                            >
                                <div style={{ marginBottom: "20px" }}>{s.icon}</div>
                                <h3 style={{ fontSize: "22px", color: "#0f172a", marginBottom: "15px" }}>{s.title}</h3>
                                <p style={{ color: "#64748b", lineHeight: "1.6" }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={sectionStyle}>
                <div style={{
                    background: "#1d72f3",
                    borderRadius: "24px",
                    padding: "60px",
                    textAlign: "center",
                    color: "white"
                }}>
                    <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Ready to find your dream home?</h2>
                    <p style={{ fontSize: "18px", marginBottom: "40px", opacity: "0.9" }}>Our team is ready to help you with every step of the journey.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            padding: "16px 40px",
                            background: "white",
                            color: "#1d72f3",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "18px",
                            fontWeight: "700",
                            cursor: "pointer"
                        }}>
                        Explore Properties
                    </button>
                </div>
            </div>
        </div>
    );
}
