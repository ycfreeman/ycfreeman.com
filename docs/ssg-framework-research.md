# SSG framework research for ycfreeman.com

Date: 2026-08-23

## Recommendation

Use **Astro with `@astrojs/react`, Astro content collections, and Pagefind** if the goal is to improve the site's static architecture rather than merely patch its current image handling.

This combination best satisfies the requested priorities:

- static HTML by default with client JavaScript added only to interactive components;
- continued use of React for the existing interactive UI;
- local, type-checked Markdown/MDX content;
- build-time local image optimization;
- fully static, client-side full-text search with no hosted search service.

The important qualification is migration cost. **Keeping the current Next.js static export is the least-change option**, and it is already a valid, fast SSG deployment. If preserving every route and template with the smallest possible diff outweighs the image and JavaScript improvements, stay on Next.js and add Pagefind plus an external/custom image loader.

Gatsby is explicitly out of scope by project decision and is not considered further.

**Existing URLs are a hard constraint.** Astro is recommended only behind an automated route-contract check covering post and tag slugs, pagination, trailing-slash handling, canonical URLs, the three legacy rules in [`public/_redirects`](../public/_redirects), and historical media paths. The Giscus configuration maps discussions by pathname, so an accidental URL change can also detach a page from its existing comment thread ([Giscus configuration](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)).

## Current project fit

The project is not a dynamic Next.js application that needs to be made static. It already uses `output: "export"` and deploys the generated `out` directory as Cloudflare static assets ([`next.config.mjs`](../next.config.mjs#L27), [`wrangler.jsonc`](../wrangler.jsonc)). Next.js documents that this mode emits an HTML file per route and can be hosted by any static web server ([Next.js static exports](https://nextjs.org/docs/app/guides/static-exports/)).

The current architecture has several useful assets worth preserving:

- 29 local MDX files under `src/data`, including 28 posts and one author record.
- Content Collections validates frontmatter with Zod and derives slugs, reading time, table-of-contents data, structured data, and MDX imports ([`content-collections.ts`](../content-collections.ts#L18)).
- The visual system is already split into React components and layouts under `src/components` and `src/layouts`.
- Search is already local and lazily fetched, but it searches only title, summary, and tags using substring matching ([`SearchProvider.tsx`](../src/components/SearchProvider.tsx#L65)). The generated JSON deliberately excludes MDX body content ([`content-collections.ts`](../content-collections.ts#L50)), so it is not full-text search.
- Image optimization is the main missing SSG capability: the project wraps `next/image`, but `images.unoptimized` is explicitly enabled ([`next.config.mjs`](../next.config.mjs#L31), [`Image.tsx`](../src/components/Image.tsx)).
- URL behavior spans both generated routes and Cloudflare configuration. Wrangler uses `auto-trailing-slash` handling, `_redirects` contains three legacy `200` rewrites, and Giscus uses the pathname to identify a discussion. Those are migration inputs, not cleanup opportunities.

The migration surface is meaningful but bounded. Eleven source files import a `next/*` module. The App Router route files, metadata/sitemap handling, `next/link`, `next/image`, `next/font`, `notFound`, and `usePathname` usages require adapters or rewrites. Most presentational React components and Tailwind classes can remain. Interactive components such as search, theme switching, mobile navigation, comments, Fancybox, and code controls must be mounted as Astro client islands.

## Comparison

| Option                         | Speed and static output                                                                                                                      | Content maintenance                                                                                     | Local search                                                                                   | Image optimization                                                                                                                                                      | Preserve current React/templates                                                                                                          | Project-specific assessment                                                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Astro + React**              | Static-first. React components render to HTML without browser JavaScript unless explicitly hydrated; interactive islands can use `client:*`. | First-party Markdown/MDX and type-safe content collections validate frontmatter and generate types.     | Pagefind indexes final HTML, including body text, and needs no server.                         | First-party `<Image>`/`<Picture>` pipeline; the local image service transforms images during static builds.                                                             | React components are supported through the official integration, but Next route/layout APIs and Next-specific components need conversion. | **Best overall fit.** It improves the two weak areas—shipped JS and build-time images—while retaining React where useful.           |
| **Keep Next.js static export** | Already in place and produces route-level static HTML. It preserves the current application exactly.                                         | Existing MDX and Content Collections workflow already works well.                                       | Pagefind can index `out` after `next build`; the existing React search modal can call its API. | Default `next/image` optimization is unsupported in static export. A custom loader/CDN is supported, but optimization occurs outside the static build/runtime boundary. | **Best preservation:** no framework migration.                                                                                            | **Best minimum-change option.** Choose this if migration avoidance is the top priority, accepting a custom/external image pipeline. |
| **Docusaurus**                 | Statically renders React to HTML.                                                                                                            | Strong Markdown/MDX authoring, but its information architecture and presets target documentation sites. | Local search requires a plugin or a post-build tool such as Pagefind.                          | Image handling is not a stronger reason to migrate than Astro.                                                                                                          | React-friendly, but adopting its theme/layout conventions would work against preserving this personal-blog design.                        | **Poor fit.** Valuable for versioned product documentation, not this custom blog/portfolio.                                         |

### Evidence behind the comparison

Astro's official React integration renders and hydrates React components ([`@astrojs/react`](https://docs.astro.build/en/guides/integrations-guide/react/)). Astro content collections support local Markdown and MDX, schema validation, and generated TypeScript types ([Astro content collections](https://docs.astro.build/en/guides/content-collections/)); the official MDX integration retains JSX expressions and components ([`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/)). For static sites, Astro's local image service performs transformations at build time ([Astro Image Service API](https://docs.astro.build/en/reference/image-service-reference/)).

Pagefind is independent of the framework: it runs after the SSG, indexes generated HTML, and emits a static browser search bundle with no server component ([Pagefind getting started](https://pagefind.app/docs/)). Its JavaScript API can power a custom React UI ([Pagefind API](https://pagefind.app/docs/api/)), so the current search interaction and styling do not need to be discarded. “Local search” here means no SaaS or application server. True use with no network connection would additionally require a service worker to cache the site and Pagefind assets; Pagefind documents cache metadata support for that scenario ([Pagefind browser configuration](https://pagefind.app/docs/search-config/)).

Next.js explicitly lists default-loader image optimization among features unsupported by static export. It supports a custom loader, such as an image CDN URL builder, instead ([Next.js static exports](https://nextjs.org/docs/app/guides/static-exports/)). The current `unoptimized: true` setting is therefore expected rather than accidental. Staying on Next.js can meet all requirements, but build-time local image transformation needs a separate tool and integration not supplied by the static-export mode itself.

Docusaurus statically renders React and is explicitly designed around documentation features such as docs, blog, pages, and versioning ([Docusaurus documentation](https://docusaurus.io/docs)). Those defaults are an advantage for a documentation portal and unnecessary structure for this repository.

## Proposed Astro target architecture

Keep the content and UI boundaries recognizable:

| Current                                     | Astro target                                                                                                                                   |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/blog/**/*.mdx`                    | Keep files and frontmatter; expose them through an Astro content collection. A move under `src/content` is optional with Astro's glob loader.  |
| Zod schema and derived content metadata     | Move schema to `src/content.config.ts`; compute reading time, TOC, and structured data in a small content-domain module.                       |
| `src/components/*.tsx`, `src/layouts/*.tsx` | Preserve presentational React components initially. Convert static outer page shells to `.astro` gradually to eliminate unnecessary hydration. |
| App Router pages and `generateStaticParams` | Astro file routes plus `getStaticPaths()`. Preserve existing URLs, pagination, tag pages, sitemap, robots, and 404 output.                     |
| `SearchProvider.tsx` + `public/search.json` | Preserve the modal/keyboard UX, replace substring filtering with the Pagefind API, and generate the index from final HTML after `astro build`. |
| `next/image` wrapper                        | Introduce a narrow project image component backed by `astro:assets`; keep untouched legacy files in `public` until references are migrated.    |
| Cloudflare `out` deployment                 | Change output directory/configuration from Astro's default `dist` to `out`, or update Wrangler to `dist`. Static hosting remains unchanged.    |

Astro has one React compatibility edge worth testing early: children passed from an Astro component to a React component are parsed as strings rather than React nodes by default. The integration offers `experimentalReactChildren`, with a runtime cost, for libraries that require React-node children ([Astro React integration options](https://docs.astro.build/en/guides/integrations-guide/react/#children-parsing)). Components such as layout wrappers, MDX component mappings, Fancybox, and code rendering should be exercised in a migration spike before committing to the full conversion.

## Decision and rollout

Proceed with Astro only after a small, non-production migration spike proves the hardest vertical slice:

1. Render one representative old MDX post containing images, code, math/citations, table of contents, and Fancybox.
2. Reproduce the existing URL, metadata, theme, and visual layout using the current React components and Tailwind styles.
3. Generate responsive build-time images for one modern source image while verifying that legacy `public/wp-content` URLs remain unchanged.
4. Index the generated HTML with Pagefind and connect the existing search modal to its API.
5. Compare generated page weight, client JavaScript, build duration, and authoring workflow with the current Next export.
6. Compare the complete generated URL manifest and the deployed HTTP behavior for canonical paths, slash variants, legacy rewrites, and media URLs.

If that spike exposes costly MDX/React-child incompatibilities or unacceptable template churn, retain Next.js. In that fallback, add Pagefind immediately and choose either a custom image CDN loader or an explicit build-time image preprocessing step. Both paths preserve static Cloudflare hosting; the framework decision should not be coupled to the host.

## Final ranking

1. **Astro + React + Astro content collections + Pagefind** — recommended overall.
2. **Current Next.js static export + Pagefind + separate image pipeline** — recommended when minimum migration is the controlling constraint.
3. **Docusaurus** — optimized for a different content shape.

Gatsby is excluded by project decision and therefore intentionally unranked.
