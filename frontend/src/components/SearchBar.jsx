import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    bhk: "",
    budget: "",
    listingType: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="search-bar">
      <input
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
      />

      <select name="listingType" value={filters.listingType} onChange={handleChange}>
        <option value="">Listing Type</option>
        <option value="Resale">Resale</option>
        <option value="New">New</option>
        <option value="Rent">Rent</option>
      </select>

      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">Property Type</option>
        <option value="apartment">Apartment</option>
        <option value="independent house">Independent House</option>
        <option value="villa">Villa</option>
      </select>

      <select name="bhk" value={filters.bhk} onChange={handleChange}>
        <option value="">BHK</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5+</option>
      </select>

      <input
        name="budget"
        type="number"
        placeholder="Max Budget"
        value={filters.budget}
        onChange={handleChange}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
