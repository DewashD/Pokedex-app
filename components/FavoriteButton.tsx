"use client";

import { useState, useEffect } from "react";

interface Props {
  pokemonName: string;
  pokemonId: number;
}

export default function FavoriteButton({ pokemonName, pokemonId }: Props) {
  const [isFav, setIsFav] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const favs: string[] = JSON.parse(
      localStorage.getItem("pokemon-favorites") || "[]"
    );
    setIsFav(favs.includes(pokemonName));
  }, [pokemonName]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favs: string[] = JSON.parse(
      localStorage.getItem("pokemon-favorites") || "[]"
    );
    let updated: string[];
    if (favs.includes(pokemonName)) {
      updated = favs.filter((f) => f !== pokemonName);
      setIsFav(false);
    } else {
      updated = [...favs, pokemonName];
      setIsFav(true);
    }
    localStorage.setItem("pokemon-favorites", JSON.stringify(updated));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    // Dispatch custom event so FavoritesDrawer can update
    window.dispatchEvent(new Event("favoritesChanged"));
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: isFav
          ? "linear-gradient(135deg, #ff6b4a, var(--red))"
          : "var(--surface-light)",
        border: `2px solid ${isFav ? "var(--red-light)" : "var(--border)"}`,
        color: isFav ? "white" : "var(--text-muted)",
        borderRadius: 10,
        padding: "8px 14px",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        transition: "all 0.2s",
        transform: animating ? "scale(1.2)" : "scale(1)",
        boxShadow: isFav ? "0 4px 16px rgba(227,53,13,0.35)" : "none",
        cursor: "pointer",
      }}
    >
      <span style={{ transition: "transform 0.2s" }}>
        {isFav ? "♥" : "♡"}
      </span>
      <span style={{ fontSize: 13 }}>{isFav ? "Favorited" : "Favorite"}</span>
    </button>
  );
}
