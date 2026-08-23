# Astro migration plan for ycfreeman.com

Date: 2026-08-23

Status: proposed; implementation has not started.

Related research: [SSG framework research](./ssg-framework-research.md)

## Decision

Prove **Astro + React + Astro content collections + Pagefind** in a bounded vertical slice, then migrate only if it meets the gates below. Keep the current Next.js static export buildable until the Astro output has full route and visual parity.

Gatsby is explicitly excluded. Docusaurus is not a fit for this custom blog. If the Astro spike fails, improve the existing Next.js export rather than introducing another framework.

## Why this is a gated migration

The current site is already a functioning SSG. A local production build on 2026-08-23 produced 69 static pages in 8.04 seconds and deployed no application server. The migration is justified only if it improves the weak points without degrading content editing or forcing a redesign.

Current baseline:

| Measure                                          |                                    Baseline |
| ------------------------------------------------ | ------------------------------------------: |
| Production build, warm local machine             |                                8.04 seconds |
| Generated routes reported by Next.js             |                                          69 |
| `out` size                                       |                                       28 MB |
| JavaScript chunks in `out`                       |         820,570 bytes uncompressed in total |
| JavaScript referenced by home page               |                  663,580 bytes uncompressed |
| JavaScript referenced by representative old post |                  779,261 bytes uncompressed |
| Search document                                  | 20,349 bytes; title, summary, and tags only |
| Source content                                   |   28 blog MDX files and one author MDX file |

These byte counts are diagnostic, not network-transfer estimates: shared chunks, compression, and caching affect real requests. Repeat the same measurements for both builds on the same machine and commit.

## Non-negotiable constraints

- Preserve every public URL, metadata field, canonical URL, sitemap entry, and 404 behavior unless a separate change explicitly fixes a known defect.
- Treat a URL as its pathname, trailing-slash/extension behavior, HTTP status, and response target. Preserve the three legacy `200` rewrite rules in `public/_redirects` exactly.
- Preserve pathnames used by Giscus. Its current `mapping: "pathname"` configuration means a URL change can detach a post from its existing discussion.
- Preserve React 19 and existing component/template markup and Tailwind classes wherever framework APIs do not force a change.
- Preserve MDX filenames, frontmatter, draft behavior, dates, tags, reading time, table of contents, citations, math, syntax highlighting, Fancybox, comments, and structured data.
- Keep deployment fully static on Cloudflare; no server-rendered Astro adapter or Worker application code.
- Keep pnpm pinned exactly to `11.7.0` and TypeScript on the latest stable `6.x` release.
- Do not bulk-move or rewrite the legacy `public/wp-content` tree. Its historical URLs are part of the site contract.
- Gate production changes. `SITE_GENERATOR=next` must keep the existing build/deploy path unchanged until cutover. Pagefind replaces current search only behind a separate search-provider flag during validation.

## Known current issues to treat explicitly

| Issue                                                                       | Evidence                                                                                                                                               | Migration treatment                                                                                                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Images are not optimized                                                    | `images.unoptimized` is enabled in `next.config.mjs`.                                                                                                  | Optimize new/local source assets at build time. Preserve legacy public URLs initially, then migrate selected originals deliberately. |
| Search is not full text                                                     | `SearchProvider.tsx` filters only title, summary, and tags from `search.json`.                                                                         | Pagefind indexes rendered post bodies and feeds the existing modal UX.                                                               |
| Pages ship Next runtime/RSC artifacts despite static hosting                | The representative pages reference 664-779 KB of uncompressed JS chunks and `out` contains `__next` payload files.                                     | Astro pages should hydrate only interactive islands. Measure per-route JavaScript as a release gate.                                 |
| The document advertises `/feed.xml`, but the current build does not emit it | `src/app/layout.tsx` contains the alternate link; `out/feed.xml` is absent.                                                                            | Add an Astro RSS endpoint and verify it. Treat this as a separately documented bug fix, not parity with broken behavior.             |
| Framework coupling is bounded but real                                      | Eleven source files import `next/*`; eleven files are client components.                                                                               | Replace Next APIs at narrow boundaries. Do not rewrite framework-neutral components.                                                 |
| URL semantics are split across layers                                       | Generated files, Wrangler's `auto-trailing-slash`, three `_redirects` `200` rewrites, canonical metadata, and Giscus pathname mapping all participate. | Capture and compare deployed HTTP behavior, not only filenames in the build directory.                                               |

## Delivery sequence

Each phase should be a reviewable commit or PR. Do not combine the migration with a visual redesign or unrelated dependency upgrades.

### Phase 0: Capture the compatibility contract

1. Add a repeatable baseline script that builds Next and records:
   - generated URL paths;
   - HTML files, slash/extension variants, response status, and resolved target;
   - canonical, Open Graph, Twitter, JSON-LD, sitemap, robots, and redirect output;
   - per-route referenced JavaScript and generated image sizes;
   - build duration and output size.
2. Select fixture pages that cover the hard cases:
   - home and blog indexes;
   - paginated list and tag page;
   - about and projects pages;
   - a simple modern post;
   - `2010/01/torchlight-yet-another-arpg-before-diablo-3`, which exercises legacy images;
   - a post with citations/math/code and the Fancybox behavior.
3. Add link checking over generated HTML, including legacy media URLs.
4. Exercise the deployed Cloudflare preview as well as the filesystem output, because Wrangler supplies trailing-slash and rewrite behavior.
5. Record the missing RSS feed as a known current defect so the comparison does not silently bless it.

Exit gate: the contract checks pass against the current Next build without changing its output.

### Phase 1: Build the vertical slice beside Next.js

1. Add Astro, the official React and MDX integrations, and Pagefind without removing Next dependencies.
2. Add explicit scripts such as `build:next`, `build:astro`, and `build`, with `SITE_GENERATOR=next` as the default during the spike.
3. Configure Astro for static output. Write its spike output to a separate directory so it cannot overwrite the known-good `out` directory.
4. Reproduce one representative legacy post at its exact URL with:
   - current `PostLayout` structure and Tailwind styling;
   - current metadata and JSON-LD;
   - MDX images, syntax highlighting, math/citations, table of contents, comments, and Fancybox;
   - theme and mobile navigation behavior.
5. Render framework-neutral React components on the server. Hydrate only components that require browser state or effects.
6. Exercise React children passed through Astro boundaries before proceeding. Avoid Astro's `experimentalReactChildren` compatibility mode unless measured evidence shows it is necessary.

Exit gate: the fixture is visually equivalent, keeps its URL/metadata, has no content regression, and materially reduces route-level JavaScript. If this gate fails or requires broad template rewrites, stop and execute the Next.js fallback plan.

### Phase 2: Port the content domain

1. Define blog and author collections in `src/content.config.ts` using the current Zod rules as the compatibility source.
2. Point a glob loader at the existing `src/data/blog/**/*.mdx` and author content first. Moving files to a conventional Astro content directory is optional cleanup after cutover, not migration-critical work.
3. Extract reading time, heading/TOC extraction, slug/path derivation, draft filtering, author lookup, previous/next navigation, and structured data into framework-neutral modules.
4. Keep the existing remark/rehype pipeline: GFM, emoji, math/KaTeX, citations, heading slugs/autolinks, and Prism behavior.
5. Add schema/build fixtures that prove all 29 current content documents compile and every current post slug remains unchanged.

Exit gate: content collection validation, generated slugs, derived metadata, and rendered MDX match the compatibility contract for every document.

### Phase 3: Port routes and preserve templates

1. Add Astro routes for home, about, projects, blog index, pagination, posts, tags, tag detail, 404, sitemap, robots, and RSS.
2. Convert the outer document shell and static page wrappers to `.astro`; keep presentational `.tsx` components when conversion provides no clear benefit.
3. Replace `next/link` with plain anchors behind the existing project `Link` boundary.
4. Pass pathname/base-path information as props instead of reproducing `usePathname` where the value is static at build time.
5. Replace Next metadata APIs and `notFound()` with Astro-native page data and route behavior.
6. Self-host or otherwise reproduce the current font behavior without adding runtime font requests.
7. Use the URL manifest from Phase 0 to compare route sets automatically.
8. Keep `public/_redirects` unchanged through migration. Preserve the security headers in `public/_headers`, replacing only the obsolete `/_next/static/*` cache rule with the hashed Astro asset path.
9. Verify both slash and non-slash requests through `wrangler dev`; matching output filenames alone is insufficient.

Exit gate: all expected routes exist, contract checks pass, and screenshot comparison shows no unintended template/layout changes at mobile and desktop widths.

### Phase 4: Add full-text local search behind a flag

1. Run Pagefind after `astro build` so it indexes final HTML body content.
2. Preserve the current search modal, keyboard shortcuts, focus behavior, result limit, styling, and no-results state.
3. Replace the `search.json` substring filter with Pagefind's browser API behind `PUBLIC_SEARCH_PROVIDER=pagefind`; retain the legacy provider while validating.
4. Exclude navigation, footer, and other repeated chrome from indexing. Include title, summary, tags, and post body with appropriate weights/metadata.
5. Verify searching for terms that appear only in article bodies, special characters, and older nested slugs.
6. Decide separately whether “local” means serverless search or fully offline search. If offline operation is required, add and test a service worker/cache policy for Pagefind assets.

Exit gate: search is entirely static, finds body text, preserves the current interaction, and adds no network service or secret.

### Phase 5: Introduce build-time image optimization

1. Add a narrow project-owned image boundary backed by `astro:assets`; do not scatter direct framework imports through templates.
2. Put new optimizable images under `src/assets` and require explicit dimensions, responsive widths, lazy/eager loading, and alt text.
3. Generate modern formats and `srcset` variants during the static build. Keep Open Graph/social images in formats accepted by crawlers.
4. Leave legacy `public/wp-content` URLs byte-for-byte stable in the first migration. Inventory originals and derivative thumbnails before deciding which historical posts are worth optimizing.
5. Verify that filenames containing encoded characters or query-like characters still resolve through Cloudflare.
6. Compare rendered dimensions, aspect ratios, image bytes, and layout shift against the baseline fixtures.

Exit gate: new/local source images are optimized at build time, legacy links do not break, and representative pages show no image-related layout shift.

### Phase 6: Complete the route set and harden the build

1. Port remaining components and delete hydration directives that are not required for user interaction.
2. Run formatter, linter, TypeScript checking, content-schema tests, contract tests, link checks, and both SSG builds in CI.
3. Add an Astro Cloudflare preview deployment while production continues using Next.
4. Compare both previews for Core Web Vitals, transferred JavaScript, image bytes, accessibility, SEO metadata, build time, and authoring workflow.
5. Update README authoring/deployment instructions only after the commands stabilize.

Exit gate: Astro passes every correctness check and meets the release gates below for at least one preview deployment.

### Phase 7: Cut over and clean up

1. Switch `SITE_GENERATOR` for the production deployment only after preview approval.
2. Keep the previous known-good static artifact or commit available for immediate rollback.
3. Monitor Cloudflare 404s, search usage/errors, analytics continuity, and crawler/indexing signals after deployment.
4. After the observation window, remove Next App Router files, Next-only dependencies, Content Collections integration, the legacy search generator, and the temporary dual-build flag in a separate cleanup change.
5. Keep the framework-neutral React components, MDX source, Tailwind system, public assets, redirects, and Cloudflare static deployment.

Rollback: redeploy the last Next-generated `out` artifact or set `SITE_GENERATOR=next` and rebuild. No content rollback should be needed because content files remain compatible through cutover.

## Release gates

Astro becomes the production generator only when all of these are true:

- URL manifest is identical except for explicitly approved additions such as `/feed.xml`.
- Every existing canonical path, slash variant, and legacy rewrite returns the same status and content target through Cloudflare. No post, tag, pagination, or media URL changes.
- Existing Giscus-backed posts retain the same pathname and therefore the same discussion mapping.
- All 29 content files build with unchanged slugs and no frontmatter loss.
- Visual fixtures have no unintended differences at representative mobile and desktop sizes.
- Search finds terms from post bodies and does not call a hosted service.
- New/local images have responsive optimized outputs; legacy image URLs have zero broken-link regressions.
- Representative content pages ship substantially less JavaScript than the 664-779 KB uncompressed baseline. Set the numerical threshold after the Phase 1 spike; a weak improvement is not enough to justify migration.
- Build time does not regress by more than 25% on the same machine, or any regression has a documented authoring/deployment benefit that justifies it.
- Cloudflare preview passes link, metadata, accessibility, and performance checks.
- `SITE_GENERATOR=next` remains an exact fallback until the post-cutover observation window ends.

## Next.js fallback plan

If Astro fails the Phase 1 or Phase 2 gate:

1. Keep `output: "export"`, Content Collections, current routes, templates, and Cloudflare static assets.
2. Add Pagefind as a post-build step and connect it to the existing search modal behind the same search-provider flag.
3. Introduce a project image boundary and choose one explicit image strategy:
   - a custom loader backed by an image CDN; or
   - deterministic build-time preprocessing for local images.
4. Add the compatibility/link checks and RSS fix from this plan regardless of framework.
5. Measure client bundles and reduce avoidable client component boundaries independently of the image/search work.

This fallback meets the functional requirements with the least migration risk, but it will not get Astro's static-first island model or first-party build-time asset pipeline.
