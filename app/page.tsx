import { Suspense } from "react";
import { getPokemonList, getPokemonIdFromUrl } from "@/lib/pokemon";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import FavoriteToggle from "@/components/FavoriteToggle";

const PAGE_SIZE = 20;

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function PokemonGrid({ q, page }: { q: string; page: number }) {
  const offset = (page - 1) * PAGE_SIZE;
  // Fetch a large batch to support client-side search filter
  const data = await getPokemonList(q ? 10000 : PAGE_SIZE, q ? 0 : offset);

  let results = data.results;
  if (q) {
    results = results.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  const totalPages = q
    ? 1
    : Math.ceil(data.count / PAGE_SIZE);

  if (results.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "80px 24px",
        color: "var(--text-muted)",
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 14,
          marginBottom: 12,
          color: "var(--text)",
        }}>
          No Pokémon Found
        </div>
        <div style={{ fontSize: 16 }}>
          No Pokémon match &quot;{q}&quot;. Try a different name!
        </div>
      </div>
    );
  }

  return (
    <>
      {q && (
        <div style={{
          marginBottom: 16,
          color: "var(--text-muted)",
          fontSize: 14,
          fontWeight: 600,
        }}>
          Found {results.length} Pokémon matching &quot;{q}&quot;
        </div>
      )}

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 16,
      }}>
        {results.map((pokemon, i) => {
          const id = getPokemonIdFromUrl(pokemon.url);
          return (
            <div key={pokemon.name} style={{ position: "relative" }}>
              <PokemonCard name={pokemon.name} url={pokemon.url} index={i} />
              <FavoriteToggle pokemonName={pokemon.name} pokemonId={id} compact />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Suspense>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasSearch={!!q}
        />
      </Suspense>
    </>
  );
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q || "";
  const page = Math.max(1, parseInt(params.page || "1", 10));

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      {/* Hero */}
      <div style={{
        textAlign: "center",
        marginBottom: 40,
      }}>
        <h1 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(18px, 4vw, 32px)",
          color: "var(--yellow)",
          textShadow: "3px 3px 0 var(--red-dark)",
          marginBottom: 12,
          lineHeight: 1.4,
        }}>
          Pokédex
        </h1>
        <p style={{
          color: "var(--text-muted)",
          fontSize: 16,
          maxWidth: 480,
          margin: "0 auto",
        }}>
          Browse all Pokémon, search by name, and save your favorites!
        </p>
      </div>

      {/* Search bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <Suspense>
          <Search />
        </Suspense>
      </div>

      {/* Grid content */}
      <Suspense fallback={<GridSkeleton />}>
        <PokemonGrid q={q} page={page} />
      </Suspense>
    </div>
  );
}

function GridSkeleton() {
  return (
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
            backgroundImage:
              "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
            backgroundSize: "400px 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      ))}
    </div>
  );
}
