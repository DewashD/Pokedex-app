"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { capitalize, getSpriteUrl } from "@/lib/pokemon";

export default function FavoritesDrawer() {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  function loadFavorites() {
    try {
      const favs: string[] = JSON.parse(
        localStorage.getItem("pokemon-favorites") || "[]"
      );
      setFavorites(favs);
    } catch {
      setFavorites([]);
    }
  }

  useEffect(() => {
    loadFavorites();
    window.addEventListener("favoritesChanged", loadFavorites);
    return () => window.removeEventListener("favoritesChanged", loadFavorites);
  }, []);

  function removeFavorite(name: string) {
    const updated = favorites.filter((f) => f !== name);
    localStorage.setItem("pokemon-favorites", JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new Event("favoritesChanged"));
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.3)",
          color: "white",
          borderRadius: 8,
          padding: "8px 14px",
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "'Nunito', sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
      >
        <span>♥</span>
        <span>Favorites</span>
        {favorites.length > 0 && (
          <span style={{
            background: "var(--yellow)",
            color: "var(--black)",
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 900,
          }}>
            {favorites.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 200,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: 340,
        background: "var(--dark)",
        borderLeft: "3px solid var(--border)",
        zIndex: 201,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
      }}>
        {/* Drawer header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "2px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)",
        }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11, color: "white" }}>
              ♥ Favorites
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>
              {favorites.length} saved
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              borderRadius: 8,
              width: 36,
              height: 36,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Favorites list */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {favorites.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 24px",
              color: "var(--text-muted)",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>No favorites yet</div>
              <div style={{ fontSize: 13 }}>Browse Pokémon and tap the heart to save your favorites!</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {favorites.map((name) => (
                <div
                  key={name}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* Sprite */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getSpriteUrl(name)}
                    alt={name}
                    width={48}
                    height={48}
                    style={{ imageRendering: "auto", flexShrink: 0 }}
                    onError={e => { e.currentTarget.style.opacity = "0.3"; }}
                  />
                  {/* Name */}
                  <Link
                    href={`/pokemon/${name}`}
                    onClick={() => setOpen(false)}
                    style={{
                      flex: 1,
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--text)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--yellow)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                  >
                    {capitalize(name)}
                  </Link>
                  {/* Remove */}
                  <button
                    onClick={() => removeFavorite(name)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--red-light)",
                      fontSize: 18,
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: 6,
                      flexShrink: 0,
                    }}
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => {
                localStorage.setItem("pokemon-favorites", "[]");
                setFavorites([]);
                window.dispatchEvent(new Event("favoritesChanged"));
              }}
              style={{
                width: "100%",
                padding: "10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-muted)",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                cursor: "pointer",
              }}
            >
              Clear all favorites
            </button>
          </div>
        )}
      </div>
    </>
  );
}
