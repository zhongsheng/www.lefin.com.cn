# AGENTS.md

Guidance for AI agents working on the Lefin official website repository.

## Project Context

- Site: `www.lefin.com.cn`
- Stack: React 19, TypeScript, Vite, Vitest, Phosphor Icons.
- Current product direction: Apple-style single-page official website for Lefin infant formula.
- Core visual strategy: image-led sections with native HTML text, not a pure image poster page.
- Public AI/crawler content lives in `public/llms.txt` and `public/lefin-site.md`.

## Repository Map

- `src/App.tsx`: page composition and interactive UI.
- `src/siteContent.ts`: canonical site copy, navigation labels, FAQ, product-stage data, and form validation.
- `src/styles.css`: global Apple-style design system, layout, responsive rules.
- `src/assets/apple/`: optimized WebP production images for desktop/mobile sections.
- `src/assets/brand/`: Lefin logo assets.
- `public/lefin-site.md`: Markdown version of the site content for crawlers and AI agents.
- `public/llms.txt`: short crawler/agent index.
- `public/robots.txt` and `public/sitemap.xml`: crawl discovery.
- `design-qa.md`: latest visual QA evidence and verification notes.

## Commands

Use these commands from the repository root:

```bash
npm install
npm run dev
npm run test:run
npm run build
LEFIN_SFTP_USER=deploy npm run release
```

Before claiming completion, run:

```bash
npm run build
npm run test:run
```

For visual changes, also verify in a browser at least:

- Desktop: `1440x1000` and `1210x1000`
- Mobile: `390x844` and `544x1000`

## Design Rules

- Preserve the Apple-style direction: true white background, large product imagery, short copy, restrained blue CTAs, strong whitespace.
- Keep first viewport focused on:
  - H1: `乐芬婴幼儿配方奶粉`
  - Subtitle: `科学湿法工艺，重构鲜活营养。`
  - CTAs: `了解产品`, `查看 NFP 工艺`
- Do not add decorative badges, pills, fake metrics, hero eyebrows, icon rows, bokeh/orbs, or busy mother-baby advertising visuals.
- UI text, navigation, FAQ, forms, and footer links must remain native HTML for SEO, accessibility, and maintainability.
- Product/background imagery may be generated or optimized, but must stay based on Lefin packaging identity and must not introduce unrelated products.
- Desktop and mobile hero/section imagery should use separate assets via `<picture>` where composition needs differ.
- Product packaging may be lightly redrawn for lighting and polish, but stage number, brand identity, and product-line recognition must remain clear.

## Content Rules

- Keep copy short, factual, and low-claim.
- Avoid medicalized claims, disease language, guaranteed outcomes, exaggerated nutrition promises, or fake certifications.
- When changing visible site copy in `src/siteContent.ts`, update `public/lefin-site.md` so crawler/agent content stays aligned.
- If navigation labels or major sections change, update tests and `public/llms.txt` if relevant.
- Preserve contact details unless the user provides replacements:
  - Phone: `400-8084066`
  - Email: `support@lefin.com.cn`

## SEO and Crawler Rules

- Keep `index.html` metadata aligned with the single-page homepage:
  - canonical URL
  - description
  - Open Graph title/description/image
  - Markdown alternate link
  - JSON-LD organization data
- Keep `public/lefin-site.md` readable as standalone Markdown.
- Keep all important images with meaningful `alt` text.
- Do not move essential page meaning into raster images only.

## Image Asset Rules

- Production section images belong in `src/assets/apple/`.
- Use WebP for production website images unless there is a clear reason not to.
- Keep image sizes reasonable; current Apple-style assets are roughly 40-120KB each.
- Do not overwrite source user-provided product assets in `src/assets/products/`.
- If generated images are used, copy final selected outputs into the repository; never reference files from `~/.codex/generated_images`.
- Temporary screenshots and concept images belong under `work/`, which is gitignored.

## Testing Rules

- `src/App.test.tsx` should cover the page contract:
  - H1
  - primary/secondary CTAs
  - navigation
  - key image alt text
  - FAQ expansion
  - contact form success state
  - Markdown content link
- `src/content.test.ts` should cover:
  - nav labels/order
  - product stages
  - FAQ coverage
  - contact form validation
- If you change labels, copy, section ids, or form behavior, update tests in the same change.

## Browser QA Rules

For visual changes:

- Capture or inspect desktop and mobile viewports.
- Check that there is no horizontal overflow.
- Verify all images are loaded and not cropped in a way that hides the main product.
- Verify the sticky header does not cover headings after hash navigation.
- Verify the first viewport shows a hint of the next section.
- Record meaningful QA evidence in `design-qa.md` when the change materially affects layout or imagery.

## Git Workflow

- Default branch for feature work should use the `codex/` prefix.
- Do not reset or revert unrelated user changes.
- Do not commit `dist/`, `node_modules/`, or `work/`.
- Use `npm run release` to build and upload `dist/` over SFTP. Keep host, port, user, key, and remote path configurable through environment variables; never commit credentials.
- After implementation and verification, commit with a concise message and push the working branch.

## Common Pitfalls

- Do not convert the homepage into a pure image-only page.
- Do not add long-form marketing copy to the homepage; use `public/lefin-site.md` for fuller crawler-readable text.
- Do not introduce unrelated product renders or stock-like baby/family scenes.
- Do not rely on browser-default styling for buttons, inputs, selects, or mobile menu text.
- Do not claim tests or build pass unless you have run the commands in the current turn.
