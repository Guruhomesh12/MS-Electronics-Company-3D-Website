"use client";

import * as React from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { Compass, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-cyan-400/30 bg-[#060c1c] text-slate-300 py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              onClick={() => sound.playCyberClick()}
              className="flex items-center space-x-3 group"
            >
              <div className="p-1.5 rounded-xl bg-black/70 border border-cyan-400/50">
                <img src="/logo.png" alt="MS Electronics Company Logo" className="h-8 w-auto object-contain" />
              </div>
              <span className="text-xl font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                MS ELECTRONICS COMPANY
              </span>
            </Link>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed font-sans">
              Global manufacturer of custom 3D touch displays, optical bonding assemblies (LOCA/OCR), and rugged industrial HMI panels. Operating out of our ISO 9001:2015 certified 1,000 sq. ft. cleanroom facility in Telangana, India.
            </p>

            <div className="flex items-center space-x-3 text-xs font-mono text-cyan-300 pt-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GEO: 17.4752° N, 78.8062° E // BIBINAGAR HQ</span>
            </div>
          </div>

          {/* 3D Capabilities */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-cyan-400/30 pb-1 inline-block">
              3D Systems
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-300">
              <li>
                <Link href="/#hero" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  Touch Panel 3D Model
                </Link>
              </li>
              <li>
                <Link href="/#process" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  3D Cleanroom Workcell
                </Link>
              </li>
              <li>
                <Link href="/#industries" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  3D Orbital Holosphere
                </Link>
              </li>
              <li>
                <Link href="/#configurator" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  3D Hardware Configurator
                </Link>
              </li>
              <li>
                <Link href="/gallery" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  Holographic Media Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Engineering */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-cyan-400/30 pb-1 inline-block">
              Hardware Specs
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-300">
              <li>
                <Link href="/#products" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  PCAP Multi-Touch Panels
                </Link>
              </li>
              <li>
                <Link href="/#products" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  LOCA Optical Bonding
                </Link>
              </li>
              <li>
                <Link href="/#products" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  Rugged Industrial HMIs
                </Link>
              </li>
              <li>
                <Link href="/#products" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  Corning Gorilla Glass Lens
                </Link>
              </li>
              <li>
                <Link href="/downloads" onClick={() => sound.playCyberClick()} className="hover:text-cyan-300 transition-colors">
                  Download Spec Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Communications & New Address */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-cyan-400/30 pb-1 inline-block">
              Direct Uplink
            </h4>
            <ul className="space-y-3 text-xs font-mono text-slate-200">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="font-bold">+91 9246288140</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">siva@mselectronicscompany.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">MS Electronics Company</span>
                  <span className="text-slate-300">Bibinagar Road, Bibinagar, Yadadri Bhuvanagiri, Telangana 508126, India</span>
                  <a
                    href="https://maps.app.goo.gl/vgnRpj4gHhdzW9R57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-300 hover:text-white mt-1 underline"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} MS Electronics Company. All Rights Reserved. Engineered with Micron Precision.</p>
          <div className="flex items-center space-x-4">
            <span className="text-cyan-300 font-bold">ISO 9001:2015</span>
            <span>•</span>
            <span className="text-accent font-bold">CLASS 1,000 CLEANROOM</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">MIL-STD-810H READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
