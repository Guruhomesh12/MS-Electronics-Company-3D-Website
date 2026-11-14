'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

interface CardData {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  badge: string;
  colorScheme: {
    bg: string;
    border: string;
    pill: string;
    accent: string;
    text: string;
  };
  metrics: { label: string; value: string }[];
  features: string[];
  description: string;
}

const CARDS: CardData[] = [
  {
    id: 'pcap',
    index: '01',
    title: 'Custom PCAP & Multi-Touch Sensors',
    subtitle: 'Ultra-responsive touch controllers calibrated for industrial gloves and wet conditions',
    badge: 'Flagship Technology',
    colorScheme: {
      bg: 'bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950',
      border: 'border-blue-500/40',
      pill: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      accent: 'text-blue-400',
      text: 'text-blue-100',
    },
    metrics: [
      { label: 'Touch Points', value: 'Up to 40' },
      { label: 'Latency', value: '< 4.2 ms' },
      { label: 'Glass Cover', value: 'Up to 12mm' },
      { label: 'Water Immunity', value: 'Full Saltwater' },
    ],
    features: [
      'Glove & water-droplet rejection algorithms engineered in-house',
      'Optical clarity index above 99.2% with zero parallax gap',
      'Custom ITO pattern etching tailored for bespoke glass geometries',
    ],
    description: 'MS Electronics Company builds enterprise-grade projected capacitive sensor layers tested against extreme EMI environments, thick vandal-proof safety glass, and harsh continuous operating cycles.',
  },
  {
    id: 'bonding',
    index: '02',
    title: '0.01mm Automated Optical Bonding',
    subtitle: 'Robotic LOCA & OCA optical laminate assembly in Class 1,000 cleanrooms',
    badge: 'Cleanroom Robotics',
    colorScheme: {
      bg: 'bg-gradient-to-br from-orange-950 via-slate-900 to-amber-950',
      border: 'border-orange-500/40',
      pill: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      accent: 'text-orange-400',
      text: 'text-orange-100',
    },
    metrics: [
      { label: 'Dispense Acc.', value: '±0.01 mm' },
      { label: 'Bubble Defect', value: '0.00 ppm' },
      { label: 'Reflection Loss', value: '< 0.2%' },
      { label: 'UV Cure Time', value: '45 seconds' },
    ],
    features: [
      'Refractive index matching eliminating internal air-gap bounce',
      'High shock and mechanical vibration resistance for defense & avionics',
      'Solar direct-sunlight readability boosting contrast by up to 400%',
    ],
    description: 'Precision automated optical bonding ensures complete elimination of internal air gaps, giving MS Electronics Company displays stunning sunlight readability and rugged durability.',
  },
  {
    id: 'coatings',
    index: '03',
    title: 'Advanced Optical & Hydrophobic Coatings',
    subtitle: 'Sputtered thin-film vacuum deposition for anti-glare, anti-reflection & anti-fingerprint',
    badge: 'Nanotech Surface',
    colorScheme: {
      bg: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950',
      border: 'border-emerald-500/40',
      pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      accent: 'text-emerald-400',
      text: 'text-emerald-100',
    },
    metrics: [
      { label: 'Transmittance', value: '98.8%' },
      { label: 'Hardness', value: '9H Pencil' },
      { label: 'Contact Angle', value: '> 115°' },
      { label: 'Abrasion Cycles', value: '50,000+' },
    ],
    features: [
      'Chemical-strengthened Corning Gorilla or custom soda-lime substrates',
      'Oleophobic nano-layer repelling fingerprints, oils, and chemical sanitizers',
      'Electromagnetic shielding (EMI/EMC mesh) available for military use',
    ],
    description: 'Vacuum-deposited nanoscale thin films optimize clarity and surface resilience, ensuring medical diagnostics and mission-critical cockpits remain pristine under intensive sterilization.',
  },
  {
    id: 'standards',
    index: '04',
    title: 'ISO 9001:2015 & Extreme Quality Assurance',
    subtitle: '100% automated optical inspection (AOI) and thermal cycle endurance validation',
    badge: 'Quality & Defense Certified',
    colorScheme: {
      bg: 'bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950',
      border: 'border-purple-500/40',
      pill: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      accent: 'text-purple-400',
      text: 'text-purple-100',
    },
    metrics: [
      { label: 'Thermal Range', value: '-40°C to +85°C' },
      { label: 'Quality Standard', value: 'ISO 9001:2015' },
      { label: 'MTBF', value: '100,000+ hrs' },
      { label: 'AOI Precision', value: '5-micron' },
    ],
    features: [
      'Full traceability down to individual sensor lot and bonding batch numbers',
      'Bibinagar Road manufacturing center with comprehensive environmental test chambers',
      'Guaranteed supply chain continuity and 7+ year product lifecycle longevity',
    ],
    description: 'Every display module manufactured at MS Electronics Company undergoes rigorous 48-hour thermal cycling, vibration stress tests, and automated sub-pixel optical inspections before shipment.',
  },
];

export default function StackingCards() {
  const [activeCard, setActiveCard] = useState<string>('pcap');

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden border-t border-slate-800/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Instagram Showcase Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Four Pillars of <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Display Engineering</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Scroll down to watch our manufacturing layers stack together. Engineered with obsessive micron-level tolerance at MS Electronics Company.
          </p>
        </div>

        {/* Stack of Sticky Cards */}
        <div className="relative space-y-8 sm:space-y-10">
          {CARDS.map((card, idx) => {
            const isSelected = activeCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                style={{ top: `${90 + idx * 24}px` }}
                className={`sticky rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-2xl backdrop-blur-xl cursor-pointer ${card.colorScheme.bg} ${card.colorScheme.border} hover:shadow-cyan-500/10`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Left Column: Number, Title, Description */}
                  <div className="lg:max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl sm:text-4xl font-mono font-black text-white/40">
                        {card.index}
                      </span>
                      <span className={`text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${card.colorScheme.pill}`}>
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 mb-6">
                      {card.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${card.colorScheme.accent}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                    >
                      <span>Inquire About {card.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right Column: Quantitative Spec Grid */}
                  <div className="lg:w-80 shrink-0">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                      <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4 pb-2 border-b border-white/10">
                        Factory Specifications
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {card.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="text-[11px] font-medium text-slate-400 mb-1">
                              {metric.label}
                            </div>
                            <div className={`text-lg sm:text-xl font-bold font-mono ${card.colorScheme.accent}`}>
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Manufactured at:</span>
                        <span className="font-semibold text-slate-200">Bibinagar Plant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

