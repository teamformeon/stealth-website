import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Stealth | AI Assistant That Understands Context",
  description: "System-wide AI assistant that automatically analyzes your screen and suggests actions—no prompts needed. Integrates with email, calendar, tasks, Notion, Slack, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-white font-sans text-black selection:bg-blue-100",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <div className="noise-overlay" />

        {/* Simplified Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[120px] rounded-full animate-glow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/30 blur-[120px] rounded-full animate-glow" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
