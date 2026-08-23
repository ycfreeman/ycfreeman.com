# Astro migration plan for ycfreeman.com

Date: 2026-08-23

Status: implemented on the `new-framework` branch.

Related research: [SSG framework research](./ssg-framework-research.md)

## Decision

Migrate ycfreeman.com from the Next.js static export to Astro in one change and one production cutover.

Use Astro's static output, React integration, MDX integration, and content collections. Reuse the existing React components, MDX content, Tailwind classes, and public assets where possible. Do not redesign the site as part of the migration.

Keep the rendered content, styling, and behavior as close to the current site as practical. Preserve SEO values and semantics, including titles, descriptions, canonical URLs, Open Graph and Twitter metadata, JSON-LD, sitemap, robots, and feed discovery. The generated HTML does not need to be byte-for-byte or structurally identical. Image files may move beside their related content, and their generated URLs may change.

There is no framework spike, fallback path, feature gate, dual-generator period, staged rollout, or separate cleanup change. The migration replaces and removes Next.js in the same change.

The migration is not conditional on build-time improvement, JavaScript reduction, search replacement, or image optimization. Those are separate changes if they are still useful after the migration.

The migration is complete when Astro is the production site generator and the existing public URL contract is preserved.

## URL contract

A page URL includes its pathname, trailing-slash or extension behavior, HTTP status, and resolved content target. Preserve:

- every generated page URL;
- canonical URLs and URLs emitted by sitemap and robots output;
- the three legacy `200` rewrite rules in `public/_redirects`;
- post pathnames used by Giscus's `mapping: "pathname"` configuration;
- tag, pagination, feed, and 404 URL behavior as it exists before migration.

Image asset paths are not part of this contract. Reorganize images around their related content when that produces a clearer Astro content structure, and update every reference to the new path.

Do not treat matching output filenames as proof of parity. Cloudflare and Wrangler also affect trailing-slash, rewrite, status, and target behavior.

## One-and-done migration

Before replacing Next.js, add a repeatable script that builds the current site and records:

- generated paths;
- slash and extension variants;
- HTTP status and resolved target;
- redirects and rewrites;
- canonical, sitemap, and robots URLs;
- internal links.

Capture hosting behavior through Wrangler as well as the generated files. Then, in the same change:

1. Configure Astro for static output with the official React and MDX integrations.
2. Define Astro content collections over the existing blog and author MDX files without moving or rewriting them.
3. Preserve every existing MDX plugin or replace it with an Astro-compatible equivalent that produces the same behavior. This includes frontmatter, MDX frontmatter, GFM, code titles, math, emoji, heading slugs and links, citations, syntax highlighting, and table-of-contents extraction, including the current plugin options.
4. Port the document shell and every route to Astro while retaining framework-neutral React components.
5. Preserve the current route derivation, draft filtering, SEO metadata and structured data, table of contents, reading time, navigation, search, comments, and rendered image content.
6. Keep `public/_redirects` and non-image public assets unchanged. Move images beside related content when that is the clearer structure and update all references.
7. Make `pnpm dev`, or a clearly documented equivalent, start the Astro development server with the normal local edit-and-reload workflow.
8. Replace the build and deployment commands with Astro. Preserve every existing CI responsibility, but change the workflows, jobs, commands, environment variables, and artifact paths however best fits Astro.
9. Remove the Next.js App Router, configuration, generated-content integration, and Next-only dependencies.
10. Build the complete Astro site and fix every difference from the recorded URL manifest.
11. Crawl the output for broken internal links and images, then verify slash variants, rewrites, Giscus pathnames, sitemap entries, canonical URLs, and 404 responses through Wrangler.
12. Merge and deploy the complete migration once.
13. Run the URL comparison against production and fix forward immediately if any mismatch remains.

## Definition of done

- Astro generates and deploys the production site.
- Every existing public page URL has the same pathname, status, trailing-slash or extension behavior, and content target.
- The three legacy rewrites behave exactly as before.
- Existing Giscus discussions remain attached to the same post pathnames.
- SEO values and crawler-facing output are preserved.
- Every existing MDX plugin behavior and option is preserved, whether implemented by the same plugin or an Astro-compatible equivalent.
- No internal links or rendered images are broken.
- The documented local development command starts Astro and supports the normal edit-and-reload workflow.
- CI continues to provide every existing build and deployment outcome using workflows suited to Astro.
- Next.js and all migration-only code have been removed in the same change.
