# Repository Agent Instructions

## Dependency updates

- Keep pnpm pinned exactly to `12.14.0` because the GitHub Actions deployment depends on that version. pnpm 12 needs `pnpm/action-setup@v6.1.0` or later; the floating `v6` tag points at an older release. The pin lives in both `package.json` `packageManager` and `mise.toml`; change them together.
- The Node major is pinned in `.nvmrc` (read by CI through `setup-node`), `mise.toml` (local) and `package.json` `engines`; change all 3 together.
- Keep TypeScript on the latest stable `6.x` release. `astro check` runs through `@astrojs/check`, which supports TypeScript 5 and 6 only. Upgrade to TypeScript 7 once `@astrojs/check` supports it.

## Monthly package audit

Run a package audit once per calendar month. At the start of a session, check for this month's audit with `gh issue list --search "Package audit: YYYY-MM in:title" --state all`. If none exists, tell the user the audit is due before other work.

The audit is a GitHub issue titled `Package audit: YYYY-MM` that reports findings only; upgrades land in separate PRs. It is complete when it covers:

- every outdated npm package, with breaking-change notes from the release notes of each major or 0.x minor bump
- every `pnpm audit` advisory, reconciled against open Dependabot alerts
- every GitHub Actions `uses:` ref in `.github/workflows/` against its latest release, including whether a floating major tag such as `@v6` still points at an older release (`git ls-remote --tags`), and the Node runtime each action declares
- the Node and pnpm toolchain pins, including whether the TypeScript and pnpm pins above can now be lifted
- a trial upgrade on a scratch copy of the repo: build, lint, format check, `pnpm audit`, and the generated HTML compared against `main`
- unused dependencies
