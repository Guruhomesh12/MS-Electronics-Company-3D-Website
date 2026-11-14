"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import { Zap, Hand, Droplets, Waves, Check, Activity } from "lucide-react";

export function TouchMatrixInteractive() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [activePoints, setActivePoints] = React.useState<{ x: number; y: number; id: number }[]>([]);
  const [mode, setMode] = React.useState<"normal" | "glove" | "water">("normal");
  const [signalLevel, setSignalLevel] = React.useState(98);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sound.playCapacitivePulse();

    const newPt = { x, y, id: Math.floor(Math.random() * 900) + 100 };
    setActivePoints((prev) => [...prev, newPt]);
    setSignalLevel(Math.floor(95 + Math.random() * 5));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setActivePoints((prev) => {
      if (prev.length === 0) return [{ x, y, id: 101 }];
      const last = prev[prev.length - 1];
      return [...prev.slice(-4), { x, y, id: last.id }];
    });
  };

  const handlePointerUp = () => {
    setTimeout(() => {
      setActivePoints([]);
    }, 1200);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let reqId: number;
    let t = 0;

    const render = () => {
      reqId = requestAnimationFrame(render);
      t += 0.05;

      const w = canvas.width;
      const h = canvas.height;

      // Dark futuristic background
      ctx.fillStyle = "#040711";
      ctx.fillRect(0, 0, w, h);

      // Diamond ITO Sensor Matrix Traces
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Render Active Capacitive Touch Disturbance Ripples
      activePoints.forEach((pt) => {
        // Outer dissipation wave
        const radius = (t * 20) % 60;
        ctx.strokeStyle = mode === "water" ? "rgba(0, 180, 255, 0.4)" : "rgba(230, 25, 25, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Core capacitive heat spot
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 40);
        grad.addColorStop(0, mode === "glove" ? "rgba(0, 255, 180, 0.9)" : "rgba(230, 25, 25, 0.9)");
        grad.addColorStop(0.5, "rgba(0, 240, 255, 0.3)");
        grad.addColorStop(1, "rgba(0, 240, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 40, 0, Math.PI * 2);
        ctx.fill();

        // Readout
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px monospace";
        ctx.fillText(`ΔC: +${signalLevel}fF [X:${Math.round(pt.x)}, Y:${Math.round(pt.y)}]`, pt.x + 15, pt.y - 15);
      });

      // Simulated Water Drops in Water Mode
      if (mode === "water") {
        for (let i = 0; i < 5; i++) {
          const dropX = (i * 120 + 80) % w;
          const dropY = (i * 90 + 60) % h;
          ctx.strokeStyle = "rgba(0, 200, 255, 0.3)";
          ctx.beginPath();
          ctx.arc(dropX, dropY, 8 + Math.sin(t + i) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(reqId);
    };
  }, [activePoints, mode, signalLevel]);

  return (
    <div className="bg-[#070a14] border border-cyan-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-cyan-950 border border-cyan-500/30 rounded-full px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">
              INTERACTIVE CAPACITIVE TOUCH SIMULATOR
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">Projected Capacitive (PCAP) Signal Response</h3>
          <p className="text-gray-400 text-xs font-mono mt-1">
            Drag or tap the sensor field below to analyze real-time capacitance Delta-C and electrode sensitivity.
          </p>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => {
              setMode("normal");
              sound.playCyberClick();
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              mode === "normal"
                ? "bg-accent/20 border-accent text-white shadow-[0_0_12px_rgba(230,25,25,0.3)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>BARE FINGER</span>
          </button>

          <button
            onClick={() => {
              setMode("glove");
              sound.playCyberClick();
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              mode === "glove"
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>5mm HEAVY GLOVE</span>
          </button>

          <button
            onClick={() => {
              setMode("water");
              sound.playCyberClick();
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              mode === "water"
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>WATER REJECTION</span>
          </button>
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30">
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-[260px] md:h-[300px] cursor-crosshair touch-none"
        />

        {/* Real-time Telemetry HUD Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-cyan-300 flex items-center gap-3 pointer-events-none">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-accent" />
            SNR: 42dB
          </span>
          <span>REPORT RATE: 140Hz</span>
          <span>NOISE FLOOR: -64dBm</span>
          <span className="text-emerald-400">STATUS: ZERO FALSE TOUCH</span>
        </div>
      </div>
    </div>
  );
}

