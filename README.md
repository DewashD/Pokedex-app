# Pokédex App

A Pokédex web app built with Next.js, React, and TypeScript. Browse, search, and paginate through Pokémon, view detailed stats for each one, and save your favorites — all powered by the public [PokéAPI](https://pokeapi.co/).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![CI](https://github.com/DewashD/pokedex-app/actions/workflows/ci.yml/badge.svg)

**[Live Demo →] https://pokedex-app-dewash.vercel.app

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


