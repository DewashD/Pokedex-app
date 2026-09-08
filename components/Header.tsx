"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FavoritesDrawer from "./FavoritesDrawer";

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{
      background: "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)",
      borderBottom: "3px solid var(--yellow)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 4px 24px rgba(227,53,13,0.4)",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "white",
            border: "3px solid var(--yellow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(255,203,5,0.6)",
            flexShrink: 0,
          }}>
            <div style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e3350d 50%, white 50%)",
              border: "2px solid #1a1a2e",
            }} />
          </div>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 14,
            color: "white",
            textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
            letterSpacing: 1,
          }}>
            Pokédex
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: pathname === "/" ? "rgba(255,255,255,0.25)" : "transparent",
            color: "white",
            fontWeight: 700,
            fontSize: 14,
            transition: "background 0.2s",
          }}>
            All Pokémon
          </Link>
          <FavoritesDrawer />
        </nav>
      </div>
    </header>
  );
}
