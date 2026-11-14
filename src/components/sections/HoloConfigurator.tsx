"use client";

import * as React from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import {
  Sliders,
  CheckCircle2,
  Download,
  Send,
  Zap,
  Shield,
  Layers,
  Thermometer,
  Cpu,
  Monitor
} from "lucide-react";

const SIZES = [
  { label: "7.0\"", value: 7.0, aspect: 16 / 9, w: 2.8, h: 1.6, application: "Handheld / Avionics Sub-Panel" },
  { label: "10.4\"", value: 10.4, aspect: 4 / 3, w: 3.4, h: 2.55, application: "Medical Diagnostic / Marine Instrument" },
  { label: "15.6\"", value: 15.6, aspect: 16 / 9, w: 4.2, h: 2.4, application: "Industrial HMI / CNC Console" },
  { label: "21.5\"", value: 21.5, aspect: 16 / 9, w: 5.0, h: 2.8, application: "Surgical Station / Military Defense Console" },
];

const GLASS_TYPES = [
  { name: "Corning Gorilla Glass", grade: "9H Hardness", desc: "Supreme scratch resistance & optical clarity", factor: 1.2 },
  { name: "Dragontrail Pro", grade: "8.5H Hardness", desc: "High flexural strength & thin profile", factor: 1.1 },
  { name: "Chemically Strengthened", grade: "7H Hardness", desc: "Cost-effective high-impact resistance", factor: 1.0 },
  { name: "Antimicrobial AG+ Glass", grade: "Medical Grade", desc: "Silver ion infused anti-pathogen surface", factor: 1.3 },
];

const BONDING_TYPES = [
  { name: "LOCA Optical Bonding", desc: "0.01mm Liquid Optical Clear Resin, zero air gap, 99.8% clarity", index: "n=1.52" },
  { name: "OCA Dry Film", desc: "Optically clear adhesive sheet for flat geometries", index: "n=1.49" },
  { name: "Air Gap Cushion", desc: "Precision perimeter foam gasket for modular serviceable builds", index: "n=1.00" },
];

const TEMPERATURE_RANGES = [
  { name: "Military Grade", range: "-40°C to +85°C", desc: "Aerospace, defense & extreme outdoor applications" },
  { name: "Industrial Wide Temp", range: "-20°C to +70°C", desc: "Factory automation & outdoor EV kiosks" },
  { name: "Commercial Standard", range: "0°C to +50°C", desc: "Indoor medical & retail terminals" },
];

export function HoloConfigurator() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  // Configuration States
  const [selectedSize, setSelectedSize] = React.useState(SIZES[2]); // 15.6"
  const [glassThickness, setGlassThickness] = React.useState(2.0); // mm
  const [glassType, setGlassType] = React.useState(GLASS_TYPES[0]);
  const [bondingType, setBondingType] = React.useState(BONDING_TYPES[0]);
  const [tempRange, setTempRange] = React.useState(TEMPERATURE_RANGES[0]);
  const [quoteSubmitted, setQuoteSubmitted] = React.useState(false);

  // Three.js References
  const panelMeshRef = React.useRef<THREE.Mesh | null>(null);
  const glassMeshRef = React.useRef<THREE.Mesh | null>(null);

  // Generate Part Number
  const partNumber = `MSEC-${Math.round(selectedSize.value * 10)}-${bondingType.name.split(" ")[0].toUpperCase()}-${Math.round(glassThickness * 10)}MM-${tempRange.name.substring(0, 3).toUpperCase()}`;

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    const key = new THREE.DirectionalLight(0x00f0ff, 2.5);
    key.position.set(5, 5, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xe61919, 2.0);
    rim.position.set(-5, -3, 3);
    scene.add(rim);

    // Dynamic 3D Panel Group
    const group = new THREE.Group();
    scene.add(group);

    // Main Chassis
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x181a24, metalness: 0.8, roughness: 0.2 });
    const chassisMesh = new THREE.Mesh(new THREE.BoxGeometry(selectedSize.w, selectedSize.h, 0.2), chassisMat);
    group.add(chassisMesh);
    panelMeshRef.current = chassisMesh;

    // Glass Screen Front
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.05,
      metalness: 0.2,
      transmission: 0.9,
      ior: 1.5,
    });
    const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(selectedSize.w * 0.95, selectedSize.h * 0.95, glassThickness * 0.04), glassMat);
    glassMesh.position.z = 0.11;
    group.add(glassMesh);
    glassMeshRef.current = glassMesh;

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = Math.sin(elapsed * 0.8) * 0.35;
      group.rotation.x = Math.cos(elapsed * 0.6) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedSize, glassThickness]);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playExplodeLayers();
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 5000);
  };

  return (
    <section id="configurator" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#030610] via-[#050814] to-[#03050c]">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-semibold text-accent font-mono tracking-widest uppercase">
              3D Custom Hardware Architect
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            The Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Holo-Configurator</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Design your custom display assembly in real-time 3D. Configure dimensions, optical bonding chemistry, and ruggedization metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-8 bg-[#090d1a]/80 border border-cyan-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            {/* 1. Screen Size Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Monitor className="w-4 h-4 text-accent" />
                1. Select Display Diagonal Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz.label}
                    onClick={() => {
                      setSelectedSize(sz);
                      sound.playCyberClick();
                    }}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedSize.value === sz.value
                        ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)] scale-105"
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="text-base font-bold">{sz.label}</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-1">
                      {sz.aspect === 16 / 9 ? "16:9" : sz.aspect === 4 / 3 ? "4:3" : "16:10"}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 font-mono">Recommended for: {selectedSize.application}</p>
            </div>

            {/* 2. Cover Glass Thickness Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <label className="text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  2. Cover Glass Thickness: {glassThickness.toFixed(1)} mm
                </label>
                <span className="text-accent font-bold">
                  {glassThickness >= 3.0 ? "IK10 Vandal-Proof" : "Standard Ultra-Clear"}
                </span>
              </div>
              <input
                type="range"
                min="0.7"
                max="6.0"
                step="0.1"
                value={glassThickness}
                onChange={(e) => {
                  setGlassThickness(parseFloat(e.target.value));
                  sound.playBeep(400 + parseFloat(e.target.value) * 100, 0.03);
                }}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>0.7mm (Ultra-Slim)</span>
                <span>1.8mm (Standard)</span>
                <span>3.0mm (Rugged)</span>
                <span>6.0mm (Ballistic IK10)</span>
              </div>
            </div>

            {/* 3. Cover Glass Material */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                3. Substrate Hardness & Surface Treatment
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GLASS_TYPES.map((gt) => (
                  <button
                    key={gt.name}
                    onClick={() => {
                      setGlassType(gt);
                      sound.playCyberClick();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      glassType.name === gt.name
                        ? "bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(230,25,25,0.2)]"
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>{gt.name}</span>
                      <span className="text-[10px] text-accent font-mono">{gt.grade}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">{gt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Optical Bonding Technology */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                4. Optical Bonding Integration Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BONDING_TYPES.map((bt) => (
                  <button
                    key={bt.name}
                    onClick={() => {
                      setBondingType(bt);
                      sound.playCyberClick();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      bondingType.name === bt.name
                        ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{bt.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{bt.index}</div>
                    <div className="text-[10px] text-gray-400 mt-1 line-clamp-2">{bt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Temperature Qualification */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-accent" />
                5. Environmental Temperature Envelope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TEMPERATURE_RANGES.map((tr) => (
                  <button
                    key={tr.name}
                    onClick={() => {
                      setTempRange(tr);
                      sound.playCyberClick();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tempRange.name === tr.name
                        ? "bg-red-500/20 border-red-500 text-white shadow-[0_0_15px_rgba(230,25,25,0.2)]"
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{tr.name}</div>
                    <div className="text-xs text-accent font-mono font-bold mt-0.5">{tr.range}</div>
                    <div className="text-[10px] text-gray-400 mt-1">{tr.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Real-time Visualization & Quotation Card (Right) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 3D Canvas Box */}
            <div className="bg-[#090d1a]/80 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  LIVE 3D SCALE PREVIEW
                </span>
                <span className="text-xs font-mono text-gray-400">{selectedSize.label} DIAGONAL</span>
              </div>

              {/* Three.js viewport */}
              <div ref={mountRef} className="w-full h-[280px] cursor-grab" />

              {/* Live Spec Breakdown Table */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-500">PART ARCHITECTURE:</span>
                  <span className="text-accent font-bold">{partNumber}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-500">OPTICAL BONDING:</span>
                  <span className="text-cyan-400">{bondingType.name}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-500">COVER GLASS:</span>
                  <span>{glassType.name} ({glassThickness.toFixed(1)}mm)</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-500">OPERATING ENVELOPE:</span>
                  <span className="text-emerald-400">{tempRange.range}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-500">PROTOTYPING LEAD TIME:</span>
                  <span className="text-white font-bold">10 - 14 Days</span>
                </div>
              </div>
            </div>

            {/* Instant Quotation Dispatch Form */}
            <div className="bg-gradient-to-br from-accent/20 via-black/80 to-cyan-950/40 border border-accent/40 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Request Engineering Proposal</h3>
              <p className="text-xs text-slate-200 mb-4">
                Submit this custom configuration directly to MS Electronics Company cleanroom engineering team for CAD drawings & quotation.
              </p>

              {quoteSubmitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-300 p-4 rounded-xl text-center text-sm font-mono flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Proposal Request Logged! Engineer will contact within 4 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name / OEM Company"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Engineering Email Address"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Number (Optional)"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(230,25,25,0.4)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>GENERATE FORMAL CAD & QUOTE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

