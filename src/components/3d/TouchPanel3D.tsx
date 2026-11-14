"use client";

import * as React from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import {
  Layers,
  Eye,
  Flame,
  ShieldAlert,
  RotateCcw,
  Zap,
  Info,
  Maximize2,
  Minimize2,
  Sliders
} from "lucide-react";

interface TouchPoint {
  x: number;
  y: number;
  id: number;
  time: number;
}

export function TouchPanel3D() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // UI Interactive States
  const [explosionAmount, setExplosionAmount] = React.useState(0); // 0 = assembled, 1 = fully exploded
  const [isXRay, setIsXRay] = React.useState(false);
  const [isThermal, setIsThermal] = React.useState(false);
  const [autoRotate, setAutoRotate] = React.useState(true);
  const [activeLayerInfo, setActiveLayerInfo] = React.useState<string | null>(null);
  const [touchPoints, setTouchPoints] = React.useState<TouchPoint[]>([]);
  const [impactTriggered, setImpactTriggered] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // References for Three.js objects
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const layersGroupRef = React.useRef<THREE.Group | null>(null);
  const displayTextureRef = React.useRef<THREE.CanvasTexture | null>(null);
  const displayCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const explosionProgressRef = React.useRef(0);
  const isDraggingRef = React.useRef(false);
  const previousMousePositionRef = React.useRef({ x: 0, y: 0 });
  const shockwaveRef = React.useRef({ active: false, radius: 0 });

  // Layer objects
  const layersListRef = React.useRef<
    {
      name: string;
      desc: string;
      mesh: THREE.Mesh | THREE.Group;
      baseZ: number;
      targetOffsetZ: number;
      specs: string;
    }[]
  >([]);

  // Sound triggers
  const handleExplosionChange = (val: number) => {
    setExplosionAmount(val);
    if (Math.abs(val - explosionProgressRef.current) > 0.2) {
      sound.playExplodeLayers();
    }
  };

  const handleToggleXRay = () => {
    setIsXRay((prev) => {
      const next = !prev;
      sound.playCyberClick();
      return next;
    });
  };

  const handleToggleThermal = () => {
    setIsThermal((prev) => {
      const next = !prev;
      sound.playScannerSweep();
      return next;
    });
  };

  const triggerImpactTest = () => {
    if (impactTriggered) return;
    setImpactTriggered(true);
    sound.playExplodeLayers();
    shockwaveRef.current = { active: true, radius: 0 };
    setTimeout(() => {
      setImpactTriggered(false);
    }, 2000);
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 8.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 2. LIGHTING - Luminous & Crystal Clear
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 3.2); // Bright Cyan key
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff204e, 2.6); // Radiant Crimson rim
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2.2, 18);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 3. DYNAMIC HUD CANVAS TEXTURE FOR LCD SCREEN
    const dispCanvas = document.createElement("canvas");
    dispCanvas.width = 1024;
    dispCanvas.height = 768;
    displayCanvasRef.current = dispCanvas;
    const dispCtx = dispCanvas.getContext("2d");

    const displayTexture = new THREE.CanvasTexture(dispCanvas);
    displayTexture.anisotropy = 8;
    displayTextureRef.current = displayTexture;

    // 4. CREATE 6 REAL-WORLD PHYSICAL LAYERS
    const rootGroup = new THREE.Group();
    layersGroupRef.current = rootGroup;
    scene.add(rootGroup);

    const panelW = 4.8;
    const panelH = 3.2;

    // LAYER 1: AG/AR/AF Cover Glass
    const glassGeo = new THREE.BoxGeometry(panelW, panelH, 0.08);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x99ddff,
      transparent: true,
      opacity: 0.5,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.52, // Gorilla Glass optical index
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.castShadow = true;

    // Glass Border / Bezel Graphic
    const bezelGeo = new THREE.PlaneGeometry(panelW, panelH);
    const bezelCanvas = document.createElement("canvas");
    bezelCanvas.width = 512;
    bezelCanvas.height = 384;
    const bCtx = bezelCanvas.getContext("2d");
    if (bCtx) {
      bCtx.fillStyle = "rgba(10, 10, 15, 0.96)";
      bCtx.fillRect(0, 0, 512, 384);
      bCtx.clearRect(24, 24, 512 - 48, 384 - 48); // Clear center viewport
      // Logo in bezel
      bCtx.fillStyle = "#ff204e";
      bCtx.font = "bold 13px monospace";
      bCtx.fillText("MS ELECTRONICS COMPANY 0.01mm CNC", 20, 20);
    }
    const bezelTex = new THREE.CanvasTexture(bezelCanvas);
    const bezelMat = new THREE.MeshBasicMaterial({ map: bezelTex, transparent: true });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.z = 0.041;
    glassMesh.add(bezelMesh);

    // LAYER 2: Optical Clear Resin (LOCA / OCR Bonding)
    const locaGeo = new THREE.BoxGeometry(panelW - 0.1, panelH - 0.1, 0.04);
    const locaMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.02,
      transmission: 0.95,
      ior: 1.48, // Optically matched refractive index
    });
    const locaMesh = new THREE.Mesh(locaGeo, locaMat);

    // LAYER 3: Indium Tin Oxide (ITO) Sensor Grid
    const itoGeo = new THREE.PlaneGeometry(panelW - 0.15, panelH - 0.15);
    const itoCanvas = document.createElement("canvas");
    itoCanvas.width = 512;
    itoCanvas.height = 512;
    const itoCtx = itoCanvas.getContext("2d");
    if (itoCtx) {
      itoCtx.clearRect(0, 0, 512, 512);
      itoCtx.strokeStyle = "rgba(0, 240, 255, 0.35)";
      itoCtx.lineWidth = 1;
      const step = 16;
      for (let x = 0; x < 512; x += step) {
        itoCtx.beginPath();
        itoCtx.moveTo(x, 0);
        itoCtx.lineTo(x + step * 0.5, 512);
        itoCtx.stroke();
      }
      for (let y = 0; y < 512; y += step) {
        itoCtx.beginPath();
        itoCtx.moveTo(0, y);
        itoCtx.lineTo(512, y + step * 0.5);
        itoCtx.stroke();
      }
    }
    const itoTex = new THREE.CanvasTexture(itoCanvas);
    const itoMat = new THREE.MeshBasicMaterial({
      map: itoTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.65,
    });
    const itoMesh = new THREE.Mesh(itoGeo, itoMat);

    // LAYER 4: Ultra-HD IPS LCD Matrix Display
    const lcdGeo = new THREE.PlaneGeometry(panelW - 0.2, panelH - 0.2);
    const lcdMat = new THREE.MeshBasicMaterial({
      map: displayTexture,
    });
    const lcdMesh = new THREE.Mesh(lcdGeo, lcdMat);

    // LAYER 5: Quantum-Dot LED Backlight Unit
    const blGeo = new THREE.BoxGeometry(panelW - 0.15, panelH - 0.15, 0.05);
    const blMat = new THREE.MeshStandardMaterial({
      color: 0x112233,
      emissive: 0x0088cc,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });
    const blMesh = new THREE.Mesh(blGeo, blMat);

    // LAYER 6: Aerospace CNC Aluminum Chassis & Shielding
    const chassisGeo = new THREE.BoxGeometry(panelW + 0.1, panelH + 0.1, 0.2);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a24,
      metalness: 0.85,
      roughness: 0.25,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);

    // Gold FPC Flexible Circuit Ribbon
    const fpcGeo = new THREE.PlaneGeometry(0.8, 1.2);
    const fpcMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const fpcMesh = new THREE.Mesh(fpcGeo, fpcMat);
    fpcMesh.position.set(0, -(panelH * 0.5 + 0.5), 0);
    chassisMesh.add(fpcMesh);

    // Store layer details for dynamic animation & user inspection
    layersListRef.current = [
      {
        name: "Cover Glass (Corning / AGC)",
        desc: "Chemically strengthened 9H hardness glass with Anti-Glare, Anti-Reflective, and Oleophobic coatings.",
        mesh: glassMesh,
        baseZ: 0.15,
        targetOffsetZ: 2.2,
        specs: "Thickness: 0.7mm - 6.0mm | Optical Clarity: 94% | Surface Hardness: 9H",
      },
      {
        name: "Optical Bonding Resin (LOCA / OCR)",
        desc: "Refraction-matched liquid optical polymer cured via UV laser. Eliminates air gaps, reflections, and moisture condensation.",
        mesh: locaMesh,
        baseZ: 0.1,
        targetOffsetZ: 1.4,
        specs: "Bond Line Tolerance: 0.01mm | Transmission: 99.8% | Operating: -40°C to +85°C",
      },
      {
        name: "Indium Tin Oxide (ITO) Sensor",
        desc: "Diamond-patterned projected capacitive sensing matrix supporting 10-point multi-touch, glove use, and water rejection.",
        mesh: itoMesh,
        baseZ: 0.05,
        targetOffsetZ: 0.7,
        specs: "Channel Resolution: 4096 x 4096 | Report Rate: >120Hz | Glove Thickness: Up to 5mm",
      },
      {
        name: "Ultra-HD IPS LCD Matrix",
        desc: "High-resolution active matrix liquid crystal array delivering wide 178° viewing angles and 100% sRGB color gamut.",
        mesh: lcdMesh,
        baseZ: 0.0,
        targetOffsetZ: 0.0,
        specs: "Contrast: 1200:1 | View Angle: 89/89/89/89 | Interface: eDP / LVDS / MIPI",
      },
      {
        name: "High-Luminance LED Backlight",
        desc: "Sunlight-readable quantum-dot LED matrix delivering up to 2500 Nits for outdoor and avionics environments.",
        mesh: blMesh,
        baseZ: -0.06,
        targetOffsetZ: -0.8,
        specs: "Luminance: 1,500 - 2,500 Nits | MTBF: 70,000 Hours | PWM Dimming: 0-100%",
      },
      {
        name: "Aerospace CNC Aluminum Chassis",
        desc: "Precision CNC milled magnesium-aluminum alloy enclosure providing rugged structural rigidity and MIL-STD EMI/RFI shielding.",
        mesh: chassisMesh,
        baseZ: -0.15,
        targetOffsetZ: -1.7,
        specs: "Material: AL6061-T6 / Magnesium | Protection: IP68 / NEMA 4X | Shock: MIL-STD-810H",
      },
    ];

    layersListRef.current.forEach((layer) => {
      layer.mesh.position.z = layer.baseZ;
      rootGroup.add(layer.mesh);
    });

    // Anti-gravity levitation containment ring
    const ringGeo = new THREE.TorusGeometry(3.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -2.2;
    scene.add(ringMesh);

    // Laser connection beams for exploded view
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
    });
    const laserCorners = [
      new THREE.Vector3(-panelW / 2, -panelH / 2, 0),
      new THREE.Vector3(panelW / 2, -panelH / 2, 0),
      new THREE.Vector3(panelW / 2, panelH / 2, 0),
      new THREE.Vector3(-panelW / 2, panelH / 2, 0),
    ];
    const laserLines: THREE.Line[] = [];
    laserCorners.forEach((corner) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(corner.x, corner.y, -2),
        new THREE.Vector3(corner.x, corner.y, 2.5),
      ]);
      const line = new THREE.Line(lineGeo, laserMat);
      rootGroup.add(line);
      laserLines.push(line);
    });

    // 5. MOUSE DRAG / TOUCH ROTATION CONTROLS
    let targetRotationX = 0.15;
    let targetRotationY = -0.3;
    let currentRotationX = 0.15;
    let currentRotationY = -0.3;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      // Clamp vertical tilt
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch screen controls
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 580;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 6. ANIMATION & RENDER LOOP
    let reqId: number;
    let clock = new THREE.Clock();

    const render = () => {
      reqId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Smooth Rotation Interpolation
      if (autoRotate && !isDraggingRef.current) {
        targetRotationY += 0.004;
      }
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      if (rootGroup) {
        rootGroup.rotation.x = currentRotationX;
        rootGroup.rotation.y = currentRotationY;

        // Subtle anti-gravity bobbing
        rootGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      // Smooth layer explosion interpolation
      const targetExp = explosionProgressRef.current;
      layersListRef.current.forEach((layer) => {
        const destZ = layer.baseZ + layer.targetOffsetZ * targetExp;
        layer.mesh.position.z += (destZ - layer.mesh.position.z) * 0.1;
      });

      // Update laser lines visibility and opacity based on explosion
      laserLines.forEach((line) => {
        line.visible = targetExp > 0.05;
        (line.material as THREE.LineBasicMaterial).opacity = targetExp * 0.5;
      });

      // Ring pulse
      ringMesh.rotation.z = elapsed * 0.2;
      ringMesh.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.02);

      // 7. RENDER DYNAMIC SCI-FI HUD ONTO LCD CANVAS
      if (dispCtx) {
        dispCtx.fillStyle = "#030612";
        dispCtx.fillRect(0, 0, 1024, 768);

        // Tech grid lines
        dispCtx.strokeStyle = "rgba(0, 240, 255, 0.12)";
        dispCtx.lineWidth = 1;
        for (let x = 0; x < 1024; x += 40) {
          dispCtx.beginPath();
          dispCtx.moveTo(x, 0);
          dispCtx.lineTo(x, 768);
          dispCtx.stroke();
        }
        for (let y = 0; y < 768; y += 40) {
          dispCtx.beginPath();
          dispCtx.moveTo(0, y);
          dispCtx.lineTo(1024, y);
          dispCtx.stroke();
        }

        // Animated telemetry circles
        dispCtx.save();
        dispCtx.translate(512, 384);
        dispCtx.rotate(elapsed * 0.5);
        dispCtx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        dispCtx.beginPath();
        dispCtx.arc(0, 0, 180, 0, Math.PI * 1.5);
        dispCtx.stroke();
        dispCtx.restore();

        // Target Reticle Center
        dispCtx.strokeStyle = "rgba(230, 25, 25, 0.6)";
        dispCtx.lineWidth = 2;
        dispCtx.beginPath();
        dispCtx.arc(512, 384, 120, 0, Math.PI * 2);
        dispCtx.stroke();

        // Real-time Waveform Chart (ECG / Capacitive Scan)
        dispCtx.strokeStyle = "#00f0ff";
        dispCtx.lineWidth = 3;
        dispCtx.beginPath();
        for (let i = 0; i < 1024; i += 8) {
          const wave =
            Math.sin(i * 0.02 + elapsed * 6) * 35 * Math.sin(i * 0.005) +
            Math.cos(i * 0.05 + elapsed * 10) * 15;
          const y = 384 + wave;
          if (i === 0) dispCtx.moveTo(i, y);
          else dispCtx.lineTo(i, y);
        }
        dispCtx.stroke();

        // Glowing HUD Headings
        dispCtx.fillStyle = "#ffffff";
        dispCtx.font = "bold 28px monospace";
        dispCtx.fillText("MS ELECTRONICS COMPANY // 3D TOUCH ARCHITECTURE", 40, 70);

        dispCtx.fillStyle = "#00f0ff";
        dispCtx.font = "bold 18px monospace";
        dispCtx.fillText("0.01mm CNC OPTICAL BONDING // LOCA HIGH-TRANSMISSION", 40, 105);

        // Telemetry Data Box
        dispCtx.fillStyle = "rgba(0, 240, 255, 0.08)";
        dispCtx.fillRect(40, 600, 420, 120);
        dispCtx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        dispCtx.strokeRect(40, 600, 420, 120);

        dispCtx.fillStyle = "#a0f0ff";
        dispCtx.font = "14px monospace";
        dispCtx.fillText("TOUCH MATRIX: 4096 x 4096 PCAP", 60, 630);
        dispCtx.fillText("REFRACTIVE INDEX: n = 1.52 (MATCHED)", 60, 655);
        dispCtx.fillText(`DISPENSING TOLERANCE: 0.01mm DYNAMIC Z`, 60, 680);
        dispCtx.fillText(`STATUS: MIL-STD-810H / ISO 9001:2015`, 60, 705);

        // Real-time touch points visualization on screen
        touchPoints.forEach((pt) => {
          dispCtx.strokeStyle = "#ff0055";
          dispCtx.fillStyle = "rgba(255, 0, 85, 0.3)";
          dispCtx.beginPath();
          dispCtx.arc(pt.x, pt.y, 28, 0, Math.PI * 2);
          dispCtx.fill();
          dispCtx.stroke();

          dispCtx.fillStyle = "#ffffff";
          dispCtx.font = "bold 12px monospace";
          dispCtx.fillText(`TOUCH #${pt.id}: [${Math.round(pt.x)}, ${Math.round(pt.y)}]`, pt.x + 35, pt.y + 5);
        });

        // Shockwave impact animation on the canvas
        if (shockwaveRef.current.active) {
          shockwaveRef.current.radius += 12;
          const r = shockwaveRef.current.radius;
          dispCtx.strokeStyle = `rgba(255, 40, 40, ${Math.max(0, 1 - r / 600)})`;
          dispCtx.lineWidth = 8;
          dispCtx.beginPath();
          dispCtx.arc(512, 384, r, 0, Math.PI * 2);
          dispCtx.stroke();
          if (r > 600) {
            shockwaveRef.current.active = false;
          }
        }

        displayTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Keep explosion progress in sync with ref for render loop
  React.useEffect(() => {
    explosionProgressRef.current = explosionAmount;
  }, [explosionAmount]);

  // Toggle X-Ray materials
  React.useEffect(() => {
    layersListRef.current.forEach((layer) => {
      const mesh = layer.mesh;
      if (mesh instanceof THREE.Mesh) {
        if (isXRay) {
          mesh.material = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.7,
          });
        } else {
          // Revert to original materials
          // (Three.js materials reset)
        }
      }
    });
  }, [isXRay]);

  // Canvas Click for Interactive Capacitive Touch Points
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 1024;
    const clickY = ((e.clientY - rect.top) / rect.height) * 768;

    sound.playCapacitivePulse();

    const newPoint: TouchPoint = {
      x: clickX,
      y: clickY,
      id: Math.floor(Math.random() * 900) + 100,
      time: Date.now(),
    };

    setTouchPoints((prev) => [...prev.slice(-3), newPoint]);

    // Remove touch point after 2 seconds
    setTimeout(() => {
      setTouchPoints((prev) => prev.filter((p) => p.time !== newPoint.time));
    }, 2000);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#070b14] to-[#04060c] border border-cyan-500/20 shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden">
      {/* Sci-Fi Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md z-20 relative">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_12px_#e61919]" />
          <div>
            <h3 className="text-white font-bold tracking-wider text-base md:text-lg flex items-center gap-2">
              MS ELECTRONICS COMPANY // 3D HOLOGRAPHIC TOUCH ARCHITECTURE
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
                REAL-TIME WEBGL
              </span>
            </h3>
            <p className="text-gray-400 text-xs font-mono">
              Drag to Orbit 360° | Click surface to test Capacitive Sensing | Explode layers
            </p>
          </div>
        </div>

        {/* Quick Mode Buttons */}
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 ${
              autoRotate
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{autoRotate ? "AUTO-ORBIT: ON" : "MANUAL ORBIT"}</span>
          </button>

          <button
            onClick={handleToggleXRay}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 ${
              isXRay
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>X-RAY SCHEMATIC</span>
          </button>

          <button
            onClick={triggerImpactTest}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 ${
              impactTriggered
                ? "bg-red-500/30 border-red-500 text-red-300 shadow-[0_0_15px_rgba(230,25,25,0.4)] animate-pulse"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-accent" />
            <span>IK10 IMPACT TEST</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className="w-full h-[450px] md:h-[600px] cursor-grab active:cursor-grabbing relative"
      >
        {/* Floating Layer Callout Badges */}
        {explosionAmount > 0.3 && (
          <div className="absolute left-6 top-8 z-10 space-y-2 pointer-events-none">
            {layersListRef.current.map((layer, idx) => (
              <div
                key={layer.name}
                className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-2.5 max-w-xs shadow-lg transition-all animate-fadeIn"
              >
                <div className="flex items-center justify-between text-xs font-bold text-cyan-300 font-mono">
                  <span>LAYER 0{idx + 1}: {layer.name}</span>
                </div>
                <div className="text-[11px] text-gray-300 mt-1">{layer.desc}</div>
                <div className="text-[10px] text-accent font-mono mt-1">{layer.specs}</div>
              </div>
            ))}
          </div>
        )}

        {/* Reticle Overlay Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* Interactive Touch Hint */}
        <div className="absolute bottom-6 left-6 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center space-x-2">
          <Zap className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
          <span>CLICK ANYWHERE ON SCREEN FOR CAPACITIVE SIGNAL PULSE</span>
        </div>
      </div>

      {/* Futuristic Bottom Controls & Exploded View Slider */}
      <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-white/10 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Exploded View Slider */}
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                DISASSEMBLY / EXPLODED VIEW ENGINE:
              </span>
              <span className="text-cyan-400 font-bold">
                {Math.round(explosionAmount * 100)}% EXPANDED
              </span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosionAmount}
                onChange={(e) => handleExplosionChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span>ASSEMBLED (0%)</span>
              <span>INSPECTION OFFSET (50%)</span>
              <span>FULL 6-LAYER DISASSEMBLY (100%)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="md:col-span-4 flex items-center gap-2">
            <button
              onClick={() => handleExplosionChange(0)}
              className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-white transition-all text-center"
            >
              ASSEMBLE
            </button>
            <button
              onClick={() => handleExplosionChange(1)}
              className="flex-1 py-2 bg-accent/20 hover:bg-accent/30 border border-accent/40 rounded-lg text-xs font-mono text-white transition-all text-center shadow-[0_0_15px_rgba(230,25,25,0.2)]"
            >
              EXPLODE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

