# Component and state guide

## Component layers

`src/components/ui` contains small reusable controls such as `Button`, `Icon`,
and `Modal`. `src/components/feedback` contains loading, empty, error, and toast
states. `src/components/layout` owns the application shell and page-heading
composition. These components have no knowledge of book or Studio fixtures.

Feature components live under `src/features/<domain>/components`. They accept
typed values from a route or service and own only their feature's rendering and
interactions. A feature component moves into shared code only after it has a
stable cross-feature responsibility.

## Server and client boundaries

Route files are server components by default. They load data through the
exports in `src/services/index.ts` and pass serializable props down. Client
components are used for controls that require browser state: global search,
drawers, dialogs, review composition, reader preferences, editor controls,
forms, and prototype mutations.

Do not turn a whole page into a client component merely to support one button.
Keep the interactive island as small as the experience allows.

## State ownership

| State | Owner | Examples |
| --- | --- | --- |
| Route state | URL | active route, book/chapter IDs |
| Query state | URL search parameters | search, format, genre, shelf, page |
| Server data | Service call in route | books, reviews, library, submissions |
| Cross-route prototype state | `PristhaProvider` | Studio books, selected draft, toast |
| Local interaction state | Feature component | modal, tab, theme, font size, form |
| Authentication | Server helper/policy | identity, membership, role checks |

The provider is intentionally narrow. A real backend should replace its Studio
mutations rather than expanding it into a cache for every domain.

## Service adapters

Contracts in `src/services/contracts` describe the operations pages need.
Mock implementations in `src/services/mock` fulfill those contracts without
exposing fixture imports to routes. A production adapter should validate API
responses, translate transport errors into domain errors, and keep its public
shape compatible with the contract.

## Accessibility conventions

- Preserve one logical `h1` per page and nested heading order.
- Give icon-only controls an accessible name.
- Use native controls first; preserve visible focus treatment.
- `Modal` traps focus, closes on Escape, and restores focus on dismissal.
- Announce save, toast, and form status with appropriate live regions.
- Preserve the skip link, reduced-motion rules, and color contrast when styling.
- Every data surface needs loading, empty, and recoverable error treatment.

## Visual language

The forest, ivory, teal, marigold, and warm-paper palette and the Manrope,
Cormorant Garamond, and Noto Serif Bengali font stack are product foundations.
Reuse the existing CSS tokens and editorial card/reader patterns. Avoid generic
dashboard components that erase the bilingual literary character.
