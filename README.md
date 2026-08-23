# ycfreeman.com

Personal blog built with Astro, React, MDX, and Tailwind CSS, then deployed as static assets on Cloudflare.

## Development

Install the pinned pnpm version and dependencies, then start Astro:

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` to enable Giscus and Google Analytics locally. Content lives in `src/data` and is validated through Astro content collections.

## Verification

```bash
pnpm fmt:check
pnpm lint
pnpm check
pnpm build
```

The production build validates the Astro project before generating the static site in `out`.

## Cloudflare deployment

The site builds to `out` and deploys with Cloudflare Workers Static Assets. Run a local Cloudflare preview with:

```bash
pnpm cf:preview
```

For a manual deployment, authenticate Wrangler and run:

```bash
pnpm wrangler login
pnpm cf:deploy
```

Pushes to `main` deploy through [`deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml). Configure these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`, scoped to the target account with Workers Scripts Write
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
