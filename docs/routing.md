# Routing and page ownership

Pristha uses Next.js App Router paths as the source of truth. Navigation uses
`next/link` and `useRouter`; feature code never changes a global view string.
Dynamic route values are encoded through the builders in
`src/config/routes.ts`. Search, genre, format, shelf, sort, and pagination state
belongs in URL search parameters so pages remain linkable and refresh-safe.

## Route inventory

| Route | Owner | Shell | Data source |
| --- | --- | --- | --- |
| `/` | Library/home | Writer | Book and library services |
| `/discover` | Discovery | Writer | Book service and URL filters |
| `/books/[bookId]` | Books/reviews | Writer | Book and review services |
| `/read/[bookId]/[chapterId]` | Reader | Full screen | Book service |
| `/profiles/[username]` | Profiles | Writer | Library service |
| `/library` | Library | Writer | Library service |
| `/reading-history` | Library | Writer | Library service |
| `/bookmarks` | Library | Writer | Library service |
| `/notifications` | Notifications | Writer | Notification fixtures |
| `/settings` | Settings | Writer | Local form state |
| `/studio` | Studio | Writer | Studio service/context |
| `/studio/books` | Studio | Writer | Studio service/context |
| `/studio/books/[bookId]` | Studio | Writer | Studio service/context |
| `/studio/books/[bookId]/chapters/[chapterId]/edit` | Editor | Writer | Studio service/context |
| `/studio/audience` | Audience | Writer | Studio fixtures |
| `/studio/analytics` | Analytics | Writer | Studio fixtures |
| `/house` | Publishing house | House | Publishing-house service |
| `/house/catalogue` | Publishing house | House | Publishing-house service |
| `/house/submissions` | Publishing house | House | Publishing-house service |
| `/house/storefront` | Publishing house | House | Publishing-house service |
| `/house/scouting` | Publishing house | House | Publishing-house service |
| `/house/team` | Publishing house | House | Publishing-house service |

## Layouts and boundaries

`app/layout.tsx` owns fonts, global metadata, the prototype state provider, and
the skip link. `app/(platform)/layout.tsx` owns the route-aware application
shell. `app/(reader)/` intentionally bypasses the dashboard shell for a focused
chapter experience. Root loading, error, global-error, and not-found boundaries
provide meaningful recovery states; discovery and Studio add scoped loading
feedback.

Public pages expose canonical metadata, Open Graph data, `robots.ts`, and a
`sitemap.ts`. Account, Studio, and house routes opt out of indexing where their
page metadata is private. When identity is enforced, request-dependent routes
must also use dynamic rendering.

## Adding a route

1. Add a route builder and, when relevant, a navigation entry.
2. Keep the route component server-rendered and load through a service contract.
3. Compose a feature component; add `"use client"` only around interaction.
4. Add metadata and loading/error behavior appropriate to the route.
5. Cover direct navigation and one core interaction in Playwright.
