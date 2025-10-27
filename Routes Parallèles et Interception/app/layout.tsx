import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo Gallery with Parallel Routes",
  description: "Example of Next.js Parallel Routes",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        {children}
        {modal}
      </body>
    </html>
  );
}
