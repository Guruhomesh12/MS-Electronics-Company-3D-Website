"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { ChevronDown, Sparkles } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "01 // HERO ARCHITECTURE" },
  { id: "bento", label: "02 // BENTO SHOWCASE" },
  { id: "warp", label: "03 // 3D WARP TIMELINE" },
  { id: "stacking", label: "04 // STACKING CARDS" },
  { id: "process", label: "05 // 3D ROBOTIC WORKCELL" },
  { id: "industries", label: "06 // 3D ORBITAL HOLOSPHERE" },
  { id: "configurator", label: "07 // 3D CONFIGURATOR" },
  { id: "capabilities", label: "08 // OPTICAL BONDING" },
  { id: "quality", label: "09 // QUALITY & TOUCH SIM" },
  { id: "why-us", label: "10 // HEADQUARTERS" },
];

export function SectionNavigator() {
  const [activeSection, setActiveSection] = React.useState("hero");
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playCyberClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getNextSection = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    return SECTIONS[(currentIndex + 1) % SECTIONS.length];
  };

  return (
    <>
      {/* Right Side HUD Navigation Rail */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end space-y-3 pointer-events-auto select-none">
        <div className="text-[9px] font-mono font-bold text-cyan-300 tracking-widest uppercase mb-1 flex items-center gap-1.5 bg-[#091328]/80 px-2 py-0.5 rounded border border-cyan-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span>{Math.round(scrollProgress)}% EXPLORED</span>
        </div>

        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center space-x-3 cursor-pointer py-1"
            >
              <span
                className={`text-[10px] font-mono transition-all opacity-0 group-hover:opacity-100 uppercase tracking-widest px-2.5 py-1 rounded bg-[#0b1730]/90 border border-cyan-400/40 shadow-lg ${
                  isActive ? "text-cyan-300 font-bold opacity-100" : "text-slate-300"
                }`}
              >
                {sec.label}
              </span>

              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-3 h-8 bg-gradient-to-b from-cyan-400 to-indigo-500 shadow-[0_0_15px_#00f0ff]"
                    : "w-2.5 h-2.5 bg-slate-500/50 group-hover:bg-cyan-300 group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Floating "Explore Next 3D Feature" Bottom Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button
          onClick={() => scrollTo(getNextSection().id)}
          className="flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-[#0a1632]/90 hover:bg-[#12244c] border border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.4)] text-white text-xs font-mono font-bold tracking-wider backdrop-blur-xl transition-all hover:scale-105 active:scale-95 group"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
          <span>SLIDE TO NEXT: {getNextSection().label.split("//")[1]?.trim()}</span>
          <ChevronDown className="w-4 h-4 text-cyan-300 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </>
  );
}
