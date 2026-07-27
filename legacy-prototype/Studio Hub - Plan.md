# Studio Hub — Build Plan

> Status: **implemented.** "Write a chapter" is renamed to **Studio** and is now the rich writer's home described below (greeting/streak/CTAs, চলতি লেখা, আমার বই, লেখার টুলস, প্রকাশনা সংস্থা + scouting offer, চুক্তি, earnings snapshot). Dashboard stayed a separate analytics page; the editor nav row was dropped in favor of contextual entry points, matching the recommended decisions below.

## Intent
Give the writer a generous home base — "spoiled by tools." One page that gathers everything they create and manage: their books, what they're writing now, a deep toolbox, the houses that carry their work, and their contracts. The line-by-line writing happens in the existing **editor**, opened *from* here. Hard numbers stay in **Dashboard**.

## Navigation / IA change
Sidebar "Write · Studio" group becomes:
- **Studio** ← rename of the current "Write a chapter" row; opens the new hub (not the editor directly)
- **Dashboard** ← unchanged (analytics: stats, earnings chart, payouts/withdraw)
- **Audience** ← unchanged

The **editor** loses its own nav row; it opens contextually from Studio ("Continue writing" a chapter, "New chapter", a book's "Add chapter") and from Dashboard's New-chapter button.

Internal view-id remap (mechanical):
- new hub → `view:'studio'`, label **Studio**
- current at-a-glance (`view:'studio'`) → `view:'dashboard'`, label **Dashboard**
- `editor`, `audience` unchanged
- update: nav object, `vStudio`/new `vDashboard` flags, every `data-view="studio"`, `go()` targets, and the `startView` prop enum.

## The Studio hub page — sections (top → bottom)
1. **Header / greeting** — "Studio", writing streak (e.g. "৭ দিন ধরে লিখছেন"), primary **Continue writing** CTA (jumps to last-edited chapter) + **New chapter** / **New book**. Quick chips: words this week · chapters published · active readers · available payout.
2. **Continue writing** ("চলতি লেখা") — recent drafts / in-progress chapters: book · chapter · status (draft / in review / scheduled) · word count · last-edited · reviewer badge. Click → editor.
3. **My books** ("আমার বই") — every authored title as a rich card: cover, status (live / early-access / draft), chapters, reads, revenue, progress. Actions: open · add chapter · manage. Plus a **Start a new book / serial** card.
4. **Writing tools** ("লেখার টুলস") — the "spoiled" grid of tappable tiles (icon + name + one-line desc):
   - Distraction-free editor · Outline & chapter board · Character & place notebook · Bangla spell-check & typing (Avro/Unicode) · **AI assistant** (continue / rephrase / brainstorm in Bangla) [Pro] · Readability & style check · Version history & drafts · **Cover designer** [Pro] · Import from Word/Google Docs · Serial scheduler & calendar · Chapter templates · Read-aloud (TTS) preview.
5. **Publishing houses** ("প্রকাশনা সংস্থা") — houses that sell the writer's books: name · titles placed · revenue split · status (active partner / offer pending). Includes the **scouting / print-rights inbox** (e.g. "বাতায়ন sent a print-rights offer for চিঠি" → review).
6. **Contracts** ("চুক্তি") — active + pending agreements: title · counterparty · type (digital serial / print rights / exclusive early-access) · royalty % · term · status (active / awaiting signature / expiring). Actions: view · sign · download PDF.
7. **Earnings snapshot** — compact available-payout + Withdraw, with a link to the full **Dashboard**.

## New state / data
- Extend `this.books` entries with: `authored:true`, `status`, `chaptersList`, `reads`, `revenue`.
- `recentChapters` — `{bookId, chapter, status, words, edited, reviewer}`.
- `tools` — static `{icon, name, desc, pro, action}` list.
- `houses` — `{name, titles, split, status}` + `offers` (scouting/print-rights).
- `contracts` — `{id, title, house, type, royalty, term, status}`.
- `streak`, `wordsThisWeek` (display values).

## Interactions
- Recent-chapter / book card / "Add chapter" / "New chapter" → open `editor`.
- Tool tile → Editor tile opens editor; others fire a toast ("শীঘ্রই আসছে" / opens a stub) — a few (templates, version history) could open small modals later.
- House offer **Accept** / contract **Sign** → toast confirmation (reuse existing toast + optional confirm modal pattern from the bKash sheet).
- Withdraw → existing `withdraw()`.

## Implementation steps (token-budgeted, future turn)
1. **Rename** `studio`→`dashboard` everywhere (nav row label stays "Dashboard"; flag `vDashboard`; data-view; go targets; prop enum). Small mechanical diff.
2. **State + renderVals**: add `recentChapters`, `tools`, `houses`, `contracts`, authored-books derivation, handlers (`openTool`, `openBook`, `signContract`, `acceptOffer`).
3. **Template**: insert the new `<sc-if value="{{ vStudio }}">` hub at the VIEWS marker (largest piece — do in its own edit).
4. **Nav**: rename "Write a chapter" → "Studio" (book/quill icon), point at hub; drop the standalone editor row.
5. Verify (load, click-through, console).

Estimated ~3 tool calls of writing; keep the hub template as one `<sc-if>` block reusing the established inline-style vocabulary (ink #15141d, saffron #f4a41c, peacock #27b0a2, Libre Bodoni / Tiro Bangla / JetBrains Mono).

## Decisions to confirm before building
1. **Dashboard**: keep it as a separate analytics page (recommended), or fold its numbers into the Studio hub and drop the Dashboard row?
2. **Editor nav row**: remove it (Studio replaces it, editor opens contextually — recommended), or keep both?
3. **Tool depth**: are the writing tools mostly *showcase tiles* (toasts/stubs) for now, or should 1–2 (e.g. Outline board, Version history) be built as working mini-features?
