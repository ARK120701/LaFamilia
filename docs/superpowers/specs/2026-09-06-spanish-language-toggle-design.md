# Spanish Language Toggle — Design

## Goal
Let a visitor flip the entire site (all 17 static HTML pages) between English and Spanish instantly, without a page reload, with the choice remembered as they browse.

## Mechanism
- Every translatable element carries a `data-es="..."` attribute holding its Spanish `innerHTML` (nested inline markup like `<br>` can sit directly in the attribute value — no escaping needed unless the Spanish text itself contains a `"`, in which case use `&quot;`).
- `js/main.js` gains an i18n block that:
  1. Reads the saved language from `localStorage` (`lf-lang`, default `en`).
  2. `applyLanguage(lang)`: for every `[data-es]` element, caches the original English `innerHTML` into `data-original` (once) then sets `innerHTML` to the target language's version — Spanish from `data-es`, English by restoring `data-original`.
  3. Updates `document.documentElement.lang`.
  4. Updates the toggle button's own label/aria-label.
- Toggling is instant, client-side only, no network request, no page reload.
- Runs as the first block inside the existing `DOMContentLoaded` handler in `main.js` (shared by every page already).

## Toggle UI
- A pill button in the top info bar (`.topbar`, next to phone/address/hours), new `.topbar-lang` wrapper, `id="lang-toggle"`.
- Label shows the *target* language: "Español" when currently English, "English" when currently Spanish.
- Click → flips `localStorage` value → re-applies → persists across navigation to any other page (each page reads the same key on load).

## Translation coverage
Translated: nav links (including the Services dropdown), page headings/paragraphs, buttons/CTAs, FAQ Q&A, schedule items, footer columns, form labels/options, the "Mon–Fri … Closed" hours string.

Left in English/as-is: the business name "La Familia Adult Day Care Center", the street address, phone number digits, email placeholder text, and `<title>`/meta tags (not visitor-facing during an in-page toggle).

## Implementation shape
1. **Shared infrastructure** (done once, applied identically to all 17 files since header/topbar/footer markup is byte-identical across every page):
   - CSS for `.topbar-lang` / `.lang-toggle`.
   - `main.js` i18n block.
   - `data-es` attributes + toggle button markup added to the shared topbar/nav/footer block, then propagated to all 17 files.
2. **Per-page content** — one agent per page adds `data-es` attributes to that page's unique body copy (hero, sections, FAQ, forms, tables), reusing the shared terminology established in step 1 for consistency.
3. Bare text nodes sitting next to icons/other inline elements (e.g. `<span class="check">✓</span> Daily game rotations`) get wrapped in a new `<span data-es="...">` around just the text, so translation never has to embed quoted attribute markup.

## Testing
Open the site in a browser, toggle EN↔ES on several pages, confirm persistence across navigation, and check that longer Spanish phrases don't break button/nav layout.

## Out of scope
- Separate `/es/` URLs or server-side routing.
- Translating `<title>`/meta description.
- A third language.
