"use client";

import { useEffect } from "react";

export default function Error({
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
        fontSize: "clamp(16px, 3vw, 24px)",
        color: "var(--red-light)",
        marginBottom: 16,
        lineHeight: 1.5,
      }}>
        Something went wrong!
      </h1>

      <p style={{
        color: "var(--text-muted)",
        fontSize: 16,
        marginBottom: 8,
        lineHeight: 1.6,
      }}>
        We couldn&apos;t load the Pokédex data. This might be a network issue
        or the PokéAPI may be temporarily unavailable.
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
            transition: "all 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--red-dark)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--red)")}
        >
          Try Again
        </button>
        <a
          href="/"
          style={{
            padding: "12px 28px",
            background: "var(--surface)",
            border: "2px solid var(--border)",
            color: "var(--text)",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 15,
            fontFamily: "'Nunito', sans-serif",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
