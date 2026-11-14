"use client";

import * as React from "react";
import { TouchPanel3D } from "@/components/3d/TouchPanel3D";
import { sound } from "@/lib/sound";
import { ArrowRight, Sliders, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Modern Geometric Proportional Letters (Ultra-clean modern sans-serif, NO typewriter monospace)
const TITLE_PART_1 = ["M", "S", " ", "E", "L", "E", "C", "T", "R", "O", "N", "I", "C", "S"];
const TITLE_PART_2 = ["C", "O", "M", "P", "A", "N", "Y"];

const MARQUEE_TAGS = [
  "0.01mm Precision CNC Dispensing",
  "LOCA Optical Bonding",
  "Projected Capacitive Multi-Touch",
  "MIL-STD-810H Defense Tested",
  "ISO 13485 Medical Compliance",
  "Sunlight Readable 2500 Nits",
  "Class 1,000 ISO 6 Cleanroom",
  "Glove & Water Droplet Rejection",
  "Corning Gorilla Glass 9H",
  "Bespoke OEM Hardware Engineering",
];

export function HeroVideoStyle() {
  return (
    <section className="relative pt-36 sm:pt-40 pb-24 overflow-hidden bg-gradient-to-b from-[#070e1f] via-[#091533] to-[#060c1d] text-white">
      {/* Ambient Aerospace Glow Behind Title */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-cyan-500/15 via-blue-600/20 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* High-Tech Luminous Blueprint Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff20_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff20_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Official Tag Pill - Luminous High Contrast */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2.5 bg-[#0c1c3f]/90 border border-cyan-400/40 rounded-full px-5 py-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-black text-cyan-300 tracking-widest uppercase">
              MS ELECTRONICS COMPANY // OFFICIAL PORTFOLIO
            </span>
          </div>
        </div>

        {/* 1. Giant Authoritative Company Branding: MS ELECTRONICS COMPANY */}
        {/* Sleek Diamond Chrome & Radiant Cyan Palette in Modern Sans-Serif */}
        <div className="flex flex-col items-center justify-center mb-8 select-none">
          {/* Line 1: MS ELECTRONICS in Radiant Diamond Chrome */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {TITLE_PART_1.map((char, idx) => {
              if (char === " ") {
                return <span key={idx} className="w-3 sm:w-6" />;
              }
              return (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  onMouseEnter={() => sound.playBeep(450 + idx * 30, 0.02)}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent cursor-pointer drop-shadow-[0_4px_25px_rgba(255,255,255,0.3)] hover:from-cyan-300 hover:to-blue-400 transition-colors"
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Line 2: COMPANY in Electric Cyber Cyan-Blue */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-1 sm:mt-2">
            {TITLE_PART_2.map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4 + idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.18, y: -4 }}
                onMouseEnter={() => sound.playBeep(850 + idx * 40, 0.02)}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-sans tracking-wider bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent cursor-pointer drop-shadow-[0_4px_30px_rgba(0,240,255,0.45)] hover:from-white hover:to-cyan-300 transition-colors"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* 2. Bold Statement Headline - Pure Modern Sans-Serif */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-14">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Displays that feel{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent underline decoration-cyan-400/50 underline-offset-8">
              obvious
            </span>. <br />
            Engineering that isn't.
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            World-class manufacturer of custom multi-layer capacitive touch panels, zero air-gap LOCA optical bonding, and high-brightness avionics displays.
          </p>

          {/* High-Contrast Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="#configurator"
              onClick={() => sound.playCyberClick()}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-mono text-xs font-black tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Sliders className="w-4 h-4 text-slate-950" />
              <span>CUSTOMIZE IN 3D</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => sound.playCyberClick()}
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-cyan-400/60 backdrop-blur-xl font-mono text-xs font-bold tracking-wider shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>CONTACT BIBINAGAR HQ</span>
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </Link>
          </div>
        </div>

        {/* 3. Quantitative Stat Counters Bar - High Contrast Glassmorphism Card */}
        <div className="max-w-4xl mx-auto mb-16 bg-[#0c1a3b]/85 border border-cyan-400/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-300/90 text-center mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>PRECISION IS HOW WE ENGINEER — DURABILITY IS HOW WE SCALE</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">±0.01mm</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">CNC DISPENSING</div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">dynamic z-axis servo</div>
            </div>
            <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono mb-1 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">99.8%</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">LOCA CLARITY</div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">zero internal reflection</div>
            </div>
            <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">10M+</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">TOUCH LIFESPAN</div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">glove & saline proof</div>
            </div>
            <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">ISO 9001</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">CLEANROOM SPEC</div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">class 1,000 / class 10k</div>
            </div>
          </div>
        </div>

        {/* 4. Marquee Ticker - Luminous Cyber Strip */}
        <div className="relative w-full overflow-hidden py-3.5 bg-[#050b18]/90 rounded-2xl mb-16 shadow-lg border border-cyan-500/30">
          <div className="flex animate-marquee whitespace-nowrap space-x-6 text-xs font-mono font-bold text-slate-200">
            {MARQUEE_TAGS.concat(MARQUEE_TAGS).map((tag, idx) => (
              <span key={idx} className="inline-flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 5. Embedded Interactive 3D Touch Panel (Luminous Holographic Viewport) */}
        <div className="relative rounded-3xl overflow-hidden border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#091530] to-[#040814]">
          <div className="p-4 sm:p-6 border-b border-cyan-400/30 flex flex-wrap items-center justify-between gap-3 bg-[#0a1838]/90">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <span>MS ELECTRONICS COMPANY // 3D HOLOGRAPHIC TOUCH ARCHITECTURE</span>
            </div>
            <div className="text-[11px] font-mono text-cyan-200 bg-cyan-950/60 px-3.5 py-1.5 rounded-full border border-cyan-400/40">
              DRAG TO ROTATE • SCROLL TO ZOOM • CLICK TO TEST TOUCH
            </div>
          </div>
          <TouchPanel3D />
        </div>
      </div>
    </section>
  );
}
