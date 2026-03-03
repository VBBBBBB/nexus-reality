import { Link } from "react-router-dom";
import { API_URL } from "../config/api";
import { GlowCard } from "./ui/glow-card";
import { MapPin, BedDouble, Tag } from "lucide-react";

export default function PropertyCard({ p, sponsored }) {
  return (
    <GlowCard
      containerClassName="card rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3 list-none overflow-visible"
      className="overflow-visible"
    >
      <Link to={`/property/${p._id}`} className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-[#e5e5e5] bg-[#ffffff] shadow-sm hover:shadow-md transition-shadow md:p-0 no-underline text-[#1a1a1a] z-10">
        <div className="relative aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
          <img
            src={
              p.images?.[0]
                ? (p.images[0].startsWith("http") ? p.images[0] : `${API_URL}${p.images[0]}`)
                : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {sponsored && <span className="absolute top-4 right-4 bg-black text-white text-[0.75rem] font-medium px-4 py-2 uppercase tracking-[0.1em] z-10">Exclusive</span>}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-3 p-5 md:p-6 bg-white">
          <div className="space-y-3">
            <h4 className="text-[1.5rem] font-normal text-[#1a1a1a] m-0 mb-2">₹{p.price.toLocaleString('en-IN')}</h4>
            <div className="flex items-start text-[#666] mb-4">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-[0.95rem] m-0 font-light">{p.location}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#eee] mt-auto">
            <div className="flex items-center text-[#1a1a1a]">
              <BedDouble className="w-4 h-4 mr-2" />
              <small className="text-[0.85rem] font-medium uppercase tracking-[0.05em]">{p.bhk} BHK</small>
            </div>
            <div className="flex items-center text-[#666]">
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              <small className="text-[0.85rem] capitalize">{p.listingType}</small>
            </div>
          </div>
        </div>
      </Link>
    </GlowCard>
  );
}

