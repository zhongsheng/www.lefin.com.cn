**Source Visual Truth Path**
- Concept screenshot: `/Users/mini/Documents/Codex/2026-06-27/go/work/concepts/apple-hero-concept.png`

**Implementation Evidence**
- Desktop top viewport: `/Users/mini/Documents/Codex/2026-06-27/go/work/qa/final3-viewport-desktop-top.png`
- Desktop full page 1210px: `/Users/mini/Documents/Codex/2026-06-27/go/work/qa/qa-desktop-1210-full.png`
- Mobile full page 390px: `/Users/mini/Documents/Codex/2026-06-27/go/work/qa/qa-mobile-390-full.png`
- QA metrics: `/Users/mini/Documents/Codex/2026-06-27/go/work/qa/qa-results.json`

**Viewport**
- Desktop checks: 1440 x 1000 and 1210 x 1000.
- Mobile checks: 390 x 844 and 544 x 1000.

**State**
- Homepage loaded at `http://127.0.0.1:5174/`.
- Browser automation used Playwright fallback because the Browser/IAB control tool was not exposed in this turn.
- Images were waited on before screenshots: all `document.images` complete with natural dimensions.

**Comparison Evidence**
- First viewport follows the Apple-style concept: true white background, centered product lineup, large native H1, short subtitle, two restrained CTAs, and the next section title visible at the bottom of the viewport.
- Desktop and mobile use separate hero assets through `<picture>`.
- Product, NFP process, and Valio source sections use separate image-led sections with native HTML headings and copy.
- Product packaging remains based on the supplied Lefin packaging identity; generated images lightly redraw lighting and product staging.
- Markdown, robots, sitemap, canonical, Open Graph, and JSON-LD metadata are present for crawler/agent readability.

**Intentional Deviations**
- The generated packaging is not a pixel-perfect copy of the supplied cans; it is a lightly redrawn product render based on the visible packaging identity, consistent with the approved plan.
- UI text is not embedded inside large section images. It remains native HTML for SEO, accessibility, and maintainability.

**Verification**
- `npm run build` passed.
- `npm run test:run` passed.
- QA metrics report no horizontal overflow on 1440, 1210, 390, or 544 widths.
- Markdown content link exists at `/lefin-site.md`.

final result: passed

**2026-06-29 Hero Edge Blend Fix**
- Issue: Desktop hero WebP showed a visible rectangular canvas edge against the white page background.
- Root cause: The raster image canvas is near-white rather than pure white, and the contained image starts inside the full-width `<img>` box.
- Fix: Added a non-interactive white gradient edge fade on `.hero-media::after` so the hero asset blends into the white page while keeping the product cans untouched.
- Browser: In-app browser at `http://127.0.0.1:5174/`.
- Evidence files: `work/qa/2026-06-29-hero-edge/` (gitignored).
- Pixel check: left hero edge strip improved from about `(246, 246, 246)` before to about `(254, 254, 254)` after against a white `(255, 255, 255)` page.
- Viewports checked: `1440x1000`, `1210x1000`, `390x844`, `544x1000`.
- QA results: no horizontal overflow, hero content present, all images loaded, no framework overlay, no browser console warnings/errors.
- Interaction proof: hero `了解产品` CTA navigated to `#products` and the products section was visible.

**2026-06-29 Entry Modal**
- Change: Added a homepage entry modal for the breastfeeding guidance notice shown in the supplied reference image.
- Implementation: Native HTML dialog text, dismiss button, body scroll lock while open, blue card with milk-wave decoration.
- Browser: In-app browser used for initial visual checks; Playwright CLI used for the required multi-viewport screenshot sweep after the in-app browser API timed out on large screenshot loops.
- Evidence files: `work/qa/2026-06-29-entry-modal/` (gitignored).
- Viewports checked: `1440x1000`, `1210x1000`, `390x844`, `544x1000`.
- QA results: modal appears on fresh home entry, expected text is present, no horizontal overflow, no framework overlay, and no browser console errors.
- Interaction proof: close button removes the dialog and unlocks body scroll; after dismissal, hero `了解产品` CTA navigates to `#products` and the products section is visible.

**2026-06-29 Hero Cutout Asset Fix**
- Issue: The previous edge-blend CSS still left visible hero image boundaries because the raster carried an opaque near-white canvas and side milk-wave crop edges.
- Root cause: `hero-desktop.webp` and `hero-mobile.webp` were RGB WebP assets without alpha, so the page was rendering the image canvas instead of only the product composition.
- Fix: Added alpha WebP cutout assets for desktop/mobile hero usage, preserved the product cans and central reflection, removed the side milk-wave crop, and removed the `.hero-media::after` white overlay.
- Browser: In-app browser at `http://127.0.0.1:5174/`.
- Evidence files: `work/qa/2026-06-29-hero-cutout/` (gitignored).
- Viewports checked: `1440x1000`, `1210x1000`, `390x844`, `544x1000`.
- QA results: no visible rectangular hero canvas edge, no horizontal overflow, hero content present, all images loaded, no framework overlay, and no browser console warnings/errors.
- Responsive proof: mobile `currentSrc` selected `hero-mobile-cutout.webp` with natural size `1080x1920`.
- Interaction proof: hero `了解产品` CTA navigated to `#products`; target heading top was `180px`, so the sticky header did not cover it.
