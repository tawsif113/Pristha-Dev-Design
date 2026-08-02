# Pristha frontend architecture

## Audit summary

The existing application is a visually complete prototype built around a single client route. app/page.tsx contains 18 view states, navigation, mock data, domain types, dialogs, editor state, and feature UI in 2,751 lines. app/globals.css contains the complete visual system and feature styling in 6,895 lines. Navigation is implemented with a View string union and setView, so direct links, refreshes, browser history, route metadata, route loading states, and route-specific error handling are unavailable.

The prototype already has valuable foundations that must be retained: the bilingual Manrope, Cormorant Garamond, and Noto Serif Bengali font stack; the forest, ivory, teal, and marigold palette; the editorial card and reader treatments; responsive breakpoints; reduced-motion handling; Cloudflare/Vinext build scripts; and the existing Sites hosting manifest.

Baseline findings before migration:

- TypeScript is strict, but a standalone type-check fails because Cloudflare Worker globals are not included in the TypeScript environment.
- Linting includes archived prototype files and fails on those files plus one editor effect in the active application.
- The only automated test validates the rendered deployment metadata after a production build.
- All current application data is embedded in the client bundle.
- The production assets in active use are the Pristha logo and Rumana profile and cover images.

## Target architecture

Pristha uses Next.js App Router routes as the source of navigation truth. Route files remain thin: they provide metadata, load data through typed services, and compose feature components. Shared shell state is limited to cross-route UI and prototype writer data that genuinely needs to survive client navigation.

~~~text
app/                         route definitions, layouts, metadata and boundaries
src/components/              reusable UI, feedback, navigation and layout components
src/features/                domain feature components and feature-local client state
src/services/contracts/      backend-independent data-access interfaces
src/services/mock/           temporary in-memory adapters
src/mocks/                   typed prototype fixtures
src/types/                   shared domain and query models
src/config/                  route and navigation configuration
src/lib/                     framework-facing utilities
src/utils/                   pure reusable functions
src/styles/                  design tokens and feature styling as it is extracted
~~~

## Route map

| Experience | Route |
| --- | --- |
| Home | / |
| Discover | /discover |
| Book details | /books/[bookId] |
| Chapter reader | /read/[bookId]/[chapterId] |
| Author profile | /profiles/[username] |
| Library | /library |
| Reading history | /reading-history |
| Bookmarks | /bookmarks |
| Notifications | /notifications |
| Settings | /settings |
| Studio overview | /studio |
| Studio books | /studio/books |
| Studio book | /studio/books/[bookId] |
| Chapter editor | /studio/books/[bookId]/chapters/[chapterId]/edit |
| Audience | /studio/audience |
| Analytics | /studio/analytics |
| Publishing-house overview | /house |
| Catalogue | /house/catalogue |
| Submissions | /house/submissions |
| Storefront | /house/storefront |
| Scouting | /house/scouting |
| Team | /house/team |

Filters, tabs, sorting, and pagination use URL search parameters. Route builders in src/config/routes.ts prevent hardcoded dynamic URLs.

## Feature and component boundaries

Shared components provide the application shell, route-aware navigation, header search, dialogs, feedback states, and UI primitives. Domain components remain within books, discovery, reader, reviews, studio, editor, audience, profiles, settings, notifications, or publishing-house features. A component moves to shared only after it has a stable cross-feature responsibility.

The full-screen reader is outside the dashboard shell. Studio and publishing-house routes use the same visual shell but receive separate navigation groups and route metadata.

## Data access

Feature routes and server components depend on service contracts, not raw fixtures. Mock adapters currently resolve typed fixtures asynchronously. A future HTTP adapter can implement the same contracts without changing page or presentation components. Mutating prototype interactions remain explicit client actions and are labelled as local prototype behavior.

## State management

- Route and query state: pathname, dynamic segments, and URL search parameters.
- Server data: service calls from server components.
- Stable cross-route prototype state: a focused PristhaProvider for studio manuscripts, selected draft, and toast messages.
- Local interaction state: dialogs, dropdowns, reader preferences, review composition, and editor controls.
- Authentication: a server-enforceable interface compatible with the existing ChatGPT/Sites helpers; no fake client-side authorization.

## Deployment strategy

The repository retains Vinext, Vite, Cloudflare Workers, the Sites plugin, and .openai/hosting.json. npm run build must continue to emit dist/server/index.js with a default fetch export and dist/.openai/hosting.json. CI validates type-checking, linting, tests, the production build, and the artifact. Node.js 22.13 or newer is required.

## Migration decisions

1. Preserve existing design classes while extracting feature JSX; styling is split only after a feature is stable to reduce visual regression risk.
2. Replace currentView state immediately with App Router navigation.
3. Use React Server Components for route data and composition; add client boundaries only around interactive feature controls.
4. Keep prototype data, but move it behind typed contracts.
5. Exclude archived legacy-prototype assets from active lint and TypeScript quality gates without deleting the visual reference material.
6. Do not add D1, authentication, or a backend until product requirements define persistence and access rules.
