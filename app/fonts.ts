import { Electrolize, Geist, Geist_Mono } from "next/font/google";

export const electrolize = Electrolize({
  subsets: ["latin"],
  preload: true,
  weight: ["400"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
