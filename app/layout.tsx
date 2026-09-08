import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Pokédex – CMPSC421",
  description: "A Next.js Pokédex app powered by PokéAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ minHeight: "calc(100vh - 72px)" }}>{children}</main>
      </body>
    </html>
  );
}
