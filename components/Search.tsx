"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setValue(q);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set("q", q.toLowerCase());
        params.delete("page");
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  function handleClear() {
    setValue("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
      {/* Search icon */}
      <div style={{
        position: "absolute",
        left: 16,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        fontSize: 18,
        pointerEvents: "none",
        zIndex: 1,
      }}>
        🔍
      </div>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search Pokémon by name…"
        style={{
          width: "100%",
          padding: "14px 48px 14px 48px",
          background: "var(--surface)",
          border: `2px solid ${isPending ? "var(--yellow)" : "var(--border)"}`,
          borderRadius: 12,
          color: "var(--text)",
          fontSize: 16,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 600,
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: isPending ? "0 0 0 3px rgba(255,203,5,0.2)" : "none",
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = "var(--yellow)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,203,5,0.15)";
        }}
        onBlur={e => {
          if (!isPending) {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      />

      {/* Clear / loading button */}
      {value && (
        <button
          onClick={handleClear}
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            background: "var(--surface-light)",
            border: "none",
            color: "var(--text-muted)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            cursor: "pointer",
          }}
          title="Clear search"
        >
          ✕
        </button>
      )}

      {isPending && (
        <div style={{
          position: "absolute",
          right: value ? 48 : 14,
          top: "50%",
          transform: "translateY(-50%)",
          width: 16,
          height: 16,
          border: "2px solid var(--yellow)",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.6s linear infinite",
        }} />
      )}
    </div>
  );
}
