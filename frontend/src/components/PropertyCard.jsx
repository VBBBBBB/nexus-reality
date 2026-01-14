import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

export default function PropertyCard({ p, sponsored }) {
  return (
    <Link to={`/property/${p._id}`} className="card">
      <div className="card-img">
        <img
          src={
            p.images?.[0]
              ? (p.images[0].startsWith("http") ? p.images[0] : `${API_URL}${p.images[0]}`)
              : "https://via.placeholder.com/300"
          }
          alt={p.title}
        />
        {sponsored && <span className="badge">Premium ✨</span>}
      </div>

      <div className="card-body">
        <h4>₹{p.price.toLocaleString()}</h4>
        <p>{p.location}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <small>{p.bhk} BHK</small>
          <small style={{ color: "#1d72f3", fontWeight: "600" }}>{p.listingType}</small>
        </div>
      </div>
    </Link>
  );
}
