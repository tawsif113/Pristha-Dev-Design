# Pristha

Pristha is a bilingual reading, writing, and publishing workspace for Bengali
stories. This repository contains the production-oriented frontend
transformation of the original single-page prototype: real App Router routes,
typed domain services, responsive reader and authoring experiences, a
publishing-house workspace, accessible interaction states, automated tests,
and a Cloudflare Sites deployment artifact.

## Product areas

- Reader: home recommendations, discovery, book details, chapter reading,
  reviews, profiles, library, history, bookmarks, and notifications.
- Writer: Studio overview, manuscript management, chapter editing, audience,
  and analytics.
- Publisher: overview, catalogue, submissions, storefront, scouting, and team.

All route data currently comes from typed mock adapters. Client mutations such
as creating a manuscript are intentionally session-local until a persistence
API is connected. Authentication helpers are available, but public prototype
routes do not yet enforce sign-in or roles.

## Requirements

- Node.js 22.13 or newer (see `.node-version`)
- npm
- Linux is required by the bounded Sites build/install helpers

## Local development

```bash
npm ci
npm run dev
```

The development server uses Vinext/Vite. Open the URL printed by the command.
No environment values are required for the mock-backed experience; copy
`.env.example` when introducing a real API.

## Quality commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:artifact
npm run test:e2e
```

`npm run build` creates `dist/server/index.js` and validates the Sites hosting
manifest. Playwright starts a local server unless `PLAYWRIGHT_BASE_URL` points
to an existing deployment.

## Project shape

```text
app/                     routes, layouts, metadata, and route boundaries
src/components/          shared layout, feedback, and UI primitives
src/features/            domain-oriented presentation and interaction code
src/services/contracts/  backend-independent service interfaces
src/services/mock/       temporary typed in-memory adapters
src/mocks/               prototype fixtures
src/types/               shared domain models
src/config/              navigation, environment, and route builders
tests/unit/               pure utility, service, and component tests
tests/e2e/                desktop and mobile journey tests
docs/                     architecture, routing, components, and deployment
```

Start with [frontend architecture](docs/frontend-architecture.md), then see
[routing](docs/routing.md), [components](docs/components.md), and
[deployment](docs/deployment.md).

## Data and authentication handoff

Replace exports in `src/services/index.ts` with HTTP-backed implementations of
the existing contracts. Preserve server-side loading in route components and
use client state only for local interaction. For protected account or writing
routes, use `requireChatGPTUser()` from `app/chatgpt-auth.ts` and add the
application's own role or membership checks; identity headers alone are not an
authorization policy.

## Deployment

The project targets OpenAI Sites on Cloudflare Workers through Vinext. The
checked-in `.openai/hosting.json` identifies the existing Sites project. Do not
commit secrets, generated `dist/` output, or local Wrangler state. See
[docs/deployment.md](docs/deployment.md) for CI, artifact, binding, and rollback
details.
