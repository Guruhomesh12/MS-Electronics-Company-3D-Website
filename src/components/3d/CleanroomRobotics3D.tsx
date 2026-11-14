"use client";

import * as React from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import { Play, Pause, RotateCcw, CheckCircle2, ChevronRight, Activity, Cpu } from "lucide-react";

const STAGES = [
  {
    id: "01",
    title: "CAD Architecture & Z-Topography Mapping",
    desc: "Laser profilometer measures incoming cover glass curvature and topography in real-time to generate a micro-adaptive Z-axis toolpath.",
    specs: "Resolution: 0.005mm | Mapping Points: 10,000+ | Pre-Scan Time: < 3.2s",
    camPos: [0, 4.5, 6],
  },
  {
    id: "02",
    title: "CNC Precision Micro-Dispensing (0.01mm)",
    desc: "3-axis servo gantry dispenses high-viscosity optical clear adhesive (LOCA) with continuous dynamic pressure regulation, eliminating air bubbles.",
    specs: "Accuracy: ±0.01mm | Flow Rate: 0.02 ml/s | Viscosity Range: 1,500 - 4,500 mPa·s",
    camPos: [-2, 3, 4],
  },
  {
    id: "03",
    title: "Dual UV & Thermal Photopolymerization",
    desc: "High-intensity 365nm UV LED arrays cure the perimeter dam instantly, followed by uniform thermal curing to reach 99.8% optical transmission.",
    specs: "Wavelength: 365nm / 395nm | Curing Energy: 3,500 mJ/cm² | Refractive Index: n=1.52",
    camPos: [2, 3.5, 4],
  },
  {
    id: "04",
    title: "100% Automated Optical Inspection (AOI)",
    desc: "High-speed telecentric machine vision cameras scan the bonded panel for micro-voids, dust, and birefringence patterns under polarized light.",
    specs: "Inspection Defect Limit: 0 microns | Camera: 29MP Telecentric | Inspection: 100%",
    camPos: [0, 5, 3],
  },
  {
    id: "05",
    title: "Thermal Stress & Durability Burn-In",
    desc: "Panels undergo thermal shock stress (-40°C to +85°C) and 95% relative humidity testing to guarantee long-term aerospace-grade reliability.",
    specs: "Temp Cycle: -40°C to +85°C | Duration: 500 Hours | Thermal Shock: < 10 sec transit",
    camPos: [3, 2.5, 5],
  },
  {
    id: "06",
    title: "Class 1,000 Cleanroom Packaging",
    desc: "Final assembly and anti-static ESD packaging inside our ISO-certified cleanroom facility prior to global logistics deployment.",
    specs: "Cleanroom: Class 1,000 / Class 10,000 | Static Control: < 50V | Global Shipping Ready",
    camPos: [0, 3, 6],
  },
];

export function CleanroomRobotics3D() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  // References
  const targetCamPosRef = React.useRef(new THREE.Vector3(0, 4.5, 6));
  const currentCamPosRef = React.useRef(new THREE.Vector3(0, 4.5, 6));

  const selectStep = (idx: number) => {
    setActiveStep(idx);
    sound.playScannerSweep();
    const pos = STAGES[idx].camPos;
    targetCamPosRef.current.set(pos[0], pos[1], pos[2]);
  };

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // 2. LIGHTING
    const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambLight);

    const cyanSpot = new THREE.SpotLight(0x00f0ff, 3, 20, Math.PI / 4, 0.3);
    cyanSpot.position.set(4, 7, 4);
    scene.add(cyanSpot);

    const redSpot = new THREE.SpotLight(0xe61919, 2, 20, Math.PI / 4, 0.3);
    redSpot.position.set(-4, 6, -3);
    scene.add(redSpot);

    // 3. CLEANROOM STAGING WORKBED
    const bedGeo = new THREE.BoxGeometry(6, 0.4, 4.5);
    const bedMat = new THREE.MeshStandardMaterial({
      color: 0x161822,
      metalness: 0.8,
      roughness: 0.2,
    });
    const bedMesh = new THREE.Mesh(bedGeo, bedMat);
    bedMesh.position.y = -0.2;
    scene.add(bedMesh);

    // Vacuum Chuck Stage (Glowing grid)
    const chuckGeo = new THREE.BoxGeometry(4.2, 0.05, 3.2);
    const chuckMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.4,
    });
    const chuckMesh = new THREE.Mesh(chuckGeo, chuckMat);
    chuckMesh.position.y = 0.03;
    bedMesh.add(chuckMesh);

    // Alignment Crosshairs
    const gridLines = new THREE.GridHelper(4, 20, 0x00f0ff, 0x003355);
    gridLines.position.y = 0.06;
    bedMesh.add(gridLines);

    // 4. GLASS SUBSTRATE BEING WORKED ON
    const glassGeo = new THREE.BoxGeometry(3.6, 0.05, 2.6);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xaaddff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.set(0, 0.1, 0);
    scene.add(glassMesh);

    // 5. CNC GANTRY & ROBOTIC TOOLHEAD
    const gantryGroup = new THREE.Group();
    scene.add(gantryGroup);

    // X-Axis Bridge Rail
    const railGeo = new THREE.BoxGeometry(5.6, 0.2, 0.3);
    const railMat = new THREE.MeshStandardMaterial({ color: 0x2a2d3d, metalness: 0.9, roughness: 0.2 });
    const railMesh = new THREE.Mesh(railGeo, railMat);
    railMesh.position.y = 2.2;
    gantryGroup.add(railMesh);

    // Z-Axis Vertical Column
    const zColGeo = new THREE.BoxGeometry(0.2, 1.2, 0.2);
    const zColMat = new THREE.MeshStandardMaterial({ color: 0x3b4252, metalness: 0.8 });
    const zColMesh = new THREE.Mesh(zColGeo, zColMat);
    zColMesh.position.y = 1.6;
    gantryGroup.add(zColMesh);

    // Dispensing Toolhead with Needle
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.9;
    gantryGroup.add(headGroup);

    // Fluid Syringe Cylinder
    const syringeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const syringeMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.5,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const syringeMesh = new THREE.Mesh(syringeGeo, syringeMat);
    headGroup.add(syringeMesh);

    // Dispenser Micro-Nozzle Tip
    const nozzleGeo = new THREE.ConeGeometry(0.04, 0.2, 16);
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const nozzleMesh = new THREE.Mesh(nozzleGeo, nozzleMat);
    nozzleMesh.rotation.x = Math.PI;
    nozzleMesh.position.y = -0.4;
    headGroup.add(nozzleMesh);

    // UV Curing Laser Emitter Bar
    const uvGeo = new THREE.BoxGeometry(0.3, 0.1, 0.2);
    const uvMat = new THREE.MeshStandardMaterial({ color: 0x5500aa, emissive: 0x8800ff, emissiveIntensity: 2 });
    const uvMesh = new THREE.Mesh(uvGeo, uvMat);
    uvMesh.position.set(0.3, -0.3, 0);
    headGroup.add(uvMesh);

    // UV Light Beam Fan (Cone)
    const uvBeamGeo = new THREE.ConeGeometry(0.3, 0.5, 16);
    const uvBeamMat = new THREE.MeshBasicMaterial({
      color: 0x9900ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const uvBeamMesh = new THREE.Mesh(uvBeamGeo, uvBeamMat);
    uvBeamMesh.position.set(0.3, -0.55, 0);
    headGroup.add(uvBeamMesh);

    // AOI Laser Scanning Plane
    const aoiScanGeo = new THREE.PlaneGeometry(1.2, 0.05);
    const aoiScanMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const aoiScanMesh = new THREE.Mesh(aoiScanGeo, aoiScanMat);
    aoiScanMesh.rotation.x = Math.PI / 2;
    aoiScanMesh.position.set(-0.3, -0.38, 0);
    headGroup.add(aoiScanMesh);

    // Glowing Dispensed Adhesive Trail
    const trailPoints: THREE.Vector3[] = [];
    const maxTrail = 80;
    const trailGeo = new THREE.BufferGeometry();
    const trailPos = new Float32Array(maxTrail * 3);
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
    const trailMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 3,
    });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    scene.add(trailLine);

    // 6. ANIMATION LOOP
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      currentCamPosRef.current.lerp(targetCamPosRef.current, 0.05);
      camera.position.copy(currentCamPosRef.current);
      camera.lookAt(0, 0.5, 0);

      // Toolhead trajectory along perimeter of glass
      if (isPlaying) {
        const speed = elapsed * 1.2;
        const w = 1.5;
        const h = 1.0;
        const t = speed % 4; // 4 sides

        let toolX = 0;
        let toolZ = 0;

        if (t < 1) {
          toolX = -w + (2 * w) * t;
          toolZ = -h;
        } else if (t < 2) {
          toolX = w;
          toolZ = -h + (2 * h) * (t - 1);
        } else if (t < 3) {
          toolX = w - (2 * w) * (t - 2);
          toolZ = h;
        } else {
          toolX = -w;
          toolZ = h - (2 * h) * (t - 3);
        }

        gantryGroup.position.x = toolX;
        gantryGroup.position.z = toolZ;

        // Animate UV pulse
        uvMesh.scale.y = 1 + Math.sin(elapsed * 10) * 0.1;
        uvBeamMesh.material.opacity = 0.25 + Math.sin(elapsed * 8) * 0.15;

        // Append to trail
        trailPoints.push(new THREE.Vector3(toolX, 0.14, toolZ));
        if (trailPoints.length > maxTrail) {
          trailPoints.shift();
        }

        const positions = trailGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < trailPoints.length; i++) {
          positions[i * 3] = trailPoints[i].x;
          positions[i * 3 + 1] = trailPoints[i].y;
          positions[i * 3 + 2] = trailPoints[i].z;
        }
        trailGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 500;
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
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#090d18] to-[#04060c] border border-cyan-500/20 shadow-[0_0_40px_rgba(0,240,255,0.08)] overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/10 bg-black/40 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 rounded-full px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
              3D CNC WORKCELL // 0.01mm PRECISION
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Process of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Micro-Precision</span>
          </h2>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span>{isPlaying ? "PAUSE GANTRY" : "RESUME GANTRY"}</span>
          </button>
          <button
            onClick={() => selectStep(0)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: 3D Robotic Scene + Interactive Stage Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* 3D Canvas Viewport */}
        <div className="lg:col-span-7 h-[420px] md:h-[520px] relative">
          <div ref={mountRef} className="w-full h-full" />

          {/* Real-time Telemetry Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 max-w-xs font-mono text-xs text-gray-300 pointer-events-none">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5 mb-1">
              <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>LIVE GANTRY METRICS</span>
            </div>
            <div>STATUS: <span className="text-emerald-400">ACTIVE SERVO DISPENSE</span></div>
            <div>TOLERANCE: <span className="text-accent font-bold">±0.01mm Z-COMP</span></div>
            <div>CLEANROOM: <span className="text-cyan-300">CLASS 1,000 ISO-6</span></div>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-gray-400">
            <span>AUTOMATED OPTICAL INSPECTION: 100% AOI ACTIVE</span>
          </div>
        </div>

        {/* Interactive Steps List */}
        <div className="lg:col-span-5 p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#050811]/90 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-between">
              <span>SELECT PHASE TO INSPECT (01 - 06)</span>
              <span className="text-gray-500">PHASE {activeStep + 1} OF 6</span>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => selectStep(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    activeStep === idx
                      ? "bg-cyan-950/60 border-cyan-400/80 shadow-[0_0_20px_rgba(0,240,255,0.15)] scale-[1.02]"
                      : "bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-black px-2 py-1 rounded ${
                      activeStep === idx ? "bg-accent text-white" : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {stage.id}
                  </span>

                  <div className="flex-1">
                    <h4
                      className={`text-sm font-bold ${
                        activeStep === idx ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {stage.title}
                    </h4>
                    {activeStep === idx && (
                      <div className="mt-2 text-xs text-gray-300 leading-relaxed font-sans animate-fadeIn">
                        {stage.desc}
                        <div className="mt-2 text-[10px] text-cyan-400 font-mono bg-cyan-950/40 p-1.5 rounded border border-cyan-500/20">
                          {stage.specs}
                        </div>
                      </div>
                    )}
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 mt-1 transition-transform ${
                      activeStep === idx ? "rotate-90 text-cyan-400" : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Cleanroom Quality Stamp */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              100% AOI INSPECTION
            </span>
            <span className="text-gray-400">ISO 9001:2015 CERTIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

