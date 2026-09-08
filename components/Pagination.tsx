"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  hasSearch: boolean;
}

export default function Pagination({ currentPage, totalPages, hasSearch }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (hasSearch || totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const windowStart = Math.max(1, currentPage - 2);
  const windowEnd   = Math.min(totalPages, currentPage + 2);
  const visible = pages.slice(windowStart - 1, windowEnd);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "32px 0 48px",
      flexWrap: "wrap",
    }}>
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
        style={btnStyle(false, currentPage === 1)}
      >
        ← Prev
      </button>

      {windowStart > 1 && (
        <>
          <button onClick={() => goTo(1)} style={btnStyle(false, false)}>1</button>
          {windowStart > 2 && <span style={{ color: "var(--text-muted)" }}>…</span>}
        </>
      )}

      {visible.map(p => (
        <button
          key={p}
          onClick={() => goTo(p)}
          style={btnStyle(p === currentPage, false)}
        >
          {p}
        </button>
      ))}

      {windowEnd < totalPages && (
        <>
          {windowEnd < totalPages - 1 && <span style={{ color: "var(--text-muted)" }}>…</span>}
          <button onClick={() => goTo(totalPages)} style={btnStyle(false, false)}>{totalPages}</button>
        </>
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
        style={btnStyle(false, currentPage === totalPages)}
      >
        Next →
      </button>
    </div>
  );
}

function btnStyle(active: boolean, disabled: boolean): React.CSSProperties {
  return {
    padding: "8px 16px",
    borderRadius: 8,
    border: `2px solid ${active ? "var(--yellow)" : "var(--border)"}`,
    background: active ? "var(--yellow)" : "var(--surface)",
    color: active ? "var(--black)" : disabled ? "var(--text-muted)" : "var(--text)",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: "'Nunito', sans-serif",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.15s",
  };
}
