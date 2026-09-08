# Pokédex App

A Pokédex web app built with Next.js, React, and TypeScript. Browse, search, and paginate through Pokémon, view detailed stats for each one, and save your favorites — all powered by the public [PokéAPI](https://pokeapi.co/).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![CI](https://github.com/DewashD/pokedex-app/actions/workflows/ci.yml/badge.svg)

**[Live Demo →](#)** *(add your Vercel URL here once deployed)*

## Features

- 🔍 **Search** — filter Pokémon by name
- 📄 **Pagination** — browse the full Pokédex in pages
- 📊 **Detail pages** — stats, types, abilities, and moves for each Pokémon
- ⭐ **Favorites** — mark and view your favorite Pokémon
- 🎨 **Official artwork sprites** — pulled live from PokéAPI's sprite repo
- ⚡ **Server-side rendering** with cached data fetching via the Next.js App Router

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PokéAPI](https://pokeapi.co/) for Pokémon data

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

This repo includes two GitHub Actions workflows:

- **`ci.yml`** — runs lint + build checks on every push and pull request. Works out of the box, no setup needed.
- **`deploy.yml`** — automatically deploys to [Vercel](https://vercel.com) on every push to `main`. To enable it:
  1. Create a free Vercel account and run `vercel link` locally once to create a project.
  2. Generate a token at [vercel.com/account/tokens](https://vercel.com/account/tokens).
  3. In your GitHub repo, go to **Settings → Secrets and variables → Actions** and add:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID` (from `.vercel/project.json` after linking)
     - `VERCEL_PROJECT_ID` (from `.vercel/project.json` after linking)
  4. Push to `main` — it'll deploy automatically. Grab the live URL from Vercel and drop it into the demo link at the top of this README.

If you'd rather skip CI/CD, you can also just deploy manually by importing the repo directly at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js, no config needed.

## Project Structure

```
app/                  # Routes (App Router)
  ├─ page.tsx          # Home page — grid, search, pagination
  └─ pokemon/[name]/   # Individual Pokémon detail page
components/           # Reusable UI components (cards, search bar, pagination, favorites)
lib/                  # PokéAPI client & data helpers
```

## About

Originally built as a class project (CMPSC 421) exploring the Next.js App Router, server components, and working with a public REST API.

## License

MIT — see [LICENSE](LICENSE).
