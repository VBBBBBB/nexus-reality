import { useEffect, useState } from "react";
import api from "../config/api";

import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import "../styles/home.css";

export default function Home() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.location) params.append("location", filters.location);
      if (filters.type) params.append("propertyType", filters.type); // backend uses propertyType
      if (filters.bhk) params.append("bhk", filters.bhk);
      if (filters.budget) params.append("maxPrice", filters.budget);
      if (filters.listingType) params.append("listingType", filters.listingType);

      const res = await api.get(`/api/properties?${params.toString()}`, {
        headers: {
          "Cache-Control": "no-cache"
        }
      });


      console.log("Properties from API:", res.data);
      setProperties(res.data);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const sponsored = properties.filter(
    (p) => p.isSponsored === true || p.isSponsored === "true"
  );

  const latest = properties.filter(
    (p) => p.isSponsored === false || p.isSponsored === "false"
  );

  return (
    <>
      <div className="hero">
        <h1 className="hero-title">The Standard of Excellence</h1>
        <p className="hero-subtitle">Discover premium real estate properties curated for extraordinary living.</p>
        <SearchBar onSearch={fetchProperties} />
      </div>

      <div className="page">
        <section>
          <h3>Exclusive Collections</h3>
          <div className="row">
            {sponsored.length === 0 && <p style={{ color: "#666", fontStyle: "italic" }}>No exclusive listings presently available.</p>}
            {sponsored.map((p) => (
              <PropertyCard key={p._id} p={p} sponsored />
            ))}
          </div>
        </section>

        <section>
          <h3>Newly Listed Estates</h3>
          <div className="grid">
            {latest.length === 0 && <p style={{ color: "#666", fontStyle: "italic" }}>No new estates available.</p>}
            {latest.map((p) => (
              <PropertyCard key={p._id} p={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
