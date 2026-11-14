"use client";

import * as React from "react";
import { TouchMatrixInteractive } from "@/components/3d/TouchMatrixInteractive";
import { sound } from "@/lib/sound";
import {
  Award,
  ShieldCheck,
  Target,
  Search,
  Activity,
  CheckCircle2,
  Cpu,
  Sparkles
} from "lucide-react";

export function Quality() {
  return (
    <section id="quality" className="py-24 relative overflow-hidden bg-[#04060e]">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono font-semibold text-accent tracking-widest uppercase">
              Quality Assurance & Metrology
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Uncompromising <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Micron Precision</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Our 1,000 sq. ft. certified Class 1,000 / Class 10,000 cleanroom houses fully automated dispensing robotics, telecentric AOI machine vision, and optical spectrometer testing.
          </p>
        </div>

        {/* 4 Metrology Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "0.01mm", label: "Dispensing Tolerance", sub: "Dynamic Z-Axis Servo Mapping" },
            { value: "100%", label: "Machine Vision AOI", sub: "Automated Optical Inspection" },
            { value: "ISO 9001", label: "Certified Facility", sub: "ISO 9001:2015 / ISO 13485" },
            { value: "10M+", label: "Touch Durability", sub: "Continuous Cyclic Actuations" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-[#080d1b] border border-cyan-500/20 backdrop-blur-md text-center hover:border-cyan-400/50 transition-all shadow-xl group"
            >
              <div className="text-3xl md:text-5xl font-black text-white group-hover:text-cyan-400 transition-colors font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-gray-200 mt-2 uppercase tracking-wider">{stat.label}</div>
              <div className="text-[10px] text-gray-400 font-mono mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Cleanroom Live Telemetry Dashboard */}
        <div className="mb-16 bg-[#070b16] border border-cyan-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>CLEANROOM FACILITY TELEMETRY: HYDERABAD HQ</span>
              </div>
              <h3 className="text-2xl font-bold text-white">ISO Class 6 Environmental Monitoring</h3>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono">
              ALL PARAMETERS NOMINAL
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 text-[10px]">PARTICLE COUNT (≥0.5µm)</span>
              <div className="text-xl font-bold text-cyan-400 mt-1">128 / ft³</div>
              <span className="text-[10px] text-emerald-400">Class 1,000 Compliant</span>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 text-[10px]">ROOM TEMPERATURE</span>
              <div className="text-xl font-bold text-white mt-1">21.2°C ± 0.3°C</div>
              <span className="text-[10px] text-cyan-400">Active HVAC Stabilized</span>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 text-[10px]">RELATIVE HUMIDITY</span>
              <div className="text-xl font-bold text-white mt-1">45.4% RH</div>
              <span className="text-[10px] text-cyan-400">Target: 45% ± 5%</span>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 text-[10px]">ESD ELECTROSTATIC POTENTIAL</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">&lt; 15 Volts</div>
              <span className="text-[10px] text-emerald-400">Zero Discharge Zone</span>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Capacitive Touch Matrix Simulator */}
        <div className="mb-16">
          <TouchMatrixInteractive />
        </div>
      </div>
    </section>
  );
}
