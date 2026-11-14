"use client";

import * as React from "react";
import { sound } from "@/lib/sound";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  CheckCircle2,
  Shield,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playExplodeLayers();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/90 border border-cyan-400/50 rounded-full px-5 py-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-mono text-cyan-300 font-bold tracking-widest uppercase">
              GLOBAL ENGINEERING UPLINK // MS ELECTRONICS COMPANY
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Connect With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-cyan-400">Cleanroom Facility</span>
          </h1>

          <p className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg">
            Consult directly with our optical bonding and touch hardware engineering team at MS Electronics Company.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Facility Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 shadow-2xl space-y-6 border border-cyan-400/30">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <h3 className="text-2xl font-black text-white">Facility Headquarters</h3>
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-400/50 font-bold">
                  ISO 9001:2015
                </span>
              </div>

              <ul className="space-y-6 text-sm">
                <li className="flex items-start">
                  <div className="p-3 rounded-2xl bg-accent/25 border border-accent/50 text-accent mr-4 shrink-0 shadow-[0_0_15px_rgba(255,32,78,0.3)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Official Facility Address</h4>
                    <p className="text-slate-200 mt-1 leading-relaxed text-sm font-medium">
                      <strong className="text-white block">M S ELECTRONICS COMPANY</strong>
                      Bibinagar Road, Bibinagar,<br />
                      Yadadri Bhuvanagiri, Telangana 508126, India.
                    </p>
                    <a
                      href="https://maps.app.goo.gl/vgnRpj4gHhdzW9R57"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white font-mono text-xs font-bold mt-2 underline"
                    >
                      <span>Open in Google Maps App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="p-3 rounded-2xl bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 mr-4 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Direct Engineering Hotline</h4>
                    <p className="text-slate-100 mt-1 font-mono text-sm font-bold">+91 9246288140</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="p-3 rounded-2xl bg-purple-500/25 border border-purple-400/50 text-purple-300 mr-4 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Technical Quotation Email</h4>
                    <p className="text-slate-100 mt-1 font-mono text-sm font-bold">siva@mselectronicscompany.com</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="p-3 rounded-2xl bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 mr-4 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Operating Shift Hours</h4>
                    <p className="text-slate-200 mt-1 text-xs font-medium">
                      Monday - Friday: 8:00 AM - 6:00 PM IST<br />
                      Saturday: 9:00 AM - 2:00 PM IST
                    </p>
                  </div>
                </li>
              </ul>

              <a
                href="https://maps.app.goo.gl/vgnRpj4gHhdzW9R57"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playCyberClick()}
                className="flex items-center justify-center w-full py-4 bg-accent hover:bg-accent/90 text-white font-mono text-xs font-black rounded-2xl shadow-[0_0_25px_rgba(255,32,78,0.5)] transition-all uppercase tracking-wider gap-2 border border-white/20"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate to MS Electronics Company</span>
              </a>
            </div>

            {/* Cleanroom Access Protocol */}
            <div className="p-6 rounded-3xl glass-card border border-cyan-400/30 text-xs font-mono text-slate-200 space-y-2">
              <div className="text-cyan-300 font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>CLEANROOM VISITOR ACCESS PROTOCOL</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Prior appointment is required for Class 1,000 cleanroom inspection. Visitors will undergo de-ionizing air shower decontamination and must wear static-dissipative ESD suits provided on-site.
              </p>
            </div>
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-cyan-400/30">
              <h3 className="text-2xl font-black text-white mb-2">Direct Engineering Inquiry</h3>
              <p className="text-xs text-cyan-300 font-mono mb-6 font-bold">
                SUBMIT YOUR CAD / DISPLAY SPECS FOR PROTOTYPE FEASIBILITY REVIEW
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-6 rounded-2xl text-center font-mono space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                  <div className="text-lg font-black text-white">TRANSMISSION CONFIRMED</div>
                  <p className="text-xs text-slate-200 font-sans">
                    Your requirements have been dispatched to our chief optical bonding engineer at MS Electronics Company. We will respond within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-bold">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#0b152d]/90 border border-cyan-400/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-bold">
                        Company / OEM *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Aerospace Dynamics Inc."
                        className="w-full bg-[#0b152d]/90 border border-cyan-400/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-bold">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="engineer@company.com"
                        className="w-full bg-[#0b152d]/90 border border-cyan-400/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-bold">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9246288140"
                        className="w-full bg-[#0b152d]/90 border border-cyan-400/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-bold">
                      Target Sector
                    </label>
                    <select className="w-full bg-[#0b152d]/90 border border-cyan-400/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-300 font-mono">
                      <option value="avionics">Avionics & Aerospace Displays</option>
                      <option value="medical">Medical & Surgical Monitors (ISO 13485)</option>
                      <option value="military">Military & Defense (MIL-STD-810H)</option>
                      <option value="industrial">Industrial Automation & Rugged HMI</option>
                      <option value="marine">Marine & Offshore Navigation</option>
                      <option value="automotive">Automotive Cockpit & EV Terminals</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-bold">
                      Project Technical Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify display size (e.g. 15.6 inch), cover glass thickness, optical bonding requirements (LOCA/OCR), operating temperature range, interface requirements..."
                      className="w-full bg-[#0b152d]/90 border border-cyan-400/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300 font-mono leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-mono font-black tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,32,78,0.5)] flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH PROPOSAL TO MS ELECTRONICS COMPANY</span>
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Live Google Map for Bibinagar HQ */}
            <div className="rounded-3xl overflow-hidden border border-cyan-400/40 h-[320px] relative shadow-2xl">
              <iframe
                src="https://maps.google.com/maps?q=17.4751565,78.8062223&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(115%)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
