import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DreamShard — A 2D-HD pixel art RPG",
  description:
    "DreamShard is a 2D-HD RPG in pixel art style where dreams come true — sometimes at a cost. Follow the development of its Arena and Story modes.",
  openGraph: {
    title: "DreamShard — A 2D-HD pixel art RPG",
    description:
      "DreamShard is a 2D-HD RPG in pixel art style where dreams come true — sometimes at a cost.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${pixel.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-[#05050a] text-zinc-50">
        {children}
      </body>
    </html>
  );
}