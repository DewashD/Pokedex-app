import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      maxWidth: 600,
      margin: "80px auto",
      padding: "0 24px",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 80,
        color: "var(--text-muted)",
        marginBottom: 24,
        lineHeight: 1,
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "clamp(14px, 2.5vw, 20px)",
        color: "var(--yellow)",
        marginBottom: 16,
        lineHeight: 1.6,
      }}>
        Page Not Found
      </h1>
      <p style={{
        color: "var(--text-muted)",
        fontSize: 16,
        marginBottom: 32,
        lineHeight: 1.6,
      }}>
        The page you&apos;re looking for doesn&apos;t exist. It may have fled
        into tall grass!
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 28px",
          background: "var(--red)",
          border: "2px solid var(--red-light)",
          color: "white",
          borderRadius: 10,
          fontWeight: 800,
          fontSize: 15,
          display: "inline-block",
          boxShadow: "0 4px 16px rgba(227,53,13,0.3)",
        }}
      >
        Return to Pokédex
      </Link>
    </div>
  );
}
