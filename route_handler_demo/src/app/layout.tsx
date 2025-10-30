// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Route Handlers Demo",
  description: "Démo complète des Route Handlers avec JSONPlaceholder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
