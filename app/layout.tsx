import "./globals.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${pixel.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-[#05050a] text-zinc-50">
        {children}
      </body>
    </html>
  );
}