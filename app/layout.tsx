import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UNCHAIN — Decision Intelligence for Product Teams",
  description:
    "UNCHAIN is an AI-powered Decision System of Record that ingests signals from Slack, Jira, Notion, user interviews, and more — then uses multi-agent AI to synthesize insights and produce decision-ready artifacts.",
  openGraph: {
    title: "UNCHAIN — Decision Intelligence for Product Teams",
    description:
      "Stop burying decisions in noise. UNCHAIN synthesizes product signals into decision-ready artifacts with multi-agent AI.",
    type: "website",
    siteName: "UNCHAIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNCHAIN — Decision Intelligence for Product Teams",
    description:
      "Stop burying decisions in noise. UNCHAIN synthesizes product signals into decision-ready artifacts with multi-agent AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
