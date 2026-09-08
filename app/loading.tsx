export default function Loading() {
  return (
    <div style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "32px 24px",
    }}>
      {/* Hero skeleton */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          height: 48,
          width: 260,
          background: "var(--surface)",
          borderRadius: 8,
          margin: "0 auto 12px",
          animation: "shimmer 1.5s infinite",
          backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
          backgroundSize: "400px 100%",
        }} />
        <div style={{
          height: 20,
          width: 320,
          background: "var(--surface)",
          borderRadius: 8,
          margin: "0 auto",
          animation: "shimmer 1.5s infinite",
          backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
          backgroundSize: "400px 100%",
        }} />
      </div>

      {/* Search skeleton */}
      <div style={{
        height: 52,
        maxWidth: 480,
        background: "var(--surface)",
        borderRadius: 12,
        margin: "0 auto 32px",
        animation: "shimmer 1.5s infinite",
        backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
        backgroundSize: "400px 100%",
      }} />

      {/* Grid skeleton */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 16,
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--surface)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              height: 220,
              backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
              backgroundSize: "400px 100%",
              animation: `shimmer 1.5s ${i * 50}ms infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
