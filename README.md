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

The site builds to `out` and deploys to Cloudflare Workers Static Assets with [SST](https://sst.dev), configured in [`sst.config.ts`](sst.config.ts). SST stores its state in Cloudflare R2.

For a manual deployment, set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_DEFAULT_ACCOUNT_ID`, then run:

```bash
pnpm cf:deploy
```

Only the `production` stage attaches `www.ycfreeman.com` as a Cloudflare Custom Domain and redirects the apex `ycfreeman.com` to it. Other stages, such as `pnpm sst deploy --stage test`, are served from their generated `workers.dev` URL.

Pushes to `main` deploy through [`deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml). Configure these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`, scoped to the target account, created from the **Edit Cloudflare Workers** template plus _Zone - DNS - Edit_ and _Zone - Single Redirect - Edit_ for the `ycfreeman.com` zone
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
