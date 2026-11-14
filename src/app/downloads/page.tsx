"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import {
  FileText,
  Search,
  Download,
  FileArchive,
  FileCheck,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const DOCUMENTS = [
  {
    name: "MS_Electronics_Company_Capabilities_Brochure_2026.pdf",
    title: "MS Electronics Company Corporate & Technical Capabilities",
    type: "PDF",
    size: "4.8 MB",
    category: "Corporate",
    date: "2026-03-15",
    desc: "Complete overview of MS Electronics Company cleanroom specs, automated dispensing robotics, and product families.",
  },
  {
    name: "LOCA_Optical_Bonding_Engineering_Whitepaper_v4.pdf",
    title: "LOCA vs. OCA Optical Bonding Engineering Whitepaper",
    type: "PDF",
    size: "2.4 MB",
    category: "Technical Whitepaper",
    date: "2026-01-20",
    desc: "In-depth analysis of refractive index matching, bubble elimination, UV curing energy profiles, and sunlight readability physics.",
  },
  {
    name: "ISO_9001_2015_Certificate_MS_Electronics_Company.pdf",
    title: "ISO 9001:2015 Quality Management Certification",
    type: "PDF",
    size: "1.1 MB",
    category: "Certification",
    date: "2025-11-10",
    desc: "Accredited certification for the design, manufacture, and integration of custom capacitive touch displays and optical bonding by MS Electronics Company.",
  },
  {
    name: "MIL_STD_810H_Environmental_Test_Report.pdf",
    title: "MIL-STD-810H & DO-160G Qualification Summary",
    type: "PDF",
    size: "3.6 MB",
    category: "Compliance",
    date: "2025-09-04",
    desc: "Test results covering thermal shock (-40°C to +85°C), high-G vibration, salt fog exposure, and IK10 impact testing.",
  },
  {
    name: "PCAP_Controller_Firmware_Tuning_Guide_EETI_ILITEK.pdf",
    title: "Projected Capacitive Firmware Tuning Protocol",
    type: "PDF",
    size: "1.9 MB",
    category: "Engineering Guide",
    date: "2025-08-18",
    desc: "Guide for configuring touch threshold coefficients, water droplet rejection algorithms, and 5mm glove sensitivity curves.",
  },
  {
    name: "CAD_3D_Models_Library_STEP_DXF.zip",
    title: "3D CAD Model Package (STEP / IGES / DXF)",
    type: "Archive",
    size: "18.5 MB",
    category: "CAD Models",
    date: "2026-02-12",
    desc: "Complete 3D dimensional envelopes for standard 7\", 10.4\", 15.6\", and 21.5\" display and touch panel frames.",
  },
];

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [downloading, setDownloading] = React.useState<string | null>(null);

  const filteredDocs = DOCUMENTS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (docName: string) => {
    sound.playExplodeLayers();
    setDownloading(docName);

    // Simulate instant download trigger
    setTimeout(() => {
      setDownloading(null);
      // Create a mock text file download if the real file doesn't exist
      const blob = new Blob([`MS Electronics Company - Official Document: ${docName}\nFor full technical packages, contact siva@mselectronicscompany.com`], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = docName.replace(".pdf", ".txt");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              DOCUMENT ARCHIVE & CAD VAULT
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Documentation</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Access our technical specifications, 3D CAD STEP models, optical bonding whitepapers, and ISO qualification test reports.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              type="text"
              placeholder="Search specifications, whitepapers, CAD models, ISO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090d1a]/80 border border-cyan-500/30 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono shadow-xl backdrop-blur-md"
            />
          </div>
        </div>

        {/* Document Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.name}
              className="p-6 rounded-3xl bg-[#090e1c]/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {doc.type === "PDF" ? (
                      <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-accent">
                        <FileText className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-400">
                        <FileArchive className="w-5 h-5" />
                      </div>
                    )}
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      {doc.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-gray-500">{doc.size}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">{doc.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500">RELEASED: {doc.date}</span>

                <button
                  onClick={() => handleDownload(doc.name)}
                  disabled={downloading === doc.name}
                  className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(230,25,25,0.4)] flex items-center gap-1.5"
                >
                  {downloading === doc.name ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span>DOWNLOADING...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
