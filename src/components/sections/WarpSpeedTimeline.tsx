"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { Sparkles, Zap, Award, Shield, ArrowRight } from "lucide-react";

const MILESTONES = [
  { year: "2022", title: "PCAP Architecture Inception", desc: "Formulation of 10-point multi-touch projective capacitive sensor matrix with thick glove operation." },
  { year: "2023", title: "Class 1,000 Cleanroom Launch", desc: "Commissioning of our 1,000 sq. ft. cleanroom facility with laminar HEPA filtration in Telangana." },
  { year: "2024", title: "Aerospace & Defense Qualification", desc: "Achieved full compliance with MIL-STD-810H and DO-160G for sunlight-readable cockpit displays." },
  { year: "2025", title: "0.01mm Dynamic Dispensing", desc: "Deployment of 3-axis CNC automated dispensing robotics with real-time laser topography compensation." },
  { year: "2026", title: "Next-Gen 3D Optical Matrix", desc: "Unveiling bespoke 3D custom hardware architecture, LOCA zero-gap bonding, and global OEM export." },
];

export function WarpSpeedTimeline() {
  const [selectedYear, setSelectedYear] = React.useState(MILESTONES[4]);

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b16] text-white">
      {/* 3D Warp Laser Speed Lines (Matching 00:06-00:10 of the video) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px]"></div>
        
        {/* Radiating Laser Rays */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[120vw] bg-gradient-to-t from-transparent via-cyan-400 to-transparent origin-center"
              style={{
                transform: `rotate(${i * 15}deg)`,
                animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-cyan-400/50 rounded-full px-4 py-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-cyan-300 tracking-widest uppercase">
              HYPER-SPEED ENGINEERING TRAJECTORY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-accent">Perfection</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Click any milestone year below to inspect our technological breakthroughs and cleanroom advancements.
          </p>
        </div>

        {/* Year Pills Navigation (Just like 00:07-00:10 in the video: 2022, 2023, 2024, 2025, 2026) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {MILESTONES.map((item) => {
            const isSelected = selectedYear.year === item.year;
            return (
              <button
                key={item.year}
                onClick={() => {
                  setSelectedYear(item);
                  sound.playCyberClick();
                }}
                className={`px-6 py-3 rounded-2xl font-mono text-sm sm:text-base font-black transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(0,240,255,0.6)] scale-110 border border-white"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card */}
        <div className="max-w-2xl mx-auto bg-black/60 border border-cyan-400/40 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,240,255,0.2)] text-center space-y-4">
          <div className="text-5xl sm:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-accent">
            {selectedYear.year}
          </div>
          <h3 className="text-2xl font-bold text-white">{selectedYear.title}</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{selectedYear.desc}</p>
        </div>
      </div>
    </section>
  );
}

