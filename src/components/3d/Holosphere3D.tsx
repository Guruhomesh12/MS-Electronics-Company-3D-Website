"use client";

import * as React from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import { Plane, Shield, Activity, Cpu, Anchor, Zap, ChevronRight, ExternalLink } from "lucide-react";

const SECTORS = [
  {
    id: "avionics",
    title: "Avionics & Aerospace",
    icon: Plane,
    tagline: "High-Altitude Sunlight-Readable Cockpit Displays",
    details:
      "Engineered to withstand rapid cabin depressurization, extreme G-forces, and sub-zero temperatures. Features night vision goggle (NVG) optical filters and 2000+ Nit optical bonding.",
    specs: ["DO-160G Compliant", "NVG Class A/B Filters", "1500+ Nits Brightness", "Low-Birefringence Glass"],
    phi: 0.5,
    theta: 0.8,
  },
  {
    id: "defense",
    title: "Military & Defense",
    icon: Shield,
    tagline: "MIL-STD-810H Ruggedized Tactical Interface Panels",
    details:
      "Ballistic tempered cover glass with embedded ITO EMI/RFI shielding mesh. Resistant to severe vibration, salt fog, high-humidity, and battlefield conditions.",
    specs: ["MIL-STD-810H Certified", "EMI/RFI Copper Mesh", "IK10 Impact Rating", "Temp: -40°C to +85°C"],
    phi: 1.8,
    theta: 2.2,
  },
  {
    id: "medical",
    title: "Medical & Healthcare",
    icon: Activity,
    tagline: "Antimicrobial & Glove-Compatible Surgical Displays",
    details:
      "Optically bonded diagnostic displays certified for sterile operating rooms. Flawless capacitive touch response when operated with latex/nitrile gloves and in presence of fluids.",
    specs: ["ISO 13485 Cleanroom Spec", "Antimicrobial Ag+ Coating", "Fluid & Gel Rejection", "True Color Calibrated"],
    phi: 2.5,
    theta: 0.4,
  },
  {
    id: "industrial",
    title: "Industrial & Robotics",
    icon: Cpu,
    tagline: "Heavy-Duty Human Machine Interfaces (HMI)",
    details:
      "Engineered for CNC machines, robotic production lines, and oil & gas facilities. Impervious to chemical splashes, lubricants, particulate contamination, and electrical noise.",
    specs: ["IP68 / NEMA 4X Sealed", "High Noise Immunity", "10M+ Touch Actuations", "Continuous 24/7 Duty"],
    phi: 0.8,
    theta: 3.8,
  },
  {
    id: "marine",
    title: "Marine & Maritime",
    icon: Anchor,
    tagline: "ECDIS Compliant Waterproof Ocean Displays",
    details:
      "Zero air-gap LOCA optical bonding eliminates internal condensation and fogging in maritime environments. Polarized sunglasses readable with anti-reflective AR treatments.",
    specs: ["IEC 60945 Marine Grade", "Salt Mist Corrosion Proof", "Anti-Reflective AR < 0.5%", "Polarizer Compatible"],
    phi: 2.1,
    theta: 4.8,
  },
  {
    id: "automotive",
    title: "Automotive & EV",
    icon: Zap,
    tagline: "Curved Cockpits & Vandal-Proof EV Terminals",
    details:
      "Wide-aspect multi-touch consoles for electric vehicles and high-traffic outdoor EV charging stations. UV-resistant cover glass with thermal expansion compensation.",
    specs: ["AEC-Q100 Standards", "3D Curved Glass Molding", "IK10 Anti-Vandal Front", "Head-Up Display Ready"],
    phi: 1.2,
    theta: 5.5,
  },
];

export function Holosphere3D() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [activeSector, setActiveSector] = React.useState(SECTORS[0]);
  const [hoveredSector, setHoveredSector] = React.useState<string | null>(null);

  // Three.js target rotation
  const targetRotationRef = React.useRef({ x: 0, y: 0 });
  const currentRotationRef = React.useRef({ x: 0, y: 0 });

  const handleSelectSector = (sec: (typeof SECTORS)[0]) => {
    setActiveSector(sec);
    sound.playCyberClick();
    // Rotate holosphere to face sector beacon
    targetRotationRef.current.x = sec.phi - Math.PI / 2;
    targetRotationRef.current.y = -sec.theta + Math.PI / 2;
  };

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. HOLOSPHERE CENTRAL GROUP
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Wireframe Sphere
    const sphereGeo = new THREE.SphereGeometry(2.4, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(1.8, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xe61919,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Outer Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    globeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.3, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xe61919, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    globeGroup.add(ring2);

    // 3. BEACONS FOR SECTORS
    const radius = 2.4;
    const beacons: { mesh: THREE.Group; sector: (typeof SECTORS)[0] }[] = [];

    SECTORS.forEach((sec) => {
      const bGroup = new THREE.Group();

      const x = radius * Math.sin(sec.phi) * Math.cos(sec.theta);
      const y = radius * Math.cos(sec.phi);
      const z = radius * Math.sin(sec.phi) * Math.sin(sec.theta);

      bGroup.position.set(x, y, z);

      // Glowing beacon node
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      bGroup.add(nodeMesh);

      // Pulse ring around beacon
      const pRingGeo = new THREE.RingGeometry(0.18, 0.22, 24);
      const pRingMat = new THREE.MeshBasicMaterial({ color: 0xe61919, side: THREE.DoubleSide });
      const pRingMesh = new THREE.Mesh(pRingGeo, pRingMat);
      pRingMesh.lookAt(x * 2, y * 2, z * 2);
      bGroup.add(pRingMesh);

      globeGroup.add(bGroup);
      beacons.push({ mesh: bGroup, sector: sec });
    });

    // 4. ANIMATION LOOP
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth rotation toward active target + idle drift
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      globeGroup.rotation.x = currentRotationRef.current.x;
      globeGroup.rotation.y = currentRotationRef.current.y + elapsed * 0.04;

      // Animate rings
      ring1.rotation.z = elapsed * 0.2;
      ring2.rotation.x = elapsed * 0.15;

      // Pulse beacons
      beacons.forEach((b) => {
        const isCurrent = b.sector.id === activeSector.id;
        const scale = isCurrent ? 1.5 + Math.sin(elapsed * 6) * 0.3 : 1.0;
        b.mesh.scale.setScalar(scale);
      });

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
  }, [activeSector]);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#090d18] to-[#04060c] border border-cyan-500/20 shadow-[0_0_40px_rgba(0,240,255,0.08)] overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 rounded-full px-3 py-1 mb-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
            GLOBAL INDUSTRY BEACONS
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          3D Orbital <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Holosphere</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
          Explore custom display solutions engineered for the most mission-critical sectors worldwide.
        </p>
      </div>

      {/* Main Grid: 3D Globe + Sector Telemetry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* 3D Holosphere Viewport */}
        <div className="lg:col-span-6 h-[400px] md:h-[520px] relative flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full cursor-grab" />

          {/* Coordinate HUD */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 font-mono text-xs text-gray-300 pointer-events-none">
            <div className="text-cyan-400 font-bold">ORBITAL MATRIX</div>
            <div>SECTOR: <span className="text-accent uppercase font-bold">{activeSector.id}</span></div>
            <div>STATUS: <span className="text-emerald-400">GEO-SYNCHRONOUS</span></div>
          </div>
        </div>

        {/* Sector Details & Specs Card */}
        <div className="lg:col-span-6 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#050811]/90 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Sector Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SECTORS.map((sec) => {
                const Icon = sec.icon;
                const isSelected = activeSector.id === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelectSector(sec)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(230,25,25,0.3)] scale-[1.03]"
                        : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-accent" : "text-gray-400"}`} />
                    <span className="text-xs font-bold truncate">{sec.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Sector Deep Dive */}
            <div className="bg-black/60 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-accent/20 text-accent border border-accent/30">
                  <activeSector.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeSector.title}</h3>
                  <p className="text-xs font-mono text-cyan-400">{activeSector.tagline}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mt-4">
                {activeSector.details}
              </p>

              {/* Engineering Specs Matrix */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                  COMPLIANCE & ENGINEERING CRITERIA:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {activeSector.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 mt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-300">
              CUSTOM ENGINEERING AT MS ELECTRONICS COMPANY FOR {activeSector.title.toUpperCase()}
            </span>
            <a
              href="/contact"
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(230,25,25,0.4)] transition-all"
            >
              <span>DISCUSS PROJECT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

