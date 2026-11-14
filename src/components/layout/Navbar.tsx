"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sound } from "@/lib/sound";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "3D Display", href: "/#hero" },
  { name: "Products", href: "/#bento" },
  { name: "3D Workcell", href: "/#process" },
  { name: "3D Holosphere", href: "/#industries" },
  { name: "3D Configurator", href: "/#configurator" },
  { name: "Stacking Cards", href: "/#stacking" },
  { name: "Quality", href: "/#quality" },
  { name: "Docs", href: "/downloads" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-8 w-full z-40 transition-all duration-300 bg-[#070e1f]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)] ${
        isScrolled ? "py-2.5 border-cyan-400/50" : "py-3.5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo - MS Electronics Company - Always 100% High Contrast & Visible */}
        <Link
          href="/"
          onClick={() => sound.playCyberClick()}
          className="flex items-center space-x-3.5 group cursor-pointer z-50"
        >
          <div className="relative p-1.5 rounded-xl bg-black/80 border border-cyan-400/60 group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.7)] transition-all">
            <img src="/logo.png" alt="MS Electronics Company Logo" className="h-9 w-auto object-contain" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          </div>

          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              MS ELECTRONICS COMPANY
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              0.01mm 3D OPTICAL MATRIX
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - High Visibility Contrast */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono tracking-wider">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => sound.playBeep(650, 0.02)}
              className={`transition-all hover:text-cyan-300 hover:scale-105 relative py-1 font-bold ${
                pathname === link.href ? "text-cyan-300 font-black" : "text-slate-100 hover:text-cyan-300"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
              )}
            </Link>
          ))}

          <Link
            href="/#configurator"
            onClick={() => sound.playCyberClick()}
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-black tracking-wider shadow-[0_0_20px_rgba(255,32,78,0.6)] transition-all flex items-center gap-1.5 hover:scale-105 border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>CONFIG 3D</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden z-50 p-2.5 rounded-xl bg-black/60 border border-cyan-400/40 text-white"
          onClick={() => {
            sound.playCyberClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] bg-[#070e1f]/98 backdrop-blur-2xl z-40 p-8 flex flex-col justify-between border-t border-cyan-500/30 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-5">
            <div className="pb-3 border-b border-slate-700/60">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                MS Electronics Company Navigation
              </span>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playCyberClick();
                  setMobileMenuOpen(false);
                }}
                className={`text-lg font-mono font-bold tracking-wider py-2 flex items-center justify-between border-b border-white/10 ${
                  pathname === link.href ? "text-cyan-300 font-black" : "text-white hover:text-cyan-300"
                }`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10">
            <Link
              href="/#configurator"
              onClick={() => {
                sound.playCyberClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-mono text-center font-black tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,32,78,0.7)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>LAUNCH 3D HARDWARE ARCHITECT</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
