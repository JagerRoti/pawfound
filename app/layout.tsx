import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawFound — Lost & Found Pets",
  description: "Help reunite lost pets with their families.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-page">{children}</body>
    </html>
  );
}

