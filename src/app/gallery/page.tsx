"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { Play, X, ZoomIn, Eye, Sparkles, Filter, Layers, Shield } from "lucide-react";

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: "0.01mm Automated CNC Liquid Dispensing",
    category: "Cleanroom Robotics",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    desc: "Micron-level automated structural silicone dam dispensing under laminar airflow.",
  },
  {
    id: 2,
    title: "Class 1,000 Cleanroom Optical Assembly",
    category: "Cleanroom",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
    desc: "Zero-particulate HEPA cleanroom workspace for bubble-free LOCA display lamination.",
  },
  {
    id: 3,
    title: "Avionics Multi-Touch Cockpit Console",
    category: "Aerospace",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80",
    desc: "Sunlight-readable 2000 Nit optically bonded flight display with NVG filtration.",
  },
  {
    id: 4,
    title: "Telecentric Automated Optical Inspection (AOI)",
    category: "Metrology",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80",
    desc: "Machine vision scanner inspecting for micro-birefringence and sub-micron particle defects.",
  },
  {
    id: 5,
    title: "Surgical Medical Diagnostic Display",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    desc: "Antimicrobial cover glass with fluid-rejection projective capacitive multi-touch.",
  },
  {
    id: 6,
    title: "Heavy Machinery Extreme Temperature HMI",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    desc: "IP68 sealed ruggedized console operating across -40°C to +85°C thermal extremes.",
  },
];

const CATEGORIES = ["All", "Cleanroom Robotics", "Aerospace", "Healthcare", "Industrial", "Metrology"];

export default function GalleryPage() {
  const [filter, setFilter] = React.useState("All");
  const [selectedItem, setSelectedItem] = React.useState<(typeof SHOWCASE_ITEMS)[0] | null>(null);

  const filteredItems = SHOWCASE_ITEMS.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              HOLOGRAPHIC MEDIA VAULT
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Vault</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Explore our precision robotics, cleanroom assembly lines, and deployed mission-critical display systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                sound.playCyberClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                filter === cat
                  ? "bg-accent text-white shadow-[0_0_15px_rgba(230,25,25,0.4)] border border-accent scale-105"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                sound.playCyberClick();
              }}
              className="group relative rounded-3xl overflow-hidden bg-[#090d1a] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-[#090d1a]/40 to-transparent" />

                {/* Cyber Reticle Hover Overlay */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="p-3 rounded-full bg-black/80 border border-white/20 text-white shadow-xl">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 rounded-full font-bold">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>INSPECT HIGH-RES</span>
                  <span className="text-accent flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    CLICK TO VIEW
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-[#090e1c] border border-cyan-500/40 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  {selectedItem.category} // METROLOGY RECORD
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedItem.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
