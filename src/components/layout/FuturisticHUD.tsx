"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Activity, Compass, Cpu, Shield } from "lucide-react";

export function FuturisticHUD() {
  const [muted, setMuted] = React.useState(false);
  const [timeStr, setTimeStr] = React.useState("");
  const [fps, setFps] = React.useState(60);

  React.useEffect(() => {
    setMuted(sound.getMuted());

    const updateClock = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString("en-GB", { hour12: false }) + "." + String(Math.floor(d.getMilliseconds() / 100)));
    };
    updateClock();
    const timer = setInterval(updateClock, 100);

    let frames = 0;
    let lastTime = performance.now();
    const countFps = () => {
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frames * 1000) / (now - lastTime))));
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(countFps);
    };
    const req = requestAnimationFrame(countFps);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(req);
    };
  }, []);

  const handleToggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none select-none text-[11px] tracking-widest uppercase font-mono">
      {/* Top Telemetry Strip - High Visibility & Luminous Contrast */}
      <div className="bg-[#0b152d]/95 backdrop-blur-md border-b border-cyan-400/40 px-4 py-2 flex items-center justify-between text-cyan-300 shadow-[0_4px_25px_rgba(0,240,255,0.15)]">
        {/* Left Telemetry */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-white tracking-wider">MS ELECTRONICS COMPANY</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1.5 text-cyan-200">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>GEO: 17.4752° N, 78.8062° E (BIBINAGAR)</span>
          </div>

          <div className="hidden md:flex items-center space-x-1.5 text-white">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span>CLEANROOM: CLASS 1,000 / 0.01mm CNC</span>
          </div>
        </div>

        {/* Center Live Coordinates */}
        <div className="hidden xl:flex items-center space-x-2 text-white">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>OPTICAL MATRIX ACTIVE</span>
          <span className="text-cyan-300 font-bold">[{timeStr || "00:00:00.0"}]</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <div className="hidden sm:flex items-center space-x-1.5 text-cyan-300 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>{fps} FPS</span>
          </div>

          {/* Sound FX Toggle Button */}
          <button
            onClick={handleToggleSound}
            title={muted ? "Enable Sci-Fi Audio FX" : "Mute Sci-Fi Audio FX"}
            className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 hover:border-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] active:scale-95 cursor-pointer"
          >
            {muted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] text-red-400 font-bold">SFX OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-bold">SFX ON</span>
                <span className="flex space-x-0.5 items-end h-3">
                  <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse"></span>
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-75"></span>
                  <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-150"></span>
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
