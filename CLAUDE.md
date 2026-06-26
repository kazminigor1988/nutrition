# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the local dev server (http://localhost:3000)
- `npm run build` — produce the static export into `out/` (uses `output: 'export'`)
- `npm run lint` — run `next lint`
- `npm run deploy` — build and publish `out/` to the `gh-pages` branch via `gh-pages -d out`

There is no test runner configured.

## Deployment specifics

This is a fully static site deployed to GitHub Pages at `https://kazminigor1988.github.io/nutrition`. Two things in `next.config.mjs` exist solely because of that:

- `basePath: '/nutrition'` — every internal link/asset is prefixed with `/nutrition`. Do not remove this unless the repo name changes.
- `images: { unoptimized: true }` — GitHub Pages has no Next image-optimization runtime, so any new image work must stay compatible with the static loader.

`output: 'export'` means there is **no server runtime at all** — no API routes, no Server Actions, no `revalidate`, no `cookies()`. Any feature that needs a server must instead live in the browser (typically `localStorage`).

## Architecture

A single-page nutrition tracker. All state is client-side; the only persistence is `localStorage`. The app is structured around one "feature" component (`NutritionList`) that owns the state and orchestrates three presentational children.

### Data shape (`src/constants/nutrition-groups.constants.ts`)

The product catalog is a hand-curated constant: an array of `NutritionCategory` (e.g. "Перше", "М'ясне", "Молочка 1"), each containing `NutritionItem`s with **either** a `weight` (grams) **or** an `amount` (count). Which field is set determines the unit displayed in the UI (`weight → "г"`, `amount → "шт"`). Code that reads items must handle both — see `getItemMaxAmount` / `getItemUnit` in `NutritionList.tsx`.

There are **two** parallel catalogs exported:
- `categoryWithFoodsTakeWeight` — daily totals for *gaining* weight
- `categoryWithFoods` — daily totals for *losing* weight (currently the one imported everywhere)

When tweaking daily allowances, edit the relevant catalog; do not introduce a third unless you also wire selection logic to pick between them.

### Substitution invariant (the core rule)

Items within a category are **substitutable**. The UI enforces that per-category consumption never exceeds 100%, where each item contributes `amount / maxAmount * 100` percent. This is checked in two places that must stay in sync:

1. `calculateAvailableAmount` / `getAvailablePercentage` — derives the remaining headroom shown in the "Доступні" tab and used as the slider's effective max.
2. `handleConfirm` — recomputes the total category percentage with the proposed new amount and **rejects** the change (`alert(...)`) if it would push the category over 100%.

If you add a new way to change `selectedItems`, the same invariant must hold.

### Persistence

Stored under the single localStorage key `nutrition-history` as `{ "YYYY-MM-DD": SelectedItem[] }`. The app reads only *today's* entry on mount and writes today's entry on every change to `selectedItems`. Historical days are kept but not surfaced anywhere in the current UI — preserve the per-date shape if you touch this code. "Сбросить съеденное" deletes only today's key, not the whole history.

### Component layout

- `app/page.tsx` — thin shell, renders `<NutritionList />` as a client component.
- `components/NutritionList.tsx` — owns `selectedItems`, dialog state, all percentage math, and the localStorage round-trip. Builds the tab list dynamically (the "З'їдені" tab only appears when there's something to show).
- `components/AvailableProductsList.tsx` / `ConsumedProductsList.tsx` — pure presentational lists. Both receive the same `onItemClick` so editing a previously consumed item opens the same dialog.
- `components/AmountSelectionDialog.tsx` — `@headlessui/react` Dialog with a range slider. Step is `1` for count items or non-multiple-of-5 max, otherwise `5`.

### Conventions

- `@/*` resolves to `./src/*` (see `tsconfig.json`).
- All components that touch state or `window` are marked `'use client'`.
- UI strings are a mix of Ukrainian and Russian (catalog data is Ukrainian; some buttons and dialog labels are Russian). Match the existing language of the surrounding text rather than normalizing.
