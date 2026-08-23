# Astro migration plan for ycfreeman.com

Date: 2026-08-23

Status: approved.

Related research: [SSG framework research](./ssg-framework-research.md)

## Decision

Migrate ycfreeman.com from the Next.js static export to Astro in one change and one production cutover.

Use Astro's static output, React integration, MDX integration, and content collections. Reuse the existing React components, MDX content, Tailwind classes, and public assets where possible. Do not redesign the site as part of the migration.

Keep the rendered content, metadata, styling, and behavior as close to the current site as practical. The generated HTML does not need to be byte-for-byte or structurally identical.

There is no framework spike, fallback path, feature gate, dual-generator period, staged rollout, or separate cleanup change. The migration replaces and removes Next.js in the same change.

The migration is not conditional on build-time improvement, JavaScript reduction, search replacement, or image optimization. Those are separate changes if they are still useful after the migration.

The migration is complete when Astro is the production site generator and the existing public URL contract is preserved.

## URL contract

A URL includes its pathname, trailing-slash or extension behavior, HTTP status, and resolved content target. Preserve:

- every generated page URL;
- canonical URLs and URLs emitted by sitemap and robots output;
- the three legacy `200` rewrite rules in `public/_redirects`;
- all files and paths under `public`, especially the legacy `public/wp-content` tree;
- post pathnames used by Giscus's `mapping: "pathname"` configuration;
- tag, pagination, feed, and 404 URL behavior as it exists before migration.

Do not treat matching output filenames as proof of parity. Cloudflare and Wrangler also affect trailing-slash, rewrite, status, and target behavior.

## One-and-done migration

Before replacing Next.js, add a repeatable script that builds the current site and records:

- generated paths;
- slash and extension variants;
- HTTP status and resolved target;
- redirects and rewrites;
- canonical, sitemap, and robots URLs;
- internal links and referenced legacy media URLs.

Capture hosting behavior through Wrangler as well as the generated files. Then, in the same change:

1. Configure Astro for static output with the official React and MDX integrations.
2. Define Astro content collections over the existing blog and author MDX files without moving or rewriting them.
3. Keep the existing remark and rehype behavior for math, citations, syntax highlighting, heading links, and other MDX features.
4. Port the document shell and every route to Astro while retaining framework-neutral React components.
5. Preserve the current route derivation, draft filtering, metadata, table of contents, reading time, navigation, search, comments, structured data, and image behavior.
6. Keep `public/_redirects`, legacy media, and other public assets unchanged.
7. Replace the build and deployment commands with Astro. Preserve every existing CI responsibility, but change the workflows, jobs, commands, environment variables, and artifact paths however best fits Astro.
8. Remove the Next.js App Router, configuration, generated-content integration, and Next-only dependencies.
9. Build the complete Astro site and fix every difference from the recorded URL manifest.
10. Crawl the output for broken internal links and legacy media, then verify slash variants, rewrites, Giscus pathnames, sitemap entries, canonical URLs, and 404 responses through Wrangler.
11. Merge and deploy the complete migration once.
12. Run the URL comparison against production and fix forward immediately if any mismatch remains.

## Definition of done

- Astro generates and deploys the production site.
- Every existing public URL has the same pathname, status, trailing-slash or extension behavior, and content target.
- The three legacy rewrites behave exactly as before.
- Existing Giscus discussions remain attached to the same post pathnames.
- No legacy media or internal links are broken.
- CI continues to provide every existing build and deployment outcome using workflows suited to Astro.
- Next.js and all migration-only code have been removed in the same change.
