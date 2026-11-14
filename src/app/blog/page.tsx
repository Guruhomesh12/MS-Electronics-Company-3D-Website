"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { Calendar, ArrowRight, Clock, User, BookOpen, Sparkles, X } from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    title: "Thermodynamics of LOCA Optical Bonding in Aerospace Displays",
    excerpt: "How liquid optical silicone polymers mitigate thermal expansion stress mismatches between cover glass and TFT LCD substrates across -40°C to +85°C.",
    content: "When deploying high-resolution displays in fighter jet cockpits and high-altitude avionics, thermal cycling induces significant shear stress between dissimilar materials. Cover glass (borosilicate or aluminosilicate) exhibits a coefficient of thermal expansion (CTE) vastly different from the silicon TFT backplane. In traditional air-gap or rigid tape bonding, this differential CTE causes Newton rings, delamination, and optical distortion. Liquid Optically Clear Adhesive (LOCA) engineered with silicone polymers maintains viscoelastic compliance even at -40°C, absorbing mechanical shear while matching the refractive index (n=1.52) of tempered glass.",
    date: "March 12, 2026",
    readTime: "6 min read",
    category: "Optical Physics",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    author: "Chief Optical Architect",
  },
  {
    id: 2,
    title: "Projective Capacitive Noise Immunity in Surgical Equipment",
    excerpt: "Overcoming common-mode electrical noise spikes from electrosurgical units (ESU) using high-SNR dual-frequency excitation firmware.",
    content: "Modern hospital surgical suites present one of the harshest electromagnetic environments for touch sensors. Electrosurgical cauterizers generate broadband radiofrequency interference in the 300kHz to 3MHz range. To prevent false touches or touch freezing during critical procedures, our medical touch controllers implement adaptive frequency hopping, differential mutual-capacitance sensing, and specialized fluid rejection algorithms that distinguish between saline fluid pools and human surgeon gloves.",
    date: "February 24, 2026",
    readTime: "8 min read",
    category: "Firmware & EMI",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    author: "Senior Firmware Specialist",
  },
  {
    id: 3,
    title: "Telecentric AOI: Sub-Micron Optical Inspection in Class 1,000",
    excerpt: "Integrating 29-Megapixel telecentric cameras with polarized illumination for 100% automated inspection of micro-voids and adhesive thickness.",
    content: "Zero-defect manufacturing in optical bonding requires inspection capabilities far beyond the limits of the human eye. In our Hyderabad cleanroom, 100% of finished assemblies pass through automated optical inspection (AOI) utilizing bilateral telecentric lenses. Telecentric optics eliminate perspective distortion across the entire field of view, measuring the 0.01mm adhesive dam perimeter with sub-micron repeatability while cross-polarized light reveals internal optical strain and birefringence.",
    date: "January 18, 2026",
    readTime: "5 min read",
    category: "Metrology & AOI",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80",
    author: "Quality & Metrology Director",
  },
  {
    id: 4,
    title: "Sunlight Readability Physics: Balancing Nits vs. Reflection",
    excerpt: "Why raw backlight power alone fails without optical bonding: A mathematical look at ambient contrast ratio (ACR).",
    content: "Display readability in outdoor sunlight is governed by Ambient Contrast Ratio (ACR). A 2000 Nit display with an unbonded air-gap (reflecting 8.5% of incoming 10,000 Nit sunlight) yields an ACR of only 3.35:1—borderline unreadable. By applying LOCA optical bonding, surface reflection drops to 0.5%, boosting the effective ACR to over 24:1 without increasing power consumption or generating excess thermal load on the LED backlight.",
    date: "December 05, 2025",
    readTime: "7 min read",
    category: "Engineering Analysis",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
    author: "Optoelectronics Lead",
  },
];

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = React.useState<(typeof ARTICLES)[0] | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              ENGINEERING LOGS & TECHNICAL PAPERS
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Insights</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Technical papers and research on optical bonding physics, capacitive touch algorithms, and cleanroom metrology.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => {
                setSelectedArticle(art);
                sound.playCyberClick();
              }}
              className="p-6 rounded-3xl bg-[#090e1c]/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6 group hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/5">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono">
                    <span className="px-2.5 py-1 bg-accent/90 text-white rounded font-bold uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-gray-300 bg-black/60 px-2 py-0.5 rounded">
                      {art.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {art.date}
                </span>

                <span className="text-accent flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                  READ PAPER
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-[#090e1c] border border-cyan-500/40 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative space-y-6 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  {selectedArticle.category} // RESEARCH MEMO
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">{selectedArticle.title}</h2>
                <div className="flex items-center space-x-4 text-xs font-mono text-gray-400 pt-1">
                  <span>BY {selectedArticle.author.toUpperCase()}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm text-gray-300 leading-relaxed font-sans space-y-4 pt-2">
                <p className="text-base font-semibold text-white border-l-2 border-accent pl-4">
                  {selectedArticle.excerpt}
                </p>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono text-gray-500">
                <span>MS ELECTRONICS COMPANY ENGINEERING ARCHIVE</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl bg-accent text-white font-bold"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
