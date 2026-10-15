import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthRedirector from "@/components/AuthRedirector";
import { cn } from "@/lib/utils";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
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
          "min-h-screen bg-paper font-sans text-ink antialiased selection:bg-moss/20",
          hanken.variable,
          fraunces.variable
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
