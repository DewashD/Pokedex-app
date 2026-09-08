"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      maxWidth: 600,
      margin: "80px auto",
      padding: "0 24px",
      textAlign: "center",
    }}>
      {/* Sad Pokéball */}
      <div style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        margin: "0 auto 32px",
        background: "linear-gradient(180deg, var(--red) 50%, white 50%)",
        border: "4px solid var(--black)",
        position: "relative",
        boxShadow: "0 8px 32px rgba(227,53,13,0.3)",
        animation: "float 2s ease-in-out infinite",
      }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: 4,
          background: "var(--black)",
        }} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "white",
          border: "4px solid var(--black)",
          zIndex: 1,
        }} />
      </div>

      <h1 style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "clamp(14px, 2.5vw, 20px)",
        color: "var(--red-light)",
        marginBottom: 16,
        lineHeight: 1.6,
      }}>
        Pokémon Not Found!
      </h1>

      <p style={{
        color: "var(--text-muted)",
        fontSize: 16,
        marginBottom: 24,
        lineHeight: 1.6,
      }}>
        We couldn&apos;t load this Pokémon. It may not exist or there could be a
        network issue. Please try again.
      </p>

      {error.message && (
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 24,
          fontSize: 13,
          color: "var(--text-muted)",
          fontFamily: "monospace",
          textAlign: "left",
          wordBreak: "break-word",
        }}>
          {error.message}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "12px 28px",
            background: "var(--red)",
            border: "2px solid var(--red-light)",
            color: "white",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: "'Nunito', sans-serif",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: "12px 28px",
            background: "var(--surface)",
            border: "2px solid var(--border)",
            color: "var(--text)",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 15,
            display: "inline-block",
          }}
        >
          Back to Pokédex
        </Link>
      </div>
    </div>
  );
}
