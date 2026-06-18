# SaaSPilot

The go-to knowledge hub for SaaS founders, developers, and operators. Expert guides on development, marketing, distribution, sales, and MVP building.

**Live domain:** [saaspilot.online](https://saaspilot.online)

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 + shadcn-style UI components
- motion/react for animations
- Express SSR for server-side rendering
- @dr.pogodin/react-helmet for SEO

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with SSR |
| `npm run build` | Production build (client + server) |
| `npm run start` | Run production server |
| `npm run preview` | Build and start production server |

## Project Structure

```
src/
├── components/     # UI, layout, home sections
├── data/           # Categories, resources, featured content
├── lib/            # Utils, SEO helpers, route registry
├── pages/          # Route-level page components
├── server/         # Express SSR entry point
├── entry-client.tsx
└── entry-server.tsx
```

## Pages

- `/` — Homepage with hero, categories bento grid, featured content, newsletter
- `/resources` — Filterable resource library with search
