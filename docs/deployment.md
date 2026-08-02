# Build, deployment, and operations

## Runtime

Pristha targets OpenAI Sites backed by Cloudflare Workers. Vinext compiles the
Next.js App Router application through Vite. Node.js 22.13 or newer is required.
The production worker entry is `worker/index.ts`.

## Environment and bindings

The current mock-backed UI requires no secrets. Public runtime variables are
declared and validated in `src/config/env.ts`; `.env.example` is the committed
template. Keep all private values out of Git.

`.openai/hosting.json` identifies the Sites project and currently declares no
D1 or R2 binding. `db/index.ts` fails with a useful message if code tries to use
the optional `DB` binding before it is configured. When persistence is added,
declare the binding in the hosting control plane, add migrations, and test the
adapter separately from page components.

## Local checks

Run the same gates used in CI:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run validate:artifact
npm run test:artifact
npm run test:e2e
```

`npm run build` is bounded and validates that `dist/server/index.js` has an ESM
default export with `fetch`, and that the hosting manifest is copied to
`dist/.openai/hosting.json`. `test:artifact` starts the built worker and checks
rendered metadata. Playwright checks direct routes and core reader, writer,
publisher, not-found, and mobile navigation journeys.

## CI

`.github/workflows/ci.yml` installs the lockfile under Node 22.13, then runs
type-checking, ESLint, Vitest, the production build, artifact validation, and
Chromium Playwright projects. A failing gate must be fixed rather than skipped.
Generated reports and traces are ignored locally and uploaded by CI only after
failure.

## Release and rollback

1. Merge only a commit for which CI is green.
2. Build/deploy that immutable Git commit through the existing Sites project.
3. Smoke-test `/`, `/discover`, a book, a reader route, `/studio`, its editor,
   and `/house` on the deployment.
4. If a release regresses, redeploy the last known-good Git commit. Do not edit
   generated `dist/` files or patch production outside source control.

The repository's `.openai/hosting.json` must keep the same project identity
unless the product is intentionally moved. Deployment access policy and
application authorization are separate controls: keep the host restricted as
appropriate and still enforce roles server-side for private actions.
