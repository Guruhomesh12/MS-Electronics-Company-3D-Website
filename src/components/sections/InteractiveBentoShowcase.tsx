"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { ArrowRight, Layers, ShieldCheck, Activity, Cpu, Monitor, Zap } from "lucide-react";
import Link from "next/link";

const METRIC_PILLS = [
  { label: "99% Clarity", color: "bg-blue-500 text-white shadow-blue-500/30" },
  { label: "+99.8% Transmittance", color: "bg-cyan-500 text-black shadow-cyan-500/30 font-bold" },
  { label: "±0.01mm Z-Axis", color: "bg-red-500 text-white shadow-red-500/30" },
  { label: "IK10 Vandal-Proof", color: "bg-emerald-500 text-white shadow-emerald-500/30" },
  { label: "MIL-STD-810H", color: "bg-purple-600 text-white shadow-purple-500/30" },
  { label: "ISO 13485 Medical", color: "bg-amber-500 text-white shadow-amber-500/30" },
];

const SHOWCASE_CARDS = [
  {
    title: "Projected Capacitive Multi-Touch Displays",
    tagline: "10-Point Simultaneous Touch // 140Hz Polling",
    desc: "Fine-pitch diamond ITO sensors with custom firmware for seamless operation through 5mm heavy industrial gloves and in presence of water droplets.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    badge: "PCAP HARDWARE",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    title: "LOCA / OCR Zero Air-Gap Optical Bonding",
    tagline: "Refraction Index n=1.52 // 94% Reflection Elimination",
    desc: "Liquid optical clear resin bonding eliminating internal air gaps, preventing moisture fogging and delivering 100% sunlight legibility.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    badge: "OPTICAL BONDING",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
  },
  {
    title: "Avionics & Defense High-Brightness Consoles",
    tagline: "2500 Nits Direct Sunlight // NVG Class A/B Filtration",
    desc: "Cockpit and tactical vehicle multi-touch displays qualified under DO-160G and MIL-STD-810H environmental stress and shock standards.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80",
    badge: "DEFENSE & AVIONICS",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
];

export function InteractiveBentoShowcase() {
  return (
    <section className="py-24 bg-[#f8fafc] border-t border-slate-200">
      <div className="container mx-auto px-6">
        {/* Header (Matching 00:19 in Video) */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Selected products, <br />
            <span className="italic font-serif text-blue-600">designed to perform.</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
            High-precision touch and optical solutions engineered for extreme medical, aerospace, and industrial reliability.
          </p>
        </div>

        {/* Floating Metric Pills Bar (Matching 00:20 in Video) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {METRIC_PILLS.map((pill, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playBeep(500 + idx * 40, 0.02)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold shadow-md cursor-pointer hover:scale-105 transition-transform ${pill.color}`}
            >
              {pill.label}
            </div>
          ))}
        </div>

        {/* 3-Card Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {SHOWCASE_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-blue-600 font-bold mb-1">{card.tagline}</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">{card.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="#configurator"
                    onClick={() => sound.playCyberClick()}
                    className="inline-flex items-center text-xs font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors"
                  >
                    <span>CONFIGURE IN 3D</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

