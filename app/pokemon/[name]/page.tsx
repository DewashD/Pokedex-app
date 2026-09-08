import Image from "next/image";
import Link from "next/link";
import { getPokemon, getFirst151, capitalize, padId, getSpriteUrl } from "@/lib/pokemon";
import FavoriteButton from "@/components/FavoriteButton";

// Pre-render first 151 Pokémon
export async function generateStaticParams() {
  const list = await getFirst151();
  return list.map((p) => ({ name: p.name }));
}

interface Props {
  params: Promise<{ name: string }>;
}

const TYPE_COLORS: Record<string, string> = {
  normal: "#9fa19f",
  fire: "#e62829",
  water: "#2980ef",
  electric: "#fac000",
  grass: "#3fa129",
  ice: "#3dcef3",
  fighting: "#ff8000",
  poison: "#9141cb",
  ground: "#915121",
  flying: "#81b9ef",
  psychic: "#ef4179",
  bug: "#91a119",
  rock: "#afa981",
  ghost: "#704170",
  dragon: "#5060e1",
  dark: "#49392f",
  steel: "#60a1b8",
  fairy: "#ef70ef",
};

const STAT_COLORS: Record<string, string> = {
  hp: "#ff5959",
  attack: "#f5ac78",
  defense: "#fae078",
  "special-attack": "#9db7f5",
  "special-defense": "#a7db8d",
  speed: "#fa92b2",
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpAtk",
  "special-defense": "SpDef",
  speed: "SPD",
};

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const primaryColor = TYPE_COLORS[primaryType] || "#9fa19f";
  const spriteUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    getSpriteUrl(pokemon.id);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      {/* Back link */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "var(--text-muted)",
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 28,
          transition: "color 0.2s",
        }}

      >
        ← Back to Pokédex
      </Link>

      {/* Main card */}
      <div style={{
        background: "var(--surface)",
        border: "2px solid var(--border)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "var(--shadow)",
        animation: "fadeIn 0.5s ease",
      }}>
        {/* Header with gradient */}
        <div style={{
          background: `linear-gradient(135deg, ${primaryColor}33 0%, var(--card-bg) 100%)`,
          borderBottom: `3px solid ${primaryColor}66`,
          padding: "40px 40px 24px",
          position: "relative",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          alignItems: "flex-start",
        }}>
          {/* Pokéball background decoration */}
          <div style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: `40px solid ${primaryColor}15`,
            pointerEvents: "none",
          }} />

          {/* Left: info */}
          <div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 12,
              color: "var(--text-muted)",
              marginBottom: 8,
            }}>
              #{padId(pokemon.id)}
            </div>

            <h1 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(16px, 3vw, 28px)",
              color: "white",
              textShadow: `2px 2px 0 ${primaryColor}88`,
              marginBottom: 16,
              lineHeight: 1.3,
            }}>
              {capitalize(pokemon.name)}
            </h1>

            {/* Types */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`type-${type.name}`}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 800,
                    textTransform: "capitalize",
                    letterSpacing: 0.5,
                  }}
                >
                  {type.name}
                </span>
              ))}
            </div>

            {/* Favorite button */}
            <FavoriteButton pokemonName={pokemon.name} pokemonId={pokemon.id} />
          </div>

          {/* Right: sprite */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "float 3s ease-in-out infinite",
          }}>
            <Image
              src={spriteUrl}
              alt={pokemon.name}
              width={200}
              height={200}
              style={{
                filter: `drop-shadow(0 8px 24px ${primaryColor}66)`,
                imageRendering: "auto",
                maxWidth: "100%",
              }}
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Body */}
        <div style={{
          padding: "32px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
        }}>
          {/* Profile */}
          <section>
            <SectionHeader>Profile</SectionHeader>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <StatBox label="Height" value={`${pokemon.height / 10} m`} />
              <StatBox label="Weight" value={`${pokemon.weight / 10} kg`} />
              <StatBox label="Base XP" value={String(pokemon.base_experience)} />
              <StatBox label="Abilities" value={pokemon.abilities.length.toString()} />
            </div>
          </section>

          {/* Abilities */}
          <section>
            <SectionHeader>Abilities</SectionHeader>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <div
                  key={ability.name}
                  style={{
                    padding: "10px 14px",
                    background: "var(--surface-light)",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 700, textTransform: "capitalize" }}>
                    {capitalize(ability.name)}
                  </span>
                  {is_hidden && (
                    <span style={{
                      fontSize: 11,
                      background: "var(--card-bg)",
                      padding: "2px 8px",
                      borderRadius: 6,
                      color: "var(--text-muted)",
                      fontWeight: 700,
                    }}>
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Base Stats */}
        <div style={{ padding: "0 40px 32px" }}>
          <SectionHeader>Base Stats</SectionHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pokemon.stats.map(({ stat, base_stat }) => {
              const color = STAT_COLORS[stat.name] || "#ffffff";
              const pct = Math.min((base_stat / 255) * 100, 100);
              return (
                <div key={stat.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 72,
                    textAlign: "right",
                    fontSize: 12,
                    fontWeight: 800,
                    color: color,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    flexShrink: 0,
                  }}>
                    {STAT_LABELS[stat.name] || capitalize(stat.name)}
                  </div>
                  <div style={{
                    width: 40,
                    textAlign: "right",
                    fontWeight: 800,
                    fontSize: 15,
                    color: "var(--text)",
                    flexShrink: 0,
                  }}>
                    {base_stat}
                  </div>
                  <div style={{
                    flex: 1,
                    height: 12,
                    background: "var(--surface-light)",
                    borderRadius: 6,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${color}cc, ${color})`,
                      borderRadius: 6,
                      transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Moves preview */}
        <div style={{ padding: "0 40px 40px" }}>
          <SectionHeader>Moves (first 20)</SectionHeader>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}>
            {pokemon.moves.slice(0, 20).map(({ move }) => (
              <span
                key={move.name}
                style={{
                  padding: "5px 12px",
                  background: "var(--surface-light)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "capitalize",
                }}
              >
                {capitalize(move.name)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation: prev / next */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 24,
        gap: 12,
      }}>
        {pokemon.id > 1 ? (
          <Link
            href={`/pokemon/${pokemon.id - 1}`}
            style={{
              padding: "10px 20px",
              background: "var(--surface)",
              border: "2px solid var(--border)",
              borderRadius: 10,
              fontWeight: 700,
              color: "var(--text)",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "border-color 0.2s",
            }}
          >
            ← #{padId(pokemon.id - 1)}
          </Link>
        ) : <div />}

        <Link
          href={`/pokemon/${pokemon.id + 1}`}
          style={{
            padding: "10px 20px",
            background: "var(--surface)",
            border: "2px solid var(--border)",
            borderRadius: 10,
            fontWeight: 700,
            color: "var(--text)",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "border-color 0.2s",
          }}
        >
          #{padId(pokemon.id + 1)} →
        </Link>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 11,
      color: "var(--yellow)",
      marginBottom: 16,
      letterSpacing: 1,
      textTransform: "uppercase",
    }}>
      {children}
    </h2>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: "var(--surface-light)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "12px 14px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{value}</div>
    </div>
  );
}
