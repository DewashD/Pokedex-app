export default function PokemonLoading() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      {/* Back link skeleton */}
      <div style={{
        height: 20,
        width: 140,
        background: "var(--surface)",
        borderRadius: 6,
        marginBottom: 28,
        backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
        backgroundSize: "400px 100%",
        animation: "shimmer 1.5s infinite",
      }} />

      <div style={{
        background: "var(--surface)",
        border: "2px solid var(--border)",
        borderRadius: 24,
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          background: "var(--card-bg)",
          padding: "40px 40px 24px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          alignItems: "flex-start",
        }}>
          <div>
            <div style={{ height: 12, width: 60, background: "var(--surface-light)", borderRadius: 6, marginBottom: 12 }} />
            <div style={{
              height: 40,
              width: 240,
              background: "var(--surface-light)",
              borderRadius: 8,
              marginBottom: 20,
              backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%)",
              backgroundSize: "400px 100%",
              animation: "shimmer 1.5s infinite",
            }} />
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ height: 32, width: 80, background: "var(--surface-light)", borderRadius: 20 }} />
            </div>
          </div>
          <div style={{
            width: 200,
            height: 200,
            background: "var(--surface-light)",
            borderRadius: "50%",
            backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
            backgroundSize: "400px 100%",
            animation: "shimmer 1.5s 0.1s infinite",
          }} />
        </div>

        {/* Body skeleton */}
        <div style={{ padding: "32px 40px" }}>
          <div style={{
            height: 12,
            width: 80,
            background: "var(--surface-light)",
            borderRadius: 6,
            marginBottom: 20,
          }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                height: 64,
                background: "var(--surface-light)",
                borderRadius: 10,
                backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
                backgroundSize: "400px 100%",
                animation: `shimmer 1.5s ${i * 80}ms infinite`,
              }} />
            ))}
          </div>
        </div>

        {/* Stats skeleton */}
        <div style={{ padding: "0 40px 40px" }}>
          <div style={{
            height: 12,
            width: 100,
            background: "var(--surface-light)",
            borderRadius: 6,
            marginBottom: 20,
          }} />
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}>
              <div style={{ width: 72, height: 14, background: "var(--surface-light)", borderRadius: 6, flexShrink: 0 }} />
              <div style={{ width: 40, height: 14, background: "var(--surface-light)", borderRadius: 6, flexShrink: 0 }} />
              <div style={{
                flex: 1,
                height: 12,
                background: "var(--surface-light)",
                borderRadius: 6,
                backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
                backgroundSize: "400px 100%",
                animation: `shimmer 1.5s ${i * 60}ms infinite`,
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
