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
    <div className="page">


      <div className="hero">
        <SearchBar onSearch={fetchProperties} />
      </div>

      <section>
        <h3>Sponsored Properties</h3>
        <div className="row">
          {sponsored.length === 0 && <p>No sponsored listings</p>}
          {sponsored.map((p) => (
            <PropertyCard key={p._id} p={p} sponsored />
          ))}
        </div>
      </section>

      <section>
        <h3>Latest Listings</h3>
        <div className="grid">
          {latest.length === 0 && <p>No latest listings</p>}
          {latest.map((p) => (
            <PropertyCard key={p._id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
