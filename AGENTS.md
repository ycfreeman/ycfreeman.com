# Repository Agent Instructions

- Keep pnpm pinned exactly to `11.7.0` because the GitHub Actions deployment depends on that version.
- Keep TypeScript on the latest stable `6.x` release for Next.js compiler API compatibility. Do not upgrade to TypeScript 7 until Next.js supports its new API model.
- For every dependency update, build both the base and updated revisions and compare their generated HTML. Normalize only content-hashed asset references, then investigate and report every remaining difference before completion.
