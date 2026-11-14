"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { Play, Pause, SkipForward, SkipBack, Sparkles, Volume2, Compass, Layers } from "lucide-react";

const STATIONS = [
  { id: "hero", title: "01. 3D TOUCH PANEL DISASSEMBLY", subtitle: "6-Layer Physical Exploded View & Capacitive Testing", duration: 8 },
  { id: "products", title: "02. HOLOGRAPHIC PRODUCT MATRIX", subtitle: "Projected Capacitive, Industrial HMIs & Avionics", duration: 7 },
  { id: "process", title: "03. 3D CNC ROBOTIC WORKCELL", subtitle: "0.01mm Precision Liquid Dispensing & UV Laser Curing", duration: 9 },
  { id: "industries", title: "04. 3D ORBITAL HOLOSPHERE", subtitle: "Global Mission-Critical Aerospace, Defense & Medical", duration: 8 },
  { id: "configurator", title: "05. 3D CUSTOM HARDWARE ARCHITECT", subtitle: "Interactive Size, Glass & Optical Bonding Configurator", duration: 8 },
  { id: "capabilities", title: "06. OPTICAL BONDING PHYSICS", subtitle: "Zero Air-Gap Glare Comparison Simulation", duration: 7 },
  { id: "quality", title: "07. CLEANROOM METROLOGY & TOUCH SIM", subtitle: "ISO Class 6 Particle Counter & Capacitive Matrix", duration: 7 },
  { id: "why-us", title: "08. MS ELECTRONICS COMPANY HQ", subtitle: "Bibinagar Cleanroom Facility & Global Standards", duration: 7 },
];

export function CinematicTour() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(8);

  const currentStation = STATIONS[currentIndex];

  const goToStation = (index: number) => {
    sound.playExplodeLayers();
    setCurrentIndex(index);
    setTimeLeft(STATIONS[index].duration);

    const el = document.getElementById(STATIONS[index].id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNext = () => {
    goToStation((currentIndex + 1) % STATIONS.length);
  };

  const handlePrev = () => {
    goToStation((currentIndex - 1 + STATIONS.length) % STATIONS.length);
  };

  const toggleTour = () => {
    sound.playCyberClick();
    if (!isPlaying) {
      setIsPlaying(true);
      goToStation(currentIndex);
    } else {
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return STATIONS[(currentIndex + 1) % STATIONS.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  return (
    <>
      {/* Top Banner Tour Trigger Button */}
      <div className="fixed top-20 right-6 z-40 hidden sm:block pointer-events-auto">
        <button
          onClick={toggleTour}
          className={`flex items-center space-x-2.5 px-5 py-2.5 rounded-2xl font-mono text-xs font-black tracking-wider shadow-2xl transition-all duration-300 border ${
            isPlaying
              ? "bg-accent text-white border-white/40 shadow-[0_0_30px_rgba(255,32,78,0.7)] animate-pulse"
              : "bg-[#0c1836]/90 hover:bg-[#142654] text-cyan-300 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 text-white" />
              <span>PAUSE 3D CINEMATIC TOUR</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-accent fill-accent" />
              <span>🎬 START 3D CINEMATIC TOUR</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Cinematic HUD Presenter Box during Tour */}
      {isPlaying && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-auto select-none animate-fadeIn">
          <div className="bg-[#081229]/95 border-2 border-cyan-400 rounded-3xl p-5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.4)]">
            <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="text-[11px] font-mono text-cyan-300 font-black tracking-wider uppercase">
                  CINEMATIC 3D WALKTHROUGH // STATION {currentIndex + 1} OF {STATIONS.length}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white bg-accent px-2 py-0.5 rounded font-bold">
                NEXT IN: {timeLeft}s
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-white">{currentStation.title}</h4>
              <p className="text-xs text-slate-300 font-sans">{currentStation.subtitle}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10 text-xs font-mono">
              <button
                onClick={handlePrev}
                className="flex items-center space-x-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-white/5"
              >
                <SkipBack className="w-3.5 h-3.5" />
                <span>PREV</span>
              </button>

              <div className="flex space-x-1.5">
                {STATIONS.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => goToStation(i)}
                    className={`w-5 h-1.5 rounded-full cursor-pointer transition-all ${
                      i === currentIndex ? "bg-cyan-400 w-8 shadow-[0_0_8px_#00f0ff]" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center space-x-1 text-cyan-300 hover:text-white px-2 py-1 rounded bg-white/5 font-bold"
              >
                <span>NEXT</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

