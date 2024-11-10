import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Template from "@/component/Template";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qliqsee",
  description:
    "Qliqsee is a unique, sci-fi-themed portfolio web app that merges futuristic design with a warm, wooden brown aesthetic. Inspired by classic sci-fi interfaces, it features engaging transitions, animations, and sound effects to create an immersive, fantasy-driven experience. Each interaction is crafted to evoke the sensation of navigating a high-tech, intergalactic dashboard.",
  keywords: "qliqsee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Orbitron:400,500,700|Electrolize" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={inter.className}>
        <Template> {children}</Template>
      </body>
    </html>
  );
}
