import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { API_URL } from "../config/api";

export default function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        bhk: "",
        area: "",
        floor: "",
        propertyType: "apartment",
        listingType: "Resale",
        furnished: false,
        isSponsored: false,
        age: "",
        description: ""
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await api.get(`/api/properties/${id}`);
                const p = res.data;
                setForm({
                    title: p.title || "",
                    price: p.price || "",
                    location: p.location || "",
                    bhk: p.bhk || "",
                    area: p.area || "",
                    floor: p.floor || "",
                    propertyType: p.propertyType || "apartment",
                    listingType: p.listingType || "Resale",
                    furnished: p.furnished || false,
                    isSponsored: p.isSponsored || false,
                    age: p.age || "",
                    description: p.description || ""
                });
                setExistingImages(p.images || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch property", err);
                alert("Could not load property data");
                navigate("/seller/dashboard");
            }
        };
        fetchProperty();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const submit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
        if (images.length > 0) {
            images.forEach(img => {
                formData.append("images", img);
            });
        }

        try {
            await api.put(
                `/api/properties/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            alert("Property updated and submitted for re-verification!");
            navigate("/seller/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update property");
        }
    };

    const inputStyle = {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color 0.3s",
        outline: "none"
    };

    if (loading) return <div style={{ padding: "40px" }}>Loading property data...</div>;

    return (
        <div style={{
            padding: "40px 20px",
            minHeight: "100vh",
            background: "#f4f6f9",
            display: "flex",
            justifyContent: "center"
        }}>
            <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                width: "100%",
                maxWidth: "800px"
            }}>
                <h2 style={{
                    marginBottom: "30px",
                    color: "#1a1a1a",
                    fontSize: "24px",
                    fontWeight: "600",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "15px"
                }}>Edit Property</h2>

                <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                    <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Property Title</label>
                        <input name="title" placeholder="e.g., Luxury Apartment in City Center" value={form.title} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Description</label>
                        <textarea name="description" placeholder="Describe the property..." value={form.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Listing Type</label>
                        <select name="listingType" value={form.listingType} onChange={handleChange} required style={inputStyle}>
                            <option value="Resale">Resale</option>
                            <option value="New">New Booking</option>
                            <option value="Rent">Rent</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Property Category</label>
                        <select name="propertyType" value={form.propertyType} onChange={handleChange} required style={inputStyle}>
                            <option value="apartment">Apartment</option>
                            <option value="independent house">Independent House</option>
                            <option value="villa">Villa</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Price (₹)</label>
                        <input type="number" name="price" placeholder="Amount" value={form.price} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Location</label>
                        <select name="location" value={form.location} onChange={handleChange} required style={inputStyle}>
                            <option value="">Select Location or nearest area</option>
                            <option value="AUNDH">Aundh</option>
                            <option value="BANER">Baner</option>
                            <option value="BALEWADI">Balewadi</option>
                            <option value="WAKAD">Wakad</option>
                            <option value="HINJEWADI">Hinjewadi</option>
                            <option value="TATHAWADE">Tathawade</option>
                            <option value="PUNAWALE">Punawale</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>BHK</label>
                        <select name="bhk" value={form.bhk} onChange={handleChange} required style={inputStyle}>
                            <option value="">Select BHK</option>
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                            <option value="4">4 BHK</option>
                            <option value="5">5+ BHK</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Area (sq ft)</label>
                        <input type="number" name="area" placeholder="Total Area" value={form.area} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Floor</label>
                        <input type="number" name="floor" placeholder="Floor Number" value={form.floor} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Property Age (Years)</label>
                        <input type="number" name="age" placeholder="Age of property" value={form.age} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#555" }}>Update Images (Optional - Select multiple)</label>
                        <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} style={inputStyle} />
                        {images.length > 0 ? (
                            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "5px" }}>{images.length} new images selected</p>
                        ) : existingImages.length > 0 && (
                            <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <p style={{ fontSize: "12px", color: "#666", width: "100%" }}>Current Images:</p>
                                {existingImages.map((img, i) => (
                                    <img key={i} src={img} alt="Current" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ddd" }} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "20px", marginTop: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="checkbox" id="furnished" name="furnished" checked={form.furnished} onChange={handleChange} style={{ width: "20px", height: "20px" }} />
                            <label htmlFor="furnished" style={{ fontWeight: "500", color: "#555", cursor: "pointer" }}>Fully Furnished</label>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="checkbox" id="isSponsored" name="isSponsored" checked={form.isSponsored} onChange={handleChange} style={{ width: "20px", height: "20px" }} />
                            <label htmlFor="isSponsored" style={{ fontWeight: "500", color: "#1d72f3", cursor: "pointer" }}>Promote as Sponsored Listing ✨</label>
                        </div>
                    </div>

                    <button type="submit" style={{
                        gridColumn: "1 / -1",
                        marginTop: "20px",
                        padding: "16px",
                        background: "linear-gradient(135deg, #1d72f3 0%, #175ec2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(29, 114, 243, 0.3)"
                    }}>
                        Update Property
                    </button>

                </form>
            </div>
        </div>
    );
}
