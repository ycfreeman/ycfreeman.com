# Repository Agent Instructions

- When the user says `remember`, persist the instruction in this repository-level `AGENTS.md` unless they explicitly specify another level.
- Keep pnpm pinned exactly to `11.7.0` because the GitHub Actions deployment depends on that version.
- Keep TypeScript on the latest stable `6.x` release for Next.js compiler API compatibility. Do not upgrade to TypeScript 7 until Next.js supports its new API model.
