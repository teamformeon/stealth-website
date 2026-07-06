import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthRedirector from "@/components/AuthRedirector";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Formeon | The memory layer for product teams",
  description:
    "Formeon connects Slack, Notion, Jira, and docs to preserve company product context—so PMs generate PRDs, specs, and tickets grounded in what your team already knows.",
  metadataBase: new URL("https://formeon.org"),
  icons: {
    icon: "/formeon-logo.png",
    apple: "/formeon-logo.png",
  },
  openGraph: {
    title: "Formeon | The memory layer for product teams",
    description:
      "Formeon connects Slack, Notion, Jira, and docs to preserve company product context—so PMs generate PRDs, specs, and tickets grounded in what your team already knows.",
    url: "https://formeon.org",
    siteName: "Formeon",
    images: [
      {
        url: "/formeon-logo.png",
        width: 512,
        height: 512,
        alt: "Formeon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Formeon | The memory layer for product teams",
    description:
      "Formeon connects Slack, Notion, Jira, and docs to preserve company product context—so PMs generate PRDs, specs, and tickets grounded in what your team already knows.",
    images: ["/formeon-logo.png"],
  },
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
          "min-h-screen bg-[#FAFAF8] font-sans text-slate-900 antialiased selection:bg-[#6366F1]/20",
          inter.variable,
          instrumentSerif.variable
        )}
      >
        <AuthRedirector />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
