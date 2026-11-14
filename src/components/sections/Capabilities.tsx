"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import {
  Layers,
  Sun,
  Maximize,
  Shield,
  Lightbulb,
  Wrench,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Layers,
    title: "LOCA / OCR Optical Bonding",
    subtitle: "Zero Air-Gap High Transmission",
    desc: "Eliminates internal surface reflection between the LCD and cover glass. Drastically improves contrast ratio and impact resistance while preventing internal fogging.",
    specs: "Tolerance: ±0.01mm | Transmittance: 99.8% | Haze: < 0.2%",
  },
  {
    icon: Sun,
    title: "Custom High-Brightness Backlighting",
    subtitle: "Sunlight Readable Up To 2500 Nits",
    desc: "Engineering custom quantum-dot and high-efficiency LED rail systems for marine chartplotters, avionics HUDs, and outdoor direct sunlight readability.",
    specs: "Luminance: 1,500 - 2,500 Nits | MTBF: 70,000h | 0-100% PWM Dimming",
  },
  {
    icon: Maximize,
    title: "Advanced Capacitive Firmware Tuning",
    subtitle: "Glove, Water, and Thick Glass Support",
    desc: "Custom sensitivity profiling for projective capacitive controllers to allow seamless operation through 5mm heavy leather gloves, salt water splashes, and 10mm thick vandal glass.",
    specs: "Channels: Up to 4096 | Report Rate: >120Hz | Moisture Immunity: Active",
  },
  {
    icon: Shield,
    title: "EMI / RFI Military Mesh Shielding",
    subtitle: "MIL-STD-461 & Tempest Compliance",
    desc: "Integrating fine-pitch blackened copper mesh and ITO shielding layers into the display stack to block electromagnetic interference in defense and aerospace systems.",
    specs: "Attenuation: >45dB @ 1GHz | Surface Resistance: < 10 Ω/sq | Transparency: > 85%",
  },
  {
    icon: Lightbulb,
    title: "Nanoscale Optical Surface Coatings",
    subtitle: "AG / AR / AF / Antimicrobial",
    desc: "Chemical etching and vacuum sputtering coatings to eliminate specular glare (AG), minimize reflection below 0.5% (AR), and repel skin oils and bacteria (AF/Ag+).",
    specs: "Reflection: < 0.5% @ 550nm | Contact Angle: > 115° | Hardness: 9H",
  },
  {
    icon: Wrench,
    title: "Cleanroom Class 1,000 Assembly",
    subtitle: "Zero Particle Contamination Guarantee",
    desc: "Our 1,000 sq. ft. cleanroom facility with laminar flow HEPA filtration ensures 100% particulate-free lamination, dispensing, and automated optical inspection.",
    specs: "Particle Count: ISO Class 6 | Static Dissipation: < 50V | Humidity: 45% ± 5%",
  },
];

export function Capabilities() {
  const [sliderPos, setSliderPos] = React.useState(50); // Optical bonding visual comparison slider

  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-[#03050d]">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              Engineering Capabilities
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Display Engineering</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            We don't merely supply components; we architect bespoke optical solutions. Our in-house cleanroom modifies, enhances, and ruggedizes displays for extreme environments.
          </p>
        </div>

        {/* 6 Capabilities Cyber Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => sound.playBeep(600 + i * 50, 0.02)}
                className="group relative rounded-3xl p-8 bg-gradient-to-b from-[#090e1c] to-[#050711] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 text-cyan-400 group-hover:text-accent group-hover:border-accent/40 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">0{i + 1} // ENG</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs font-mono text-accent mt-0.5 mb-3">{cap.subtitle}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{cap.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[10px] font-mono text-cyan-400 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20">
                  {cap.specs}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Optical Bonding Comparison Simulator */}
        <div className="bg-[#070b16] border border-cyan-500/20 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              OPTICAL SIMULATION: AIR GAP VS. LOCA OPTICALLY BONDED
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              See the Optical Bonding Difference
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Drag the interactive slider to compare standard non-bonded display washout against MS Electronics optically bonded sunlight clarity.
            </p>
          </div>

          {/* Before / After Interactive Split Canvas */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-cyan-500/40 select-none shadow-2xl">
            {/* Right side: Optically Bonded (Clear & Vibrant) */}
            <div className="absolute inset-0 bg-[#061020] flex items-center justify-center p-8">
              <div className="w-full max-w-lg bg-black/90 p-6 rounded-2xl border border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.3)] text-center space-y-3">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400 text-xs font-mono font-bold rounded-full">
                  OPTICALLY BONDED (LOCA)
                </span>
                <div className="text-3xl md:text-5xl font-black text-white tracking-wider">
                  HIGH CONTRAST & ZERO REFLECTION
                </div>
                <p className="text-sm font-mono text-emerald-400">
                  Transmittance: 99.8% | Daylight Readable | 0% Internal Fogging
                </p>
              </div>
            </div>

            {/* Left side: Non-Bonded (Washed out with glare) */}
            <div
              className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center p-8 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="w-full max-w-lg bg-gray-400/80 p-6 rounded-2xl border border-gray-300 shadow-inner text-center space-y-3 opacity-60">
                <span className="px-3 py-1 bg-red-500/20 text-red-700 border border-red-500 text-xs font-mono font-bold rounded-full">
                  STANDARD AIR-GAP
                </span>
                <div className="text-3xl md:text-5xl font-black text-gray-800 tracking-wider">
                  SEVERE GLARE & WASHOUT
                </div>
                <p className="text-sm font-mono text-red-800">
                  Transmittance: 84.0% | Heavy Air-Gap Reflection | Vulnerable to Fog
                </p>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize z-20 shadow-[0_0_20px_#e61919]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-lg">
                ⇄
              </div>
            </div>

            {/* Transparent Slider Input Over the Container */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPos}
              onChange={(e) => {
                setSliderPos(parseFloat(e.target.value));
                sound.playBeep(500 + parseFloat(e.target.value) * 5, 0.015);
              }}
              className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-gray-400 mt-4">
            <span className="text-red-400">◄ STANDARD AIR-GAP (WASHED OUT)</span>
            <span>DRAG SLIDER TO REVEAL OPTICAL PURITY</span>
            <span className="text-cyan-400">MS OPTICAL BONDING (99.8% CLARITY) ►</span>
          </div>
        </div>
      </div>
    </section>
  );
}
