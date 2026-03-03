import { Shield, Paintbrush, FileText, Sparkles, Home, Target, Users } from "lucide-react";
import { GlowingEffect } from "../components/ui/glowing-effect";
import { useState, useEffect } from "react";

export default function About() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const services = [
        {
            title: "In-House Legal Team",
            desc: "Our expert legal professionals handle all property documentation, title verification, and registration processes to ensure a worry-free transaction.",
            icon: <Shield size={32} color="#1a1a1a" />
        },
        {
            title: "Premium Painting Services",
            desc: "Transform your new space with our professional painting team. We offer high-quality finishes and color consultation for both interiors and exteriors.",
            icon: <Paintbrush size={32} color="#1a1a1a" />
        },
        {
            title: "Document Handling",
            desc: "From blueprint approvals to tax paperwork, our dedicated document handlers ensure all your property files are organized and filed correctly.",
            icon: <FileText size={32} color="#1a1a1a" />
        },
        {
            title: "Professional Cleaning",
            desc: "Step into a spotless home. Our cleaning services include deep cleaning, sanitization, and post-construction cleanup for a move-in ready experience.",
            icon: <Sparkles size={32} color="#1a1a1a" />
        }
    ];

    const sectionStyle = {
        padding: isMobile ? "60px 20px" : "80px 40px",
        maxWidth: "1200px",
        margin: "0 auto"
    };

    return (
        <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover",
                color: "white",
                padding: isMobile ? "80px 20px" : "120px 40px",
                textAlign: "center",
                marginTop: "80px"
            }}>
                <h1 style={{ fontSize: isMobile ? "32px" : "48px", marginBottom: "20px", fontWeight: "300", letterSpacing: "-0.02em" }}>Expertise You Can <span style={{ fontWeight: "500" }}>Trust</span></h1>
                <p style={{ fontSize: isMobile ? "16px" : "20px", color: "rgba(255,255,255,0.9)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", fontWeight: "300" }}>
                    Redefining the real estate experience through transparency, technology, and comprehensive end-to-end support for every homeowner.
                </p>
            </div>

            {/* Story Section */}
            <div style={sectionStyle}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "60px", alignItems: "center" }}>
                    <div>
                        <h2 style={{ fontSize: isMobile ? "28px" : "36px", color: "#1a1a1a", marginBottom: "24px", fontWeight: "300", letterSpacing: "-0.02em" }}>Our Story</h2>
                        <p style={{ color: "#475569", fontSize: isMobile ? "16px" : "18px", lineHeight: "1.8", marginBottom: "20px", fontWeight: "300" }}>
                            Founded with the vision to simplify property buying and selling, Nexus Reality has grown into a trusted marketplace that goes beyond just listings. We understood that finding a property is only the first step.
                        </p>
                        <p style={{ color: "#475569", fontSize: isMobile ? "16px" : "18px", lineHeight: "1.8", fontWeight: "300" }}>
                            Today, we provide a complete ecosystem of services—from legal verification and document handling to property maintenance and cleaning—ensuring that your journey from "Searching" to "Settled" is completely seamless.
                        </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "15px" : "20px" }}>
                        <div style={{ background: "#ffffff", padding: isMobile ? "20px" : "30px", borderRadius: "16px", textAlign: "center", border: "1px solid #e5e5e5", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                            <Home size={isMobile ? 32 : 40} color="#1a1a1a" style={{ marginBottom: "15px" }} />
                            <h3 style={{ fontSize: isMobile ? "20px" : "24px", color: "#1a1a1a", fontWeight: "400", margin: "0 0 5px 0" }}>5000+</h3>
                            <p style={{ color: "#64748b", margin: 0, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "500" }}>Properties Listed</p>
                        </div>
                        <div style={{ background: "#ffffff", padding: isMobile ? "20px" : "30px", borderRadius: "16px", textAlign: "center", border: "1px solid #e5e5e5", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                            <Users size={isMobile ? 32 : 40} color="#1a1a1a" style={{ marginBottom: "15px" }} />
                            <h3 style={{ fontSize: isMobile ? "20px" : "24px", color: "#1a1a1a", fontWeight: "400", margin: "0 0 5px 0" }}>2000+</h3>
                            <p style={{ color: "#64748b", margin: 0, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "500" }}>Happy Clients</p>
                        </div>
                        <div style={{ background: "#ffffff", padding: isMobile ? "20px" : "30px", borderRadius: "16px", textAlign: "center", gridColumn: "span 2", border: "1px solid #e5e5e5", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                            <Target size={isMobile ? 32 : 40} color="#1a1a1a" style={{ marginBottom: "15px" }} />
                            <h3 style={{ fontSize: isMobile ? "20px" : "24px", color: "#1a1a1a", fontWeight: "400", margin: "0 0 5px 0" }}>100% Transparency</h3>
                            <p style={{ color: "#64748b", margin: 0, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "500" }}>Verified Listings.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div style={{ background: "#ffffff", padding: isMobile ? "60px 20px" : "80px 40px", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>
                        <h2 style={{ fontSize: isMobile ? "28px" : "36px", color: "#1a1a1a", marginBottom: "15px", fontWeight: "300", letterSpacing: "-0.02em" }}>Comprehensive Services</h2>
                        <p style={{ color: "#64748b", fontSize: isMobile ? "16px" : "18px", fontWeight: "300" }}>We take care of everything so you can focus on making memories.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        {services.map((s, i) => (
                            <div key={i} className="relative rounded-[1.25rem] border-[0.75px] border-[#e5e5e5] p-2 list-none bg-white">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-transparent bg-[#ffffff] shadow-sm z-10 p-6 md:p-8">
                                    <div style={{ marginBottom: "20px" }}>{s.icon}</div>
                                    <h3 style={{ fontSize: "20px", color: "#1a1a1a", marginBottom: "15px", fontWeight: "400" }}>{s.title}</h3>
                                    <p style={{ color: "#64748b", lineHeight: "1.6", fontWeight: "300", margin: 0, fontSize: "0.95rem" }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={sectionStyle}>
                <div style={{
                    background: "#1a1a1a",
                    borderRadius: "0",
                    padding: isMobile ? "60px 20px" : "80px 60px",
                    textAlign: "center",
                    color: "white"
                }}>
                    <h2 style={{ fontSize: isMobile ? "28px" : "36px", marginBottom: "20px", fontWeight: "300", letterSpacing: "-0.02em" }}>Ready to find your dream home?</h2>
                    <p style={{ fontSize: isMobile ? "16px" : "18px", marginBottom: "40px", opacity: "0.9", fontWeight: "300" }}>Our team is ready to help you with every step of the journey.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            padding: "16px 40px",
                            background: "white",
                            color: "#1a1a1a",
                            border: "none",
                            borderRadius: "0",
                            fontSize: "14px",
                            fontWeight: "500",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            width: isMobile ? "100%" : "auto"
                        }}
                    >
                        Explore Properties
                    </button>
                </div>
            </div>
        </div>
    );
}

