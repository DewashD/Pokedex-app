"use client";

import Link from "next/link";
import { useState } from "react";
import { capitalize, padId, getSpriteUrl, getPokemonIdFromUrl } from "@/lib/pokemon";

interface Props {
  name: string;
  url: string;
  index: number;
}

export default function PokemonCard({ name, url, index }: Props) {
  const id = getPokemonIdFromUrl(url);
  const spriteUrl = getSpriteUrl(id);
  const delay = (index % 20) * 30;
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/pokemon/${name}`}
      style={{
        display: "block",
        animation: `fadeIn 0.4s ease ${delay}ms both`,
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: `2px solid ${hovered ? "var(--yellow)" : "var(--border)"}`,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
          position: "relative",
          cursor: "pointer",
          transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hovered ? "0 8px 32px rgba(255,203,5,0.2)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ID badge */}
        <div style={{
          position: "absolute",
          top: 10,
          left: 12,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 8,
          color: "var(--text-muted)",
          zIndex: 1,
        }}>
          #{padId(id)}
        </div>

        {/* Background pokeball decoration */}
        <div style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "20px solid rgba(255,255,255,0.03)",
          pointerEvents: "none",
        }} />

        {/* Sprite area */}
        <div style={{
          background: "linear-gradient(145deg, var(--surface-light), var(--card-bg))",
          padding: "24px 16px 12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 140,
          position: "relative",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgError ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : spriteUrl}
            alt={name}
            width={100}
            height={100}
            style={{
              imageRendering: "auto",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
              transition: "transform 0.3s",
              opacity: imgError ? 0.6 : 1,
            }}
            onError={() => setImgError(true)}
          />
        </div>

        {/* Info area */}
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{
            fontWeight: 800,
            fontSize: 15,
            color: "var(--text)",
            marginBottom: 8,
            textTransform: "capitalize",
          }}>
            {capitalize(name)}
          </div>
        </div>
      </div>
    </Link>
  );
}
