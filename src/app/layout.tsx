import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingMenu } from "@/components/layout/FloatingMenu";
import { Footer } from "@/components/layout/Footer";
import { FuturisticHUD } from "@/components/layout/FuturisticHUD";
import { HeroCyberBackground } from "@/components/3d/HeroCyberBackground";

export const metadata: Metadata = {
  title: "MS Electronics Company | Next-Gen 3D Touch & Optical Bonding Systems",
  description: "MS Electronics Company — World-class Custom 3D Touch Panels, LOCA Optical Bonding & Rugged Display Solutions engineered with 0.01mm CNC precision for Avionics, Medical, Military & Defense.",
  keywords: ["MS Electronics Company", "3D Touch Panels", "Custom Touch Panels", "Optical Bonding", "Industrial Display", "Cleanroom", "HMI Systems", "Avionics Displays"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased scroll-smooth">
      <body className="min-h-screen bg-[#080e1e] text-foreground flex flex-col selection:bg-accent selection:text-white font-sans overflow-x-hidden">
        {/* Top Sci-Fi Telemetry & Audio HUD */}
        <FuturisticHUD />

        {/* Interactive 3D Background Starfield & Cyber Parallax */}
        <HeroCyberBackground />

        {/* Ambient Grid Layers - Luminous & High Visibility */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#080e1e]/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.15),transparent)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0c_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0c_1px,transparent_1px)] bg-[size:44px_44px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_100%_300px,rgba(255,32,78,0.08),transparent)]"></div>
        </div>

        <Navbar />
        <main className="flex-grow flex flex-col relative z-0">
          {children}
        </main>
        <Footer />
        <FloatingMenu />
      </body>
    </html>
  );
}
