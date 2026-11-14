"use client";

import * as React from "react";
import { TouchPanel3D } from "@/components/3d/TouchPanel3D";
import { sound } from "@/lib/sound";
import { ArrowRight, Sliders, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Slide From Top */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto space-y-6 mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-[#0c1836]/90 border border-cyan-400/50 rounded-full px-5 py-2 shadow-[0_0_25px_rgba(0,240,255,0.25)]">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono font-bold text-cyan-300 tracking-widest uppercase">
              MS ELECTRONICS COMPANY // 3D OPTICAL BONDING ARCHITECTURE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            Engineering Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-accent drop-shadow-[0_0_35px_rgba(0,240,255,0.6)]">
              Into Every Micron.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
            World-class manufacturer of custom multi-layer capacitive touch panels, LOCA optical bonding, and ruggedized display systems for Avionics, Medical, Military, and Industrial OEMs.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="#configurator"
              onClick={() => sound.playCyberClick()}
              className="px-8 py-3.5 rounded-2xl bg-accent hover:bg-accent/90 text-white font-mono text-sm font-black tracking-wider shadow-[0_0_30px_rgba(255,32,78,0.6)] transition-all flex items-center gap-2 hover:scale-105 border border-white/20"
            >
              <Sliders className="w-4 h-4 text-white" />
              <span>LAUNCH 3D CONFIGURATOR</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => sound.playCyberClick()}
              className="px-8 py-3.5 rounded-2xl bg-[#0e1c3b]/90 hover:bg-[#162a56] border border-cyan-400/40 text-cyan-200 font-mono text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center gap-2 hover:border-cyan-300 hover:scale-105"
            >
              <span>CONTACT MS ELECTRONICS COMPANY</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </motion.div>

        {/* 3D Touch Panel Assembly - Slide Up with Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="max-w-6xl mx-auto mb-16"
        >
          <TouchPanel3D />
        </motion.div>

        {/* Live Metrics Grid with Alternating Staggered Slides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {[
            { value: "±0.01mm", label: "Dynamic CNC Dispensing", sub: "Micron-level Z compensation" },
            { value: "99.8%", label: "Optical Clarity", sub: "LOCA zero air-gap transmission" },
            { value: "10M+", label: "Touch Durability", sub: "Heavy glove & water rejection" },
            { value: "100%", label: "Automated Inspection", sub: "Telecentric AOI machine vision" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-2xl glass-card border border-cyan-400/30 text-center group hover:border-cyan-300 hover:scale-105 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                {stat.value}
              </div>
              <div className="text-xs font-black text-white mt-2 uppercase tracking-wider">{stat.label}</div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
