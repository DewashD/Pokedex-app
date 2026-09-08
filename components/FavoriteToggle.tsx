"use client";

import { useState, useEffect } from "react";

interface Props {
  pokemonName: string;
  pokemonId: number;
  compact?: boolean;
}

export default function FavoriteToggle({ pokemonName, pokemonId, compact }: Props) {
  const [isFav, setIsFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  function loadState() {
    const favs: string[] = JSON.parse(
      localStorage.getItem("pokemon-favorites") || "[]"
    );
    setIsFav(favs.includes(pokemonName));
  }

  useEffect(() => {
    setMounted(true);
    loadState();
    window.addEventListener("favoritesChanged", loadState);
    return () => window.removeEventListener("favoritesChanged", loadState);
  }, [pokemonName]);

  if (!mounted) return null;

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favs: string[] = JSON.parse(
      localStorage.getItem("pokemon-favorites") || "[]"
    );
    const updated = favs.includes(pokemonName)
      ? favs.filter(f => f !== pokemonName)
      : [...favs, pokemonName];
    localStorage.setItem("pokemon-favorites", JSON.stringify(updated));
    setIsFav(!isFav);
    window.dispatchEvent(new Event("favoritesChanged"));
  }

  return (
    <button
      onClick={toggle}
      title={isFav ? "Remove from favorites" : "Favorite"}
      style={{
        position: "absolute",
        top: compact ? 8 : 10,
        right: compact ? 8 : 10,
        background: isFav ? "var(--red)" : "var(--surface-light)",
        border: `2px solid ${isFav ? "var(--red-light)" : "var(--border)"}`,
        color: isFav ? "white" : "var(--text-muted)",
        borderRadius: 8,
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
      }}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
}
