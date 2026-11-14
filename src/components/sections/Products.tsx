"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import {
  Monitor,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Maximize2
} from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "pcap",
    title: "Projected Capacitive Touch Panels",
    category: "INTERACTIVE HARDWARE",
    tagline: "Ultra-Responsive Multi-Touch Matrix with 140Hz Polling",
    desc: "Engineered with fine-pitch ITO sensor grids for flawless 10-point simultaneous touch. Specialized firmware eliminates false touches caused by water droplets, grease, and thick industrial gloves.",
    icon: Monitor,
    color: "#00f0ff",
    specs: [
      { label: "Touch Points", value: "10-Point Simultaneous" },
      { label: "Response Time", value: "< 5ms Active" },
      { label: "Glove Compatibility", value: "Up to 5mm Leather/Nitrile" },
      { label: "Controller ICs", value: "ILITEK, EETI, Microchip" },
    ],
  },
  {
    id: "optical-bonding",
    title: "LOCA / OCR Optically Bonded Displays",
    category: "OPTICAL ENGINEERING",
    tagline: "Zero Air-Gap Technology for 99.8% Optical Clarity",
    desc: "By refilling the air cavity between cover glass and LCD with refractive-index matched silicone or acrylic polymer, reflection loss is reduced by 94%, enabling daylight readability.",
    icon: Layers,
    color: "#e61919",
    specs: [
      { label: "Dispensing Tolerance", value: "±0.01mm Dynamic Z" },
      { label: "Transmission Rate", value: "99.8% Transmittance" },
      { label: "Refractive Index", value: "n = 1.52 (Matched)" },
      { label: "Bubble Defect Limit", value: "Zero Tolerance" },
    ],
  },
  {
    id: "hmi",
    title: "Rugged Industrial HMI Consoles",
    category: "AUTOMATION & SYSTEMS",
    tagline: "Heavy-Duty Human-Machine Interfaces Built for 24/7 Extremes",
    desc: "Engineered to withstand continuous vibration, hydraulic fluid exposure, electrical noise spikes, and extreme operating temperatures from -40°C to +85°C without system lockups.",
    icon: Cpu,
    color: "#10b981",
    specs: [
      { label: "Operating Temp", value: "-40°C to +85°C" },
      { label: "Ingress Protection", value: "IP68 / NEMA 4X Submersible" },
      { label: "Shock Resistance", value: "50G Peak Acceleration" },
      { label: "Duty Cycle", value: "24/7/365 Continuous" },
    ],
  },
  {
    id: "glass",
    title: "Chemically Strengthened Cover Glass",
    category: "MATERIALS & COATINGS",
    tagline: "Corning Gorilla Glass & Dragontrail Custom Lenses",
    desc: "Precision CNC milled cover glass with beveled C-cut edges, silkscreened high-temperature ceramic ink borders, and triple coatings: Anti-Glare, Anti-Reflective, and Oleophobic.",
    icon: ShieldCheck,
    color: "#f59e0b",
    specs: [
      { label: "Surface Hardness", value: "9H Mohs Scale" },
      { label: "Impact Standard", value: "IK10 Drop-Ball Certified" },
      { label: "Coatings", value: "AG + AR (<0.5%) + AF" },
      { label: "Thickness Range", value: "0.7mm to 6.0mm" },
    ],
  },
  {
    id: "medical",
    title: "Antimicrobial Medical Displays",
    category: "HEALTHCARE & SURGICAL",
    tagline: "ISO 13485 Certified Sterile Operating Room Interfaces",
    desc: "Designed for patient monitors, surgical visualization carts, and diagnostic consoles. Infused with permanent silver-ion antimicrobial coatings resistant to harsh hospital disinfectants.",
    icon: Activity,
    color: "#8b5cf6",
    specs: [
      { label: "Certification", value: "ISO 13485 / IEC 60601-1" },
      { label: "Antimicrobial Efficacy", value: "99.9% Kill Rate (Ag+)" },
      { label: "Fluid Rejection", value: "Blood & Saline Resistant" },
      { label: "Viewing Angle", value: "178°/178° IPS Uniform" },
    ],
  },
  {
    id: "avionics",
    title: "Avionics & Defense Cockpit Displays",
    category: "AEROSPACE & MILITARY",
    tagline: "Sunlight-Readable 2500 Nit Display Assemblies",
    desc: "Mission-critical displays engineered for fighter jet cockpits, unmanned ground vehicles, and tactical command centers. Features Night Vision Goggle (NVG) compatibility and EMI mesh.",
    icon: Zap,
    color: "#ec4899",
    specs: [
      { label: "Luminance", value: "1,500 - 2,500 Nits" },
      { label: "Standards", value: "MIL-STD-810H & DO-160G" },
      { label: "EMI/RFI Shielding", value: "Embedded Fine Cu Mesh" },
      { label: "NVG Compatibility", value: "MIL-STD-3009 Class A/B" },
    ],
  },
];

export function Products() {
  const [selectedProduct, setSelectedProduct] = React.useState(PRODUCTS[0]);

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-[#04060f]">
      {/* Background Neon Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              Holographic Product Matrix
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Extreme Environments</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            From sterile medical surgery suites to supersonic jet cockpits, our custom touch and optical assemblies perform with zero failover.
          </p>
        </div>

        {/* 6-Card Cybernetic Holographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            const isCurrent = selectedProduct.id === prod.id;

            return (
              <div
                key={prod.id}
                onMouseEnter={() => {
                  setSelectedProduct(prod);
                  sound.playBeep(700, 0.02);
                }}
                className={`group relative rounded-3xl p-8 bg-gradient-to-b from-[#090e1c] to-[#050711] border transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,240,255,0.15)] hover:-translate-y-1 ${
                  isCurrent
                    ? "border-cyan-500/60 shadow-[0_0_25px_rgba(0,240,255,0.12)]"
                    : "border-white/10 hover:border-cyan-500/40"
                }`}
              >
                {/* Tech Reticle Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-cyan-400/40" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-cyan-400/40" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="p-3.5 rounded-2xl bg-black/60 border border-white/10 transition-colors group-hover:border-cyan-400/50"
                      style={{ color: prod.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                      {prod.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs font-mono text-accent mt-1">{prod.tagline}</p>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed">{prod.desc}</p>

                  {/* Micro Spec Matrix */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
                    {prod.specs.map((s, idx) => (
                      <div key={idx} className="bg-black/40 p-2 rounded-lg border border-white/5">
                        <div className="text-[10px] text-gray-500">{s.label}</div>
                        <div className="text-white font-semibold text-[11px] truncate">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <Link
                    href="/#configurator"
                    onClick={() => sound.playCyberClick()}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/50 text-xs font-mono text-white transition-all flex items-center justify-center gap-2 group-hover:text-accent"
                  >
                    <span>CUSTOMIZE IN 3D CONFIGURATOR</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
