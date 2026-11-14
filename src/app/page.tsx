"use client";

import { HeroVideoStyle } from "@/components/sections/HeroVideoStyle";
import { InteractiveBentoShowcase } from "@/components/sections/InteractiveBentoShowcase";
import { WarpSpeedTimeline } from "@/components/sections/WarpSpeedTimeline";
import StackingCards from "@/components/sections/StackingCards";
import { CleanroomRobotics3D } from "@/components/3d/CleanroomRobotics3D";
import { Holosphere3D } from "@/components/3d/Holosphere3D";
import { HoloConfigurator } from "@/components/sections/HoloConfigurator";
import { Capabilities } from "@/components/sections/Capabilities";
import { Quality } from "@/components/sections/Quality";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { SectionNavigator } from "@/components/layout/SectionNavigator";
import { CinematicTour } from "@/components/layout/CinematicTour";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden perspective-1000">
      {/* 3D Cinematic Auto-Tour Controller */}
      <CinematicTour />

      {/* Floating Section Navigator & Interactive Slide Bar */}
      <SectionNavigator />

      {/* SECTION 1: Instagram-Inspired Giant Typography & 3D Interactive Touch Hero */}
      <motion.div
        id="hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroVideoStyle />
      </motion.div>

      {/* SECTION 2: Selected Products Interactive Bento Showcase with Floating Metric Pills */}
      <motion.div
        id="bento"
        initial={{ opacity: 0, x: -80, rotateY: 10 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <InteractiveBentoShowcase />
      </motion.div>

      {/* SECTION 3: 3D Laser Warp-Speed Timeline (2022 - 2026 Journey) */}
      <motion.div
        id="warp"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <WarpSpeedTimeline />
      </motion.div>

      {/* SECTION 4: Scroll-Driven Sticky Stacking Cards Showcase */}
      <motion.div
        id="stacking"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <StackingCards />
      </motion.div>

      {/* SECTION 5: 3D Robotic Cleanroom Workcell - Sweeps in from Right with 3D Tilt */}
      <motion.section
        id="process"
        initial={{ opacity: 0, x: 100, rotateY: -10 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 px-6 container mx-auto"
      >
        <CleanroomRobotics3D />
      </motion.section>

      {/* SECTION 6: 3D Orbital Holosphere - Zooms in from 3D Deep Space */}
      <motion.section
        id="industries"
        initial={{ opacity: 0, scale: 0.85, y: 60 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 px-6 container mx-auto"
      >
        <Holosphere3D />
      </motion.section>

      {/* SECTION 7: 3D Custom Hardware Architect - Diagonal Slide from Bottom-Left */}
      <motion.div
        id="configurator"
        initial={{ opacity: 0, x: -80, y: 60 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <HoloConfigurator />
      </motion.div>

      {/* SECTION 8: Optical Bonding Capabilities - Diagonal Slide from Bottom-Right */}
      <motion.div
        id="capabilities"
        initial={{ opacity: 0, x: 80, y: 60 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <Capabilities />
      </motion.div>

      {/* SECTION 9: Cleanroom Metrology & Capacitive Touch Simulator - Vertical Rise */}
      <motion.div
        id="quality"
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <Quality />
      </motion.div>

      {/* SECTION 10: Why Choose Us & MS Electronics Company HQ - Power Slide from Left */}
      <motion.div
        id="why-us"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <WhyChooseUs />
      </motion.div>
    </div>
  );
}
