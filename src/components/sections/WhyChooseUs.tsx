"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { CheckCircle2, ShieldCheck, Factory, Users, Cpu, Award, Zap, Compass, ExternalLink } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: Users,
    title: "Global Engineering & Rapid Prototyping",
    desc: "Our dedicated engineering team collaborates directly with OEM hardware architects to deliver working prototypes within 10 to 14 business days.",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015 & Cleanroom Operations",
    desc: "1,000 sq. ft. Class 1,000 and Class 10,000 cleanroom environments governed by strict automated optical inspection (AOI) protocols.",
  },
  {
    icon: Factory,
    title: "End-to-End Vertical Manufacturing",
    desc: "From custom CNC glass milling and chemical tempering to automated LOCA dispensing, UV curing, and FPC bonding all under one roof.",
  },
  {
    icon: Cpu,
    title: "Custom Firmware & Controller Tuning",
    desc: "Precision firmware programming for ILITEK, EETI, and Microchip controllers to guarantee water, fluid, and heavy glove rejection.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(255,32,78,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
                <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                  Why MS Electronics Company
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Uncompromising Quality. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(255,32,78,0.3)]">
                  Global OEM Standards.
                </span>
              </h2>

              <p className="text-slate-200 text-base md:text-lg leading-relaxed font-normal">
                We partner with tier-1 OEMs across aerospace, medical, defense, and industrial automation to engineer mission-critical touch and display solutions that operate without fail.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="space-y-4">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => sound.playBeep(750, 0.02)}
                    className="p-5 rounded-2xl glass-card border border-cyan-400/25 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all flex items-start gap-4"
                  >
                    <div className="p-3 rounded-2xl bg-accent/20 border border-accent/40 text-accent shrink-0 mt-0.5 shadow-[0_0_12px_rgba(255,32,78,0.3)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{pillar.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Holographic Facility Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-cyan-400/40 p-8 space-y-6 shadow-[0_0_60px_rgba(0,240,255,0.2)]">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                    MS ELECTRONICS COMPANY HEADQUARTERS
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-400/40 font-bold">
                  1000 SQ. FT. CLEANROOM
                </span>
              </div>

              {/* Facility Details with Updated Address */}
              <div className="space-y-4 text-xs font-mono text-slate-200">
                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">Official Plant Address:</span>
                    <span className="text-slate-100">Bibinagar Road, Bibinagar, Yadadri Bhuvanagiri, Telangana 508126, India</span>
                    <a
                      href="https://maps.app.goo.gl/vgnRpj4gHhdzW9R57"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-300 hover:text-white mt-1 underline"
                    >
                      <span>View Location on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">Specialized Production Lines:</span>
                    <span className="text-slate-300">Automated Optical Bonding (LOCA/OCR), Laser Micro-Dispensing, Class 10k/1k Cleanrooms, Environmental Thermal Chambers</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">Certifications & Standards:</span>
                    <span className="text-slate-300">ISO 9001:2015, ISO 13485 Medical Readiness, MIL-STD-810H & DO-160G Qualification</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-300 font-mono">
                  <span>PHONE: </span>
                  <span className="text-white font-black">+91 9246288140</span>
                </div>
                <Link
                  href="/contact"
                  onClick={() => sound.playCyberClick()}
                  className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,32,78,0.5)] border border-white/20"
                >
                  SCHEDULE FACILITY VISIT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
